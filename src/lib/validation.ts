/**
 * Enquiry form validation, shared by the browser form and the API route so both
 * enforce exactly the same rules. No third-party dependency needed.
 */
import { enquiryTopics } from "@/content/practice-areas";

export const OFFICE_OPTIONS = [
  { value: "polokwane", label: "Polokwane" },
  { value: "sandton", label: "Sandton" },
  { value: "no-preference", label: "No preference" },
] as const;

export const CONTACT_METHOD_OPTIONS = [
  { value: "phone", label: "Telephone call" },
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp message" },
] as const;

export type EnquiryInput = {
  fullName: string;
  email: string;
  phone: string;
  office: string;
  practiceArea: string;
  contactMethod: string;
  message: string;
  privacyAccepted: boolean;
};

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const LIMITS = {
  fullName: { min: 2, max: 120 },
  email: { max: 254 },
  phone: { min: 7, max: 20 },
  message: { min: 20, max: 2000 },
} as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[0-9][0-9\s\-().]{5,}$/;

const oneOf = (value: string, options: readonly { value: string }[]) =>
  options.some((o) => o.value === value);

/** Strips control characters (including CR/LF, to block header injection) and trims. */
export function cleanLine(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

export function cleanBlock(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function normaliseEnquiry(raw: Record<string, unknown>): EnquiryInput {
  return {
    fullName: cleanLine(raw.fullName, LIMITS.fullName.max),
    email: cleanLine(raw.email, LIMITS.email.max).toLowerCase(),
    phone: cleanLine(raw.phone, LIMITS.phone.max),
    office: cleanLine(raw.office, 30),
    practiceArea: cleanLine(raw.practiceArea, 80),
    contactMethod: cleanLine(raw.contactMethod, 30),
    message: cleanBlock(raw.message, LIMITS.message.max),
    privacyAccepted: raw.privacyAccepted === true || raw.privacyAccepted === "true" || raw.privacyAccepted === "on",
  };
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (input.fullName.length < LIMITS.fullName.min) {
    errors.fullName = "Please enter your full name.";
  }
  if (!EMAIL_RE.test(input.email)) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }
  const digits = input.phone.replace(/\D/g, "");
  if (
    !PHONE_RE.test(input.phone) ||
    digits.length < LIMITS.phone.min ||
    digits.length > 15
  ) {
    errors.phone = "Please enter a valid contact number, for example 082 123 4567.";
  }
  if (!oneOf(input.office, OFFICE_OPTIONS)) {
    errors.office = "Please choose your preferred office.";
  }
  if (!oneOf(input.practiceArea, enquiryTopics)) {
    errors.practiceArea = "Please choose the area your enquiry relates to.";
  }
  if (!oneOf(input.contactMethod, CONTACT_METHOD_OPTIONS)) {
    errors.contactMethod = "Please choose how you would like us to contact you.";
  }
  if (input.message.length < LIMITS.message.min) {
    errors.message = `Please describe your enquiry briefly (at least ${LIMITS.message.min} characters).`;
  } else if (input.message.length > LIMITS.message.max) {
    errors.message = `Please keep your enquiry under ${LIMITS.message.max} characters.`;
  }
  if (!input.privacyAccepted) {
    errors.privacyAccepted =
      "Please confirm that you have read the privacy notice before sending.";
  }
  return errors;
}

export function labelFor(
  value: string,
  options: readonly { value: string; label: string }[],
) {
  return options.find((o) => o.value === value)?.label ?? value;
}
