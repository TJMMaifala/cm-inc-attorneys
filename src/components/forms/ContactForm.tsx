"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { AlertTriangle, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { offices, site } from "@/config/site";
import { enquiryTopics } from "@/content/practice-areas";
import {
  CONTACT_METHOD_OPTIONS,
  LIMITS,
  OFFICE_OPTIONS,
  normaliseEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/validation";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const fieldOrder: EnquiryField[] = [
  "fullName",
  "email",
  "phone",
  "office",
  "practiceArea",
  "contactMethod",
  "message",
  "privacyAccepted",
];

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  // Pre-select the practice area when arriving from a practice-area page (?topic=slug).
  // Read from the URL without an effect so server and first client render agree ("").
  const urlTopic = useSyncExternalStore(
    () => () => {},
    () => {
      const wanted = new URLSearchParams(window.location.search).get("topic");
      return wanted && enquiryTopics.some((t) => t.value === wanted) ? wanted : "";
    },
    () => "",
  );
  const [chosenTopic, setChosenTopic] = useState<string | null>(null);
  const topic = chosenTopic ?? urlTopic;
  const setTopic = (value: string) => setChosenTopic(value);
  const [messageLength, setMessageLength] = useState(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const id = (name: string) => `${uid}-${name}`;
  const err = (name: EnquiryField) => errors[name];
  const describedBy = (name: EnquiryField, hint?: string) =>
    [err(name) ? `${id(name)}-error` : null, hint ? `${id(name)}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;

    const data = new FormData(event.currentTarget);
    const raw = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      phone: data.get("phone"),
      office: data.get("office"),
      practiceArea: data.get("practiceArea"),
      contactMethod: data.get("contactMethod"),
      message: data.get("message"),
      privacyAccepted: data.get("privacyAccepted") === "on",
      website: data.get("website"),
      startedAt: startedAt.current,
    };

    const found = validateEnquiry(normaliseEnquiry(raw));
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ state: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; message?: string; errors?: EnquiryErrors }
        | null;

      // Only a confirmed 2xx response from the server counts as success.
      if (res.ok && body?.ok === true) {
        setStatus({ state: "success", message: body.message ?? "Your request has been sent." });
        formRef.current?.reset();
        setTopic("");
        setMessageLength(0);
        setErrors({});
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      if (body?.errors) {
        setErrors(body.errors);
        requestAnimationFrame(() => summaryRef.current?.focus());
      }
      setStatus({
        state: "error",
        message:
          body?.message ??
          "Something went wrong and your message has not been sent. Please try again or contact us directly.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus({
        state: "error",
        message:
          "We could not reach the server, so your message has not been sent. Please check your connection and try again, or contact us directly.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const errorEntries = fieldOrder.filter((f) => errors[f]);

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border-t-2 border-navy-900 bg-mist p-8 outline-none sm:p-12"
      >
        <CheckCircle2 className="h-10 w-10 text-navy-900" aria-hidden="true" />
        <h3 className="mt-6 text-2xl font-bold text-navy-900">Consultation request sent</h3>
        <p className="mt-3 max-w-xl text-slate">{status.message}</p>
        <p className="mt-3 max-w-xl text-sm text-slate">
          If your matter is urgent, please call the office directly on {offices[0].phones[0].display}{" "}
          (Polokwane) or {offices[1].phones[0].display} (Sandton).
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="btn btn-outline-dark mt-8"
        >
          Send another request
        </button>
      </div>
    );
  }

  const labelCls = "mb-2 block text-sm font-semibold text-navy-900";
  const errCls = "mt-2 flex items-start gap-2 text-sm font-medium text-[#b3261e]";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-intro`} className="space-y-6">
      <p id={`${uid}-intro`} className="text-sm text-slate">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required. This form sends a{" "}
        <strong className="font-semibold text-navy-900">consultation request</strong>; it does not
        book or confirm an appointment.
      </p>

      <div
        role="note"
        className="flex gap-3 border-l-4 border-navy-900 bg-navy-50 p-4 text-sm text-navy-900"
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          Please do <strong>not</strong> include confidential or privileged information, ID numbers,
          or legal documents in this form. Keep your message brief, and the firm will ask for
          documents securely once your enquiry is taken on.
        </p>
      </div>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-[#b3261e] bg-[#fdf1f0] p-4 outline-none"
        >
          <p className="font-semibold text-[#8c1d18]">
            Please correct {errorEntries.length === 1 ? "this field" : `these ${errorEntries.length} fields`}:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#8c1d18]">
            {errorEntries.map((f) => (
              <li key={f}>
                <a href={`#${id(f)}`} className="underline">
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status.state === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-[#b3261e] bg-[#fdf1f0] p-5 outline-none"
        >
          <p className="font-semibold text-[#8c1d18]">Your message has not been sent</p>
          <p className="mt-1 text-sm text-[#8c1d18]">{status.message}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-navy-900">
            <a href={`tel:${offices[0].phones[0].tel}`} className="inline-flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" aria-hidden="true" /> {offices[0].phones[0].display}
            </a>
            <a href={`tel:${offices[1].phones[0].tel}`} className="inline-flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" aria-hidden="true" /> {offices[1].phones[0].display}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4" aria-hidden="true" /> {site.email}
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("fullName")} className={labelCls}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.fullName.max}
            className="field"
            aria-invalid={err("fullName") ? true : undefined}
            aria-describedby={describedBy("fullName")}
          />
          {err("fullName") && (
            <p id={`${id("fullName")}-error`} className={errCls}>
              {err("fullName")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("email")} className={labelCls}>
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email.max}
            className="field"
            aria-invalid={err("email") ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          {err("email") && (
            <p id={`${id("email")}-error`} className={errCls}>
              {err("email")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("phone")} className={labelCls}>
            Contact number <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={LIMITS.phone.max}
            className="field"
            aria-invalid={err("phone") ? true : undefined}
            aria-describedby={describedBy("phone")}
          />
          {err("phone") && (
            <p id={`${id("phone")}-error`} className={errCls}>
              {err("phone")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("office")} className={labelCls}>
            Preferred office <span aria-hidden="true">*</span>
          </label>
          <select
            id={id("office")}
            name="office"
            required
            defaultValue=""
            className="field"
            aria-invalid={err("office") ? true : undefined}
            aria-describedby={describedBy("office")}
          >
            <option value="" disabled>
              Select an office
            </option>
            {OFFICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err("office") && (
            <p id={`${id("office")}-error`} className={errCls}>
              {err("office")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("practiceArea")} className={labelCls}>
            Practice area <span aria-hidden="true">*</span>
          </label>
          <select
            id={id("practiceArea")}
            name="practiceArea"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="field"
            aria-invalid={err("practiceArea") ? true : undefined}
            aria-describedby={describedBy("practiceArea")}
          >
            <option value="" disabled>
              Select a practice area
            </option>
            {enquiryTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {err("practiceArea") && (
            <p id={`${id("practiceArea")}-error`} className={errCls}>
              {err("practiceArea")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("contactMethod")} className={labelCls}>
            Preferred contact method <span aria-hidden="true">*</span>
          </label>
          <select
            id={id("contactMethod")}
            name="contactMethod"
            required
            defaultValue=""
            className="field"
            aria-invalid={err("contactMethod") ? true : undefined}
            aria-describedby={describedBy("contactMethod")}
          >
            <option value="" disabled>
              Select a method
            </option>
            {CONTACT_METHOD_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err("contactMethod") && (
            <p id={`${id("contactMethod")}-error`} className={errCls}>
              {err("contactMethod")}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className={labelCls}>
          Brief enquiry <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          maxLength={LIMITS.message.max}
          onChange={(e) => setMessageLength(e.target.value.length)}
          className="field resize-y"
          aria-invalid={err("message") ? true : undefined}
          aria-describedby={describedBy("message", "hint")}
        />
        <p id={`${id("message")}-hint`} className="mt-2 flex justify-between text-xs text-slate">
          <span>A short summary of what you need help with.</span>
          <span aria-hidden="true">
            {messageLength}/{LIMITS.message.max}
          </span>
        </p>
        {err("message") && (
          <p id={`${id("message")}-error`} className={errCls}>
            {err("message")}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("privacyAccepted")}
            name="privacyAccepted"
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[#051148]"
            aria-invalid={err("privacyAccepted") ? true : undefined}
            aria-describedby={describedBy("privacyAccepted")}
          />
          <label htmlFor={id("privacyAccepted")} className="text-sm leading-relaxed text-slate">
            I have read the{" "}
            <Link href="/privacy" className="font-semibold text-navy-900 underline underline-offset-4">
              privacy notice
            </Link>{" "}
            and consent to CMI Attorneys using the information in this form to respond to my
            enquiry. <span aria-hidden="true">*</span>
          </label>
        </div>
        {err("privacyAccepted") && (
          <p id={`${id("privacyAccepted")}-error`} className={errCls}>
            {err("privacyAccepted")}
          </p>
        )}
      </div>

      <button type="submit" disabled={status.state === "submitting"} className="btn btn-solid w-full sm:w-auto disabled:cursor-wait disabled:opacity-70">
        {status.state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending&hellip;
          </>
        ) : (
          <>
            Send consultation request
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="sr-only" aria-live="polite">
        {status.state === "submitting" ? "Sending your request" : ""}
      </p>
    </form>
  );
}
