import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "POPIA Information (Draft)",
  description: "Information about personal information protection at CMI Attorneys under POPIA.",
  path: "/popia",
  noindex: true,
});

export default function PopiaPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="POPIA Information"
      path="/popia"
      intro="CMI Attorneys processes personal information in accordance with the Protection of Personal Information Act 4 of 2013."
    >
      <h2>Our commitment</h2>
      <p>
        We process personal information lawfully and reasonably, only for a specific purpose, and
        keep it secure. The <Link href="/privacy">Privacy Notice</Link> explains what information
        this website collects and why.
      </p>

      <h2>Information Officer</h2>
      <p>
        [Name of the firm&rsquo;s Information Officer and registration details with the Information
        Regulator to be supplied by CMI.]
      </p>
      <p>
        Questions or requests about personal information can be sent to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Your rights as a data subject</h2>
      <ul>
        <li>To be told what personal information we hold about you.</li>
        <li>To ask us to correct or delete personal information that is inaccurate or unlawfully held.</li>
        <li>To object to the processing of your personal information.</li>
        <li>To complain to the Information Regulator.</li>
      </ul>
      <p>
        Information Regulator:{" "}
        <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
          inforegulator.org.za
        </a>
        .
      </p>
    </LegalPage>
  );
}
