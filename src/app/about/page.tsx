import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { OfficeCard } from "@/components/sections/OfficeCard";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { accessibleCourts, accessibleOffices, offices, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About CMI Attorneys",
  description:
    "CMI Attorneys was established in 2021 and is a 100% Black-owned, B-BBEE Level 1 law firm with offices in Polokwane and Sandton. Learn about the firm, its credentials and its community work.",
  path: "/about",
});

const credentials = [
  { k: "100%", title: "Black-owned", body: "The firm is 100% Black-owned." },
  { k: "Level 1", title: "B-BBEE contributor", body: "A B-BBEE Level 1 contributor." },
  {
    k: "135%",
    title: "Procurement recognition",
    body: "Clients procuring the firm's services receive 135% procurement recognition.",
  },
];

const principles = [
  {
    title: "Professional integrity",
    body: "Every matter is approached with the standards expected of the legal profession, and with the client's interests in view.",
  },
  {
    title: "Accessible service",
    body: "Offices in Polokwane and Sandton, and straightforward ways to get in touch: by telephone, email or the online enquiry form.",
  },
  {
    title: "Practical, focused work",
    body: "From drafting and advisory work to litigation, the firm concentrates on six principal practice areas and the services around them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title={<>A young firm with <strong>serious</strong> foundations.</>}
        intro="CMI Attorneys was established in 2021 and serves clients from offices in Polokwane, Limpopo and Sandton, Johannesburg."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      {/* Story */}
      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our story" title={<>From a single practice to <strong>two</strong> offices.</>} />
            <Reveal delay={100}>
              <div className="prose-cmi mt-8 max-w-2xl text-lg">
                <p>
                  The firm was established in {site.foundedYear} under the name and style{" "}
                  {site.legalName}, and was incorporated in {site.incorporated}. It trades as{" "}
                  {site.name}: {site.tagline}.
                </p>
                <p>
                  CMI Attorneys is led by Director Mr Clarrence Mangena, an admitted attorney of the
                  High Court who has worked in civil and commercial litigation and served as a Law
                  Researcher at the Constitutional Court of South Africa. The firm&rsquo;s work spans
                  commercial and corporate law, estate planning, tender and energy law, family law,
                  notarial services, and constitutional and public law.
                </p>
                <p>
                  The firm is {site.credentials.ownership.toLowerCase()} and a{" "}
                  {site.credentials.bbbee}, and is committed to community service alongside its legal
                  practice.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/director" variant="solid" arrow>
                  Meet the Director
                </ButtonLink>
                <ButtonLink href="/practice-areas" variant="outline-dark">
                  Our practice areas
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Photo
              name="team-group"
              ratio="5 / 4.4"
              sizes="(min-width: 1024px) 40vw, 92vw"
              position="50% 30%"
              reveal
            />
            <Reveal delay={150}>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-navy-900 pt-6 text-sm">
                <div>
                  <dt className="eyebrow text-brand-grey">Established</dt>
                  <dd className="mt-1 font-semibold text-navy-900">{site.foundedYear}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-brand-grey">Incorporated</dt>
                  <dd className="mt-1 font-semibold text-navy-900">{site.incorporated}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="on-dark facade bg-navy-900 py-20 text-white lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Credentials" title={<>Ownership and <strong>transformation</strong>.</>} tone="dark" />
          <ul className="mt-14 grid gap-px bg-white/20 sm:grid-cols-3">
            {credentials.map((c, i) => (
              <li key={c.title} className="bg-navy-900 py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <Reveal delay={i * 100}>
                  <p className="font-serif text-6xl font-light">{c.k}</p>
                  <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-white/75">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service philosophy */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title={<>Our approach to <strong>clients</strong>.</>} />
          <ol className="mt-14 grid gap-12 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 100}>
                  <div className="border-t-2 border-navy-900 pt-6">
                    <h3 className="text-xl font-bold text-navy-900">{p.title}</h3>
                    <p className="mt-3 text-slate">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where we serve */}
      <section className="section bg-mist">
        <div className="container-page">
          <SectionHeading eyebrow="Where we serve" title={<>Polokwane and <strong>Sandton</strong>.</>}>
            <p>
              The Polokwane office is situated at Rhodesdrift Office Park in Bendor. The firm also
              has an office in Sandton, Johannesburg.
            </p>
          </SectionHeading>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {offices.map((o, i) => (
              <Reveal key={o.id} delay={i * 100}>
                <OfficeCard office={o} />
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <Reveal>
              <h3 className="text-xl font-bold text-navy-900">Courts accessible to the firm</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {accessibleCourts.map((c) => (
                  <li key={c} className="py-3 text-slate">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="text-xl font-bold text-navy-900">Offices and registries</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {accessibleOffices.map((c) => (
                  <li key={c} className="py-3 text-slate">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate">
                Access to the courts and offices listed is as stated in the firm&rsquo;s 2027
                company profile.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Photo
              name="team-three"
              ratio="5 / 4"
              sizes="(min-width: 1024px) 45vw, 92vw"
              position="50% 30%"
              reveal
            />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Community" title={<>Committed beyond the <strong>courtroom</strong>.</>}>
              <p>
                The firm visits old-age centres to speak with pensioners about estate planning,
                visits rural schools each year to share career information, hosts a constitutional
                litigation competition with university students, and provides pro bono work where it
                is needed.
              </p>
            </SectionHeading>
            <Reveal delay={150}>
              <div className="mt-10">
                <ButtonLink href="/community" variant="outline-dark" arrow>
                  Community service
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
