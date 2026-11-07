import { NextResponse } from "next/server";
import { isEmailConfigured, sendEnquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { normaliseEnquiry, validateEnquiry } from "@/lib/validation";
import { offices, site } from "@/config/site";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;
const MIN_FILL_MS = 3_000;

type ApiBody =
  | { ok: true; message: string }
  | {
      ok: false;
      code:
        | "invalid"
        | "not_configured"
        | "send_failed"
        | "rate_limited"
        | "too_fast"
        | "bad_request"
        | "forbidden";
      message: string;
      errors?: Record<string, string>;
    };

const json = (body: ApiBody, status: number, headers?: Record<string, string>) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

const fallback = `You can reach us on ${offices[0].phones[0].display} (Polokwane), ${offices[1].phones[0].display} (Sandton) or ${site.email}.`;

function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  // Same-origin form posts from browsers always send Origin; refuse anything else.
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (host && originHost === host) return true;
    return originHost === new URL(site.url).host || originHost === `www.${new URL(site.url).host}`;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return json({ ok: false, code: "forbidden", message: "This request was not accepted." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Unsupported request format." }, 415);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = Number(process.env.ENQUIRY_RATE_LIMIT) || 5;
  const limited = rateLimit(`enquiry:${ip}`, { limit, windowMs: 15 * 60 * 1000 });
  if (!limited.allowed) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: `Too many requests were sent from your connection. Please try again later. ${fallback}`,
      },
      429,
      { "Retry-After": String(limited.retryAfterSeconds) },
    );
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) throw new Error("too large");
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "bad_request", message: "We could not read your request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Bots are told nothing useful
  // and nothing is sent.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return json({ ok: true, message: "Thank you." }, 200);
  }

  const startedAt = Number(raw.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
    return json(
      {
        ok: false,
        code: "too_fast",
        message: "Please review your details and press send again.",
      },
      400,
    );
  }

  const input = normaliseEnquiry(raw);
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return json(
      {
        ok: false,
        code: "invalid",
        message: "Please check the highlighted fields and try again.",
        errors,
      },
      422,
    );
  }

  if (!isEmailConfigured()) {
    console.error("[enquiry] RESEND_API_KEY / ENQUIRY_FROM_EMAIL are not configured.");
    return json(
      {
        ok: false,
        code: "not_configured",
        message: `Online enquiries are temporarily unavailable, and your message has not been sent. ${fallback}`,
      },
      503,
    );
  }

  const result = await sendEnquiryEmail(input);
  if (!result.ok) {
    return json(
      {
        ok: false,
        code: "send_failed",
        message: `We could not send your enquiry, and it has not been received. Please try again shortly. ${fallback}`,
      },
      502,
    );
  }

  return json(
    {
      ok: true,
      message:
        "Your consultation request has been sent to the firm. This is a request, not a confirmed appointment; a member of the team will contact you using your preferred method.",
    },
    200,
  );
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
