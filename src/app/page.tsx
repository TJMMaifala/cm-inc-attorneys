import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { OfficeCard } from "@/components/sections/OfficeCard";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { accessibleCourts, offices, site } from "@/config/site";
import { communityInitiatives, directorProfile, whyChoose } from "@/content/firm";
import { getArticles } from "@/content/insights";

const facts = [
  { k: "2021", v: "Established and incorporated" },
  { k: "100%", v: "Black-owned" },
  { k: "Level 1", v: "B-BBEE contributor" },
  { k: "135%", v: "Procurement recognition" },
  { k: "2", v: "Offices: Polokwane and Sandton" },
];

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <>
      {/* 1. HERO */}
      <section className="on-dark facade relative overflow-hidden bg-navy-950 pb-20 pt-32 text-white lg:pb-28 lg:pt-44">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p
              className="eyebrow hero-rise flex items-center gap-4 text-navy-100"
              style={{ ["--d" as string]: 100 }}
            >
              <span
                aria-hidden="true"
                className="hero-line h-px w-12 bg-white/50"
                style={{ ["--d" as string]: 400 }}
              />
              Polokwane &amp; Sandton
            </p>
            <h1
              className="display hero-rise mt-7 text-[2.6rem] leading-[1.04] sm:text-6xl xl:text-7xl"
              style={{ ["--d" as string]: 200 }}
            >
              Sound legal <strong>counsel</strong>, with your <strong>interests</strong> at heart.
            </h1>
            <p
              className="hero-rise mt-8 max-w-xl text-lg leading-relaxed text-white/80"
              style={{ ["--d" as string]: 380 }}
            >
              CMI Attorneys advises businesses, families and individuals across commercial and
              corporate law, estate planning, tender and energy law, family law, notarial services
              and constitutional litigation.
            </p>
            <div
              className="hero-rise mt-10 flex flex-wrap gap-4"
              style={{ ["--d" as string]: 520 }}
            >
              <ButtonLink href="/contact#consultation" variant="light" arrow>
                Request a consultation
              </ButtonLink>
              <ButtonLink href="/practice-areas" variant="outline">
                Explore practice areas
              </ButtonLink>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div
              aria-hidden="true"
              className="hero-rise absolute -bottom-6 -left-6 hidden h-3/4 w-3/4 bg-navy-800 sm:block"
              style={{ ["--d" as string]: 300 }}
            />
            {/* The photo is the LCP element, so it is never animated in: it paints immediately. */}
            <div className="relative">
              <Photo
                name="team-group"
                ratio="4 / 3.4"
                sizes="(min-width: 1024px) 46vw, 92vw"
                position="50% 30%"
                priority
              />
              <p className="hero-rise absolute bottom-0 right-0 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-900" style={{ ["--d" as string]: 700 }}>
                {site.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CREDENTIALS */}
      <section aria-label="Firm credentials" className="border-b border-line bg-white">
        <div className="container-page">
          <ul className="grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
            {facts.map((f, i) => (
              <li
                key={f.k}
                className={`py-8 lg:px-8 lg:first:pl-0 ${i === facts.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <Reveal delay={i * 70}>
                  <p className="font-serif text-4xl font-light text-navy-900 sm:text-5xl">{f.k}</p>
                  <p className="mt-2 text-sm font-medium text-slate">{f.v}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. INTRODUCTION */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Photo
              name="buildings"
              ratio="4 / 5"
              sizes="(min-width: 1024px) 40vw, 92vw"
              position="50% 40%"
              alt="Glass office towers photographed from below against a pale sky"
              reveal
              className="max-h-[42rem]"
            />
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="About the firm" title={<>A modern practice with <strong>serious</strong> foundations.</>} />
            <Reveal delay={100}>
              <div className="prose-cmi mt-8 max-w-2xl text-lg">
                <p>
                  CMI Attorneys was established in {site.foundedYear} under the name and style{" "}
                  {site.legalName}, and was incorporated in {site.incorporated}. It is a{" "}
                  {site.credentials.ownership.toLowerCase()} firm and a {site.credentials.bbbee}, with{" "}
                  {site.credentials.procurement}.
                </p>
                <p>
                  The firm serves clients from offices in Polokwane, Limpopo and Sandton,
                  Johannesburg, and has access to the Polokwane High Court and a range of magistrate
                  courts across the region.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8">
                <Link href="/about" className="inline-flex items-center gap-3 font-bold text-navy-900 link-rule">
                  Read the firm&rsquo;s story <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. PRACTICE AREAS */}
      <section className="section bg-mist">
        <div className="container-page">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Practice areas" title={<>Six areas of <strong>practice</strong>, one firm.</>}>
              <p>
                From company incorporation to constitutional litigation, the firm&rsquo;s work is
                organised into six principal practice areas.
              </p>
            </SectionHeading>
            <Reveal variant="fade">
              <ButtonLink href="/practice-areas" variant="outline-dark" arrow>
                All practice areas
              </ButtonLink>
            </Reveal>
          </div>
          <PracticeIndex />
        </div>
      </section>

      {/* 5. DIRECTOR */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-24">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <SectionHeading eyebrow="Meet the Director" title={<>{directorProfile.name}</>}>
              <p>{directorProfile.intro}</p>
            </SectionHeading>
            <Reveal delay={150}>
              <ul className="mt-10 grid max-w-2xl gap-6 border-t border-navy-900 pt-8 sm:grid-cols-2">
                <li>
                  <p className="eyebrow text-brand-grey">Qualification</p>
                  <p className="mt-1 font-semibold text-navy-900">LLB, University of Venda</p>
                </li>
                <li>
                  <p className="eyebrow text-brand-grey">Admitted</p>
                  <p className="mt-1 font-semibold text-navy-900">29 November 2019, High Court</p>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-10">
                <ButtonLink href="/director" variant="solid" arrow>
                  Read the full profile
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:max-w-none">
            <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full border border-navy-900 sm:-right-6 sm:-top-6" />
            <Photo
              name="director"
              ratio="4 / 5"
              sizes="(min-width: 1024px) 38vw, 90vw"
              position="50% 20%"
              reveal
            />
          </div>
        </div>
      </section>

      {/* 6. TEAM */}
      <section className="on-dark relative bg-navy-950 text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem]">
            <Photo
              name="team-standing"
              ratio="4 / 3"
              sizes="(min-width: 1024px) 50vw, 100vw"
              position="50% 25%"
              className="h-full !aspect-auto min-h-[22rem] lg:absolute lg:inset-0"
              alt="Four members of the CMI Attorneys team standing in front of law reports"
            />
          </div>
          <div className="facade px-5 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
            <SectionHeading eyebrow="Our professional team" title={<>People who <strong>work</strong> as one.</>} tone="dark">
              <p>
                CMI Attorneys brings together attorneys and legal professionals across its
                Polokwane and Sandton offices, working together on matters from commercial contracts
                to constitutional litigation.
              </p>
            </SectionHeading>
            <Reveal delay={200}>
              <div className="mt-10">
                <ButtonLink href="/team" variant="light" arrow>
                  Meet the team
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Why CMI Attorneys" title={<>Why clients <strong>choose</strong> the firm.</>} />
          <ol className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 3) * 90}>
                  <div className="border-t-2 border-navy-900 pt-6">
                    <p className="font-serif text-sm font-semibold italic text-brand-grey">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-navy-900">{item.title}</h3>
                    <p className="mt-3 text-slate">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. OFFICES */}
      <section className="on-dark facade bg-navy-900 py-20 text-white lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Our offices" title={<>Two offices, <strong>one</strong> firm.</>} tone="dark">
            <p>
              Visit the firm in Polokwane, Limpopo or Sandton, Johannesburg. The Polokwane office has
              access to the courts below.
            </p>
          </SectionHeading>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {offices.map((o, i) => (
              <Reveal key={o.id} delay={i * 120}>
                <OfficeCard office={o} tone="dark" />
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div className="mt-12 border-t border-white/20 pt-8">
              <p className="eyebrow text-white/60">Courts accessible from Polokwane</p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/85">
                {accessibleCourts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. COMMUNITY */}
      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Community service" title={<>Law that gives <strong>back</strong>.</>}>
              <p>
                The firm&rsquo;s social development responsibilities include education, legal
                outreach and pro bono support.
              </p>
            </SectionHeading>
            <Reveal delay={150}>
              <div className="mt-10">
                <ButtonLink href="/community" variant="outline-dark" arrow>
                  Our community work
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <ul className="lg:col-span-7">
            {communityInitiatives.map((c, i) => (
              <li key={c.number} className="border-t border-line first:border-navy-900">
                <Reveal delay={i * 70}>
                  <div className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr]">
                    <span className="font-serif text-3xl font-light italic text-brand-grey">{c.number}</span>
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{c.title}</h3>
                      <p className="mt-2 text-slate">{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. INSIGHTS */}
      <section className="section bg-mist">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Legal insights" title={<>Legal <strong>insights</strong> and resources.</>}>
              <p>
                A home for legal updates and explanatory resources on commercial, constitutional,
                estate, family and procurement law.
              </p>
            </SectionHeading>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              {articles.length === 0 ? (
                <div className="border border-dashed border-brand-grey bg-white p-8 sm:p-10">
                  <BookOpen className="h-8 w-8 text-navy-900" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-bold text-navy-900">Articles are on their way</h3>
                  <p className="mt-2 text-slate">
                    The firm publishes only content it has reviewed and approved. In the meantime,
                    the team is happy to answer questions about its practice areas.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-navy-900">
                    <Link href="/insights" className="link-rule">
                      About the insights section
                    </Link>
                    <Link href="/contact#consultation" className="link-rule">
                      Ask the firm a question
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-line border-y border-navy-900 bg-white">
                  {articles.slice(0, 3).map((a) => (
                    <li key={a.slug}>
                      <Link href={`/insights/${a.slug}`} className="block p-6 hover:bg-navy-50">
                        <span className="font-bold text-navy-900">{a.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11. CTA */}
      <CtaBand />
    </>
  );
}
