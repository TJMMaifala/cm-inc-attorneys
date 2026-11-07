import { site } from "@/config/site";
import { enquiryTopics } from "@/content/practice-areas";
import {
  CONTACT_METHOD_OPTIONS,
  OFFICE_OPTIONS,
  labelFor,
  type EnquiryInput,
} from "./validation";

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL);
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type SendResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "not_configured" | "provider_error"; status?: number };

/**
 * Sends the consultation request to the firm through Resend's REST API.
 * Uses fetch directly so no extra dependency is required.
 */
export async function sendEnquiryEmail(input: EnquiryInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = (process.env.ENQUIRY_TO_EMAIL || site.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || !from) return { ok: false, reason: "not_configured" };

  const office = labelFor(input.office, OFFICE_OPTIONS);
  const area = labelFor(input.practiceArea, enquiryTopics);
  const method = labelFor(input.contactMethod, CONTACT_METHOD_OPTIONS);

  const rows: [string, string][] = [
    ["Name", input.fullName],
    ["Email", input.email],
    ["Contact number", input.phone],
    ["Preferred office", office],
    ["Practice area", area],
    ["Preferred contact method", method],
  ];

  const text = [
    "New consultation request from the CMI Attorneys website",
    "(This is an enquiry, not a confirmed appointment.)",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Enquiry:",
    input.message,
    "",
    `Privacy notice acknowledged: ${input.privacyAccepted ? "yes" : "no"}`,
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#0b1030;max-width:620px">
<h2 style="color:#051148;margin:0 0 4px">New consultation request</h2>
<p style="color:#4a5068;margin:0 0 20px">Submitted through the CMI Attorneys website. This is an enquiry, not a confirmed appointment.</p>
<table style="border-collapse:collapse;width:100%">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 12px;border:1px solid #dcdfe8;background:#f4f5f8;width:190px"><strong>${escapeHtml(k)}</strong></td><td style="padding:8px 12px;border:1px solid #dcdfe8">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<h3 style="color:#051148;margin:24px 0 8px">Enquiry</h3>
<p style="white-space:pre-wrap;border-left:3px solid #051148;padding-left:14px;margin:0">${escapeHtml(input.message)}</p>
<p style="color:#4a5068;font-size:12px;margin-top:24px">The sender acknowledged the privacy notice. Reply directly to this email to respond to the enquirer.</p>
</div>`;

  try {
    // RESEND_API_URL exists only so the end-to-end tests can point at a local mock server.
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: input.email,
        subject: `Website consultation request: ${input.fullName} (${area})`.slice(0, 200),
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[enquiry] Resend rejected the request", res.status);
      return { ok: false, reason: "provider_error", status: res.status };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (error) {
    console.error("[enquiry] Email provider unreachable", (error as Error).name);
    return { ok: false, reason: "provider_error" };
  }
}
