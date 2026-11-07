import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Professional Team",
  description:
    "The attorneys and legal professionals of CMI Attorneys, working together across the firm's Polokwane and Sandton offices.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our professional team"
        title={<>One firm, <strong>one</strong> standard.</>}
        intro="CMI Attorneys brings together attorneys and legal professionals who work as a team across the firm's Polokwane and Sandton offices."
        crumbs={[{ name: "Our Team", path: "/team" }]}
      />

      <section className="section pb-12 lg:pb-16">
        <div className="container-page">
          <Photo
            name="team-group"
            ratio="16 / 9"
            sizes="(min-width: 1280px) 1150px, 92vw"
            position="50% 28%"
            priority
            reveal
          />
          <Reveal delay={100}>
            <p className="mt-4 text-sm text-slate">The CMI Attorneys team.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Collective expertise" title={<>Working <strong>together</strong>.</>} />
          </div>
          <Reveal delay={100} className="lg:col-span-7">
            <div className="prose-cmi text-lg">
              <p>
                Matters at CMI Attorneys draw on the whole team: from commercial and corporate
                drafting, estate planning and notarial work to litigation in the High Court and the
                Magistrates&rsquo; Courts.
              </p>
              <p>
                The firm is led by its Director,{" "}
                <Link href="/director">Mr Clarrence Mangena</Link>, and is{" "}
                100% Black-owned and a B-BBEE Level 1 contributor.
              </p>
              <p className="text-base">
                Individual team profiles will be added once each team member and the firm have
                confirmed the details to be published.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="on-dark facade bg-navy-950 py-20 text-white lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            <Photo name="team-standing" ratio="4 / 5" sizes="(min-width: 768px) 30vw, 92vw" position="50% 20%" reveal />
            <Photo name="team-laptop" ratio="4 / 5" sizes="(min-width: 768px) 30vw, 92vw" position="50% 35%" reveal delay={120} className="md:mt-12" />
            <Photo name="team-three" ratio="4 / 5" sizes="(min-width: 768px) 30vw, 92vw" position="40% 30%" reveal delay={240} />
          </div>
          <Reveal delay={150}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-8">
              <p className="max-w-xl text-lg text-white/80">
                Want to speak to a member of the team about your matter?
              </p>
              <ButtonLink href="/contact#consultation" variant="light" arrow>
                Request a consultation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
