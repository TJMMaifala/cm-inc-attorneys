import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { offices, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

// Draft: keep out of search results until CMI approves the text.
export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice (Draft)",
  description: "How CMI Attorneys handles personal information submitted through this website.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Notice"
      path="/privacy"
      intro="How CMI Attorneys handles personal information submitted through this website, in line with the Protection of Personal Information Act 4 of 2013 (POPIA)."
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by {site.name} ({site.legalName}) [registered details to be
        confirmed by the firm], with offices at {offices[0].streetAddress}, Polokwane and{" "}
        {offices[1].streetAddress}, Johannesburg. For privacy questions, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. What information we collect</h2>
      <p>
        We collect personal information only when you send us a consultation request through the
        enquiry form, or when you contact us by email or telephone. The form asks for:
      </p>
      <ul>
        <li>your full name, email address and contact number;</li>
        <li>your preferred office, practice area and contact method; and</li>
        <li>a brief description of your enquiry.</li>
      </ul>
      <p>
        Please do not include confidential or privileged information, identity numbers or legal
        documents in the form. The firm will explain how to share documents securely once your
        enquiry is taken on.
      </p>

      <h2>3. Why we use it</h2>
      <p>
        We use this information to respond to your request, to decide which attorney or office is
        best placed to assist you, and to carry out conflict checks where required. We do not use it
        for marketing, and we do not sell it. [Legal basis under POPIA section 11 to be confirmed by
        the firm.]
      </p>

      <h2>4. How the form works</h2>
      <p>
        When you submit the enquiry form, your information is sent over an encrypted (HTTPS)
        connection to this website&rsquo;s server and forwarded by email to the firm through a
        transactional email service ({`Resend`}). The website does not keep a database of
        enquiries. The email provider handles the message on the firm&rsquo;s behalf and may process
        it on servers outside South Africa. [Cross-border transfer safeguards under POPIA section 72
        to be confirmed by the firm.]
      </p>

      <h2>5. Cookies and analytics</h2>
      <p>
        This website does not currently use analytics or advertising cookies. If that changes, this
        notice will be updated and your consent will be requested where required. Links to Google
        Maps open in a new tab; Google&rsquo;s own privacy terms apply once you leave this website.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        [Retention period for enquiries that do not become matters, and for those that do, to be
        confirmed by the firm in line with its record-keeping obligations.]
      </p>

      <h2>7. Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect personal information,
        including encrypted connections, server-side validation of the enquiry form and spam
        controls. No method of transmission over the internet is completely secure.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Under POPIA you may ask us to confirm what personal information we hold about you, to
        correct or delete it, and to object to its processing. Contact{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. You may also complain to the Information
        Regulator at{" "}
        <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
          inforegulator.org.za
        </a>
        .
      </p>

      <h2>9. Changes to this notice</h2>
      <p>
        We may update this notice from time to time. [Effective date to be added on approval.] See
        also our <Link href="/popia">POPIA information</Link>, <Link href="/paia">PAIA</Link> and{" "}
        <Link href="/disclaimer">legal disclaimer</Link>.
      </p>
    </LegalPage>
  );
}
