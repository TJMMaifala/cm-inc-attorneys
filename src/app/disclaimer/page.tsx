import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Legal Disclaimer (Draft)",
  description:
    "Legal disclaimer for the CMI Attorneys website: general information only, no attorney-client relationship and no guarantees of outcome.",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Legal Disclaimer"
      path="/disclaimer"
      intro="Please read this disclaimer before relying on any information on this website."
    >
      <h2>General information only</h2>
      <p>
        The content of this website is provided for general information and does not constitute
        legal advice. The law changes, and every matter depends on its own facts. Please do not act
        or refrain from acting on the basis of this website without first obtaining advice from a
        qualified legal practitioner.
      </p>

      <h2>No attorney-client relationship</h2>
      <p>
        Visiting this website, or sending a consultation request, does not create an attorney-client
        relationship. A relationship exists only once the firm has confirmed in writing that it has
        accepted your instruction. A consultation request is not a confirmed appointment.
      </p>

      <h2>No guarantees</h2>
      <p>
        Descriptions of the firm&rsquo;s services are not a promise or guarantee of any outcome.
        Past experience described on this website is not a prediction of the result of any future
        matter.
      </p>

      <h2>Professional regulation</h2>
      <p>
        [Statement on the firm&rsquo;s regulation by the Legal Practice Council, and any required
        registration or fidelity fund details, to be confirmed by CMI.]
      </p>

      <h2>External links</h2>
      <p>
        This website links to third-party websites, such as Google Maps. The firm is not responsible
        for their content or privacy practices.
      </p>

      <p>
        See also the <Link href="/privacy">Privacy Notice</Link>.
      </p>
    </LegalPage>
  );
}
