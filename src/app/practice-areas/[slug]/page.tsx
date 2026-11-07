import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";
import {
  getAdditionalService,
  getPracticeArea,
  practiceAreas,
} from "@/content/practice-areas";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/practice-areas/${area.slug}`,
  });
}

export default async function PracticeAreaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const related = area.related
    .map((s) => getPracticeArea(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const extras = area.relatedAdditional
    .map((id) => getAdditionalService(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.title,
    description: area.metaDescription,
    url: `${site.url}/practice-areas/${area.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: ["Polokwane", "Limpopo", "Sandton", "Gauteng", "South Africa"],
    serviceType: area.title,
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        eyebrow={`Practice area ${area.number}`}
        title={area.title}
        intro={area.summary}
        crumbs={[
          { name: "Practice Areas", path: "/practice-areas" },
          { name: area.shortTitle, path: `/practice-areas/${area.slug}` },
        ]}
      >
        <ButtonLink href={`/contact?topic=${area.slug}#consultation`} variant="light" arrow>
          Enquire about this area
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <div className="prose-cmi max-w-3xl text-lg">
              {area.intro.map((p) => (
                <Reveal key={p}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <h2 className="display mt-16 text-3xl text-navy-900 sm:text-4xl">
              What the firm <strong>handles</strong>
            </h2>
            <div className="mt-8 border-t border-navy-900">
              {area.categories.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 60}>
                  <section
                    aria-labelledby={`cat-${i}`}
                    className="grid gap-4 border-b border-line py-8 md:grid-cols-[14rem_1fr] md:gap-10"
                  >
                    <div>
                      <h3 id={`cat-${i}`} className="text-lg font-bold text-navy-900">
                        {c.title}
                      </h3>
                      {c.description && <p className="mt-1 text-sm text-slate">{c.description}</p>}
                    </div>
                    <ul className="space-y-3 text-slate">
                      {c.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-navy-900" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>

            <p className="mt-10 max-w-3xl border-l-4 border-navy-100 pl-5 text-sm text-slate">
              This page is a general description of the firm&rsquo;s services and is not legal
              advice. Every matter depends on its own facts; please contact the firm to discuss
              yours.
            </p>
          </div>

          <aside className="lg:col-span-4" aria-label="Enquire and related services">
            <div className="space-y-10 lg:sticky lg:top-28">
              <Photo
                name={area.image}
                alt={area.imageAlt}
                ratio="4 / 3.4"
                sizes="(min-width: 1024px) 30vw, 92vw"
                position="50% 30%"
                reveal
              />
              <div className="border-t-2 border-navy-900 bg-mist p-7">
                <h2 className="text-xl font-bold text-navy-900">Speak to the firm</h2>
                <p className="mt-2 text-sm text-slate">
                  Request a consultation about {area.shortTitle.toLowerCase()}. Requests are not
                  confirmed appointments.
                </p>
                <ButtonLink
                  href={`/contact?topic=${area.slug}#consultation`}
                  variant="solid"
                  arrow
                  className="mt-6 w-full"
                >
                  Request a consultation
                </ButtonLink>
              </div>
              {extras.length > 0 && (
                <div>
                  <h2 className="eyebrow text-brand-grey">Related additional services</h2>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-navy-900">
                    {extras.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={s.href ?? `/practice-areas#${s.id}`}
                          className="inline-flex items-center gap-2 link-rule"
                        >
                          {s.title}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="related-heading">
        <div className="container-page">
          <h2 id="related-heading" className="display text-3xl text-navy-900 sm:text-4xl">
            Related <strong>services</strong>
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/practice-areas/${r.slug}`}
                  className="index-row group flex h-full items-start gap-6 border-t-2 border-navy-900 bg-white p-7 transition-colors hover:bg-navy-50"
                >
                  <span className="font-serif text-4xl font-light italic text-brand-grey">{r.number}</span>
                  <span>
                    <span className="block text-xl font-bold text-navy-900">{r.title}</span>
                    <span className="mt-2 block text-slate">{r.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand topic={area.slug} />
    </>
  );
}
