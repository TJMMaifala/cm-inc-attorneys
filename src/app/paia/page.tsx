import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "PAIA (Draft)",
  description: "Promotion of Access to Information Act (PAIA) information for CMI Attorneys.",
  path: "/paia",
  noindex: true,
});

export default function PaiaPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Promotion of Access to Information"
      path="/paia"
      intro="Information on requesting records from CMI Attorneys under the Promotion of Access to Information Act 2 of 2000 (PAIA)."
    >
      <h2>PAIA manual</h2>
      <p>
        [The firm&rsquo;s approved PAIA manual will be published here once the document has been
        supplied. No manual link is shown until then.]
      </p>

      <h2>Requesting information</h2>
      <p>
        Requests for access to records can be directed to the firm&rsquo;s Information Officer at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. [Information Officer name, and the
        prescribed request form and fees, to be confirmed by CMI.]
      </p>
    </LegalPage>
  );
}
