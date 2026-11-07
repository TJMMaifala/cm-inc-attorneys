import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { OfficeCard } from "@/components/sections/OfficeCard";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { offices, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact and Consultation",
  description:
    "Contact CMI Attorneys in Polokwane (Bendor) or Sandton. Call, email or send a consultation request through the online enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact and consultation"
        title={<>Let&rsquo;s discuss <strong>your</strong> matter.</>}
        intro="Call or email either office, or send a consultation request and a member of the team will contact you using your preferred method."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="section pb-10 lg:pb-14">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-3">
            {offices.map((o) => (
              <li key={o.id}>
                <a
                  href={`tel:${o.phones[0].tel}`}
                  className="group flex h-full items-center gap-5 border border-line p-6 transition-colors hover:border-navy-900 hover:bg-navy-50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center bg-navy-900 text-white">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="eyebrow block text-brand-grey">Call {o.name.replace(" Office", "")}</span>
                    <span className="mt-1 block text-lg font-bold text-navy-900">{o.phones[0].display}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group flex h-full items-center gap-5 border border-line p-6 transition-colors hover:border-navy-900 hover:bg-navy-50"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-navy-900 text-white">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block text-brand-grey">Email</span>
                  <span className="mt-1 block text-[0.95rem] font-bold text-navy-900 [overflow-wrap:anywhere] sm:text-lg">{site.email}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-5">
            <h2 className="display text-3xl text-navy-900 sm:text-4xl">
              Our <strong>offices</strong>
            </h2>
            {offices.map((o, i) => (
              <Reveal key={o.id} delay={i * 100}>
                <OfficeCard office={o} />
              </Reveal>
            ))}
          </div>

          <div id="consultation" className="scroll-mt-28 lg:col-span-7">
            <h2 className="display text-3xl text-navy-900 sm:text-4xl">
              Request a <strong>consultation</strong>
            </h2>
            <p className="mt-4 max-w-xl text-slate">
              Tell us briefly about your matter and how you would like to be contacted. The firm
              will respond to your request; it is not a confirmed appointment.
            </p>
            <div className="mt-10 border-t-2 border-navy-900 bg-white pt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
