import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { additionalServiceGroups } from "@/content/practice-areas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Practice Areas",
  description:
    "CMI Attorneys practice areas: commercial and corporate law, estate planning and wills, tender, energy and mineral rights law, family law, notarial services, and constitutional litigation. Offices in Polokwane and Sandton.",
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title={<>Six principal <strong>practice</strong> areas.</>}
        intro="From company documents and commercial disputes to wills, tenders and constitutional litigation, CMI Attorneys advises and acts across a focused range of legal services."
        crumbs={[{ name: "Practice Areas", path: "/practice-areas" }]}
      />

      <section className="section">
        <div className="container-page">
          <PracticeIndex detailed />
        </div>
      </section>

      <section id="additional-services" className="section bg-mist">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="Additional services" title={<>And <strong>more</strong>.</>}>
                <p>
                  Alongside its six principal practice areas, the firm&rsquo;s overview lists the
                  following further areas of work.
                </p>
              </SectionHeading>
              <Reveal delay={150}>
                <div className="mt-10 hidden lg:block">
                  <Photo name="team-standing" ratio="4 / 3" sizes="30vw" position="50% 25%" />
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
              {additionalServiceGroups.map((group, i) => (
                <Reveal key={group.title} delay={(i % 2) * 100}>
                  <section aria-labelledby={`group-${i}`} className="border-t-2 border-navy-900 pt-5">
                    <h3 id={`group-${i}`} className="text-lg font-bold text-navy-900">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.services.map((s) => (
                        <li key={s.id} id={s.id} className="flex gap-3 text-slate">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-navy-900" />
                          {s.href ? (
                            <Link
                              href={s.href}
                              className="group inline-flex items-center gap-2 font-semibold text-navy-900 link-rule"
                            >
                              {s.title}
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              <span className="sr-only">(see the related practice area)</span>
                            </Link>
                          ) : (
                            s.title
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <p className="mt-12 max-w-2xl text-sm text-slate">
                Not sure which area your matter falls under? Choose &ldquo;I am not sure&rdquo; on the
                enquiry form and the firm will direct your request to the right person.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
