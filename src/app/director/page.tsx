import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { directorProfile } from "@/content/firm";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meet the Director, Mr Clarrence Mangena",
  description:
    "Mr Clarrence Mangena, Director of CMI Attorneys: LLB (University of Venda), admitted attorney of the High Court, formerly an associate at Espag Magwai Attorneys and Law Researcher at the Constitutional Court of South Africa.",
  path: "/director",
});

export default function DirectorPage() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Clarrence Mangena",
    jobTitle: "Director",
    worksFor: { "@id": `${site.url}/#organization` },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Venda" },
    url: `${site.url}/director`,
  };

  return (
    <>
      <JsonLd data={person} />
      <PageHero
        eyebrow="Meet the Director"
        title={<>{directorProfile.name}</>}
        intro={directorProfile.intro}
        crumbs={[{ name: "Meet the Director", path: "/director" }]}
      />

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full bg-navy-100" />
                <Photo
                  name="director"
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  position="50% 20%"
                  priority
                  className="relative"
                />
              </div>
              <dl className="mt-12 grid gap-5 border-t border-navy-900 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <dt className="eyebrow text-brand-grey">Qualification</dt>
                  <dd className="mt-1 font-semibold text-navy-900">LLB, University of Venda</dd>
                </div>
                <div>
                  <dt className="eyebrow text-brand-grey">LLB conferred</dt>
                  <dd className="mt-1 font-semibold text-navy-900">17 May 2017</dd>
                </div>
                <div>
                  <dt className="eyebrow text-brand-grey">Admitted</dt>
                  <dd className="mt-1 font-semibold text-navy-900">
                    Attorney of the High Court, 29 November 2019
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-brand-grey">Articles</dt>
                  <dd className="mt-1 font-semibold text-navy-900">Espag Magwai Attorneys</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-3xl text-navy-900 sm:text-4xl">
                Career <strong>timeline</strong>
              </h2>
            </Reveal>
            <ol className="relative mt-10 border-l border-navy-900/30 pl-8">
              {directorProfile.timeline.map((t, i) => (
                <li key={t.title} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.45rem] top-1.5 h-3 w-3 border-2 border-navy-900 bg-white"
                  />
                  <Reveal delay={i * 40}>
                    <p className="font-serif text-lg italic text-brand-grey">{t.date}</p>
                    <h3 className="mt-1 text-xl font-bold text-navy-900">{t.title}</h3>
                    <p className="mt-2 text-slate">{t.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <Reveal>
            <h2 className="display max-w-2xl text-3xl text-navy-900 sm:text-4xl">
              Professional <strong>experience</strong>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h3 className="border-t-2 border-navy-900 pt-5 text-xl font-bold text-navy-900">
                Espag Magwai Attorneys
              </h3>
              <p className="mt-2 text-sm text-slate">Articles and Associate. Duties included:</p>
              <ul className="mt-5 space-y-3 text-slate">
                {directorProfile.espagDuties.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-navy-900" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="border-t-2 border-navy-900 pt-5 text-xl font-bold text-navy-900">
                Constitutional Court of South Africa
              </h3>
              <p className="mt-2 text-sm text-slate">
                Law Researcher to Justice Tshiqi. Duties included:
              </p>
              <ul className="mt-5 space-y-3 text-slate">
                {directorProfile.constitutionalCourtDuties.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-navy-900" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Discuss your matter with the firm."
        body="Send a consultation request to CMI Attorneys. Requests are not confirmed appointments."
      />
    </>
  );
}
