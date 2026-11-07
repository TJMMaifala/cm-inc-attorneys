import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { communityInitiatives } from "@/content/firm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Community Service and Social Development",
  description:
    "CMI Attorneys visits old-age centres to speak about estate planning, shares career information at rural schools, hosts a constitutional litigation competition with university students, and provides pro bono work.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community service and social development"
        title={<>Law that gives <strong>back</strong>.</>}
        intro="The firm's social development responsibilities include education, outreach and pro bono support."
        crumbs={[{ name: "Community Service", path: "/community" }]}
      />

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Photo
                name="team-three"
                ratio="4 / 4.2"
                sizes="(min-width: 1024px) 38vw, 92vw"
                position="45% 30%"
                reveal
              />
              <Reveal delay={150}>
                <p className="mt-6 text-sm text-slate">
                  Members of the CMI Attorneys team. The firm describes these activities in its 2027
                  company profile.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our commitments" title={<>Four ways the firm <strong>serves</strong> its community.</>} />
            <ol className="mt-12 border-t border-navy-900">
              {communityInitiatives.map((c, i) => (
                <li key={c.number} className="border-b border-line">
                  <Reveal delay={i * 60}>
                    <div className="grid gap-4 py-9 sm:grid-cols-[5rem_1fr]">
                      <span className="font-serif text-5xl font-light italic text-brand-grey">{c.number}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-navy-900">{c.title}</h2>
                        <p className="mt-3 text-lg text-slate">{c.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="on-dark facade bg-navy-900 py-20 text-white lg:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="display text-3xl sm:text-4xl">
                Are you an organisation, school or community group?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-lg text-white/80">
                If you would like to speak to the firm about its community work, or believe you may
                need pro bono legal support, get in touch.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ButtonLink href="/contact#consultation" variant="light" arrow>
              Contact the firm
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
