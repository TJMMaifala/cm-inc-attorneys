import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getArticles, insightCategories } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Legal Insights and Resources",
  description:
    "Legal updates and resources from CMI Attorneys on corporate, constitutional, estate planning, family, and procurement and tender law.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getArticles();
  const [first, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Legal <strong>insights</strong> and resources.</>}
        intro="Legal updates and explanatory resources from CMI Attorneys. The firm publishes only content it has reviewed and approved."
        crumbs={[{ name: "Insights", path: "/insights" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12">
            <aside className="lg:col-span-3" aria-label="Topics">
              <h2 className="eyebrow text-brand-grey">Topics we cover</h2>
              <ul className="mt-5 border-t border-navy-900">
                {insightCategories.map((c) => (
                  <li key={c.id} className="border-b border-line py-3 text-sm font-semibold text-navy-900">
                    {c.label}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="lg:col-span-9">
              {articles.length === 0 ? (
                <Reveal>
                  <div className="border border-dashed border-brand-grey p-10 sm:p-14">
                    <BookOpen className="h-10 w-10 text-navy-900" aria-hidden="true" />
                    <h2 className="mt-6 text-3xl font-bold text-navy-900">
                      No articles have been published yet
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-slate">
                      This section is ready for the firm&rsquo;s legal updates and resources, and
                      will be populated once articles have been written and approved by CMI
                      Attorneys.
                    </p>
                    <p className="mt-4 max-w-xl text-slate">
                      In the meantime, you are welcome to browse the firm&rsquo;s practice areas or
                      ask the team a question.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-bold text-navy-900">
                      <Link href="/practice-areas" className="link-rule">
                        Explore practice areas
                      </Link>
                      <Link href="/contact#consultation" className="link-rule">
                        Request a consultation
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ) : (
                <div className="space-y-16">
                  <ArticleCard article={first} featured />
                  {rest.length > 0 && (
                    <div className="grid gap-12 border-t border-navy-900 pt-12 md:grid-cols-2">
                      {rest.map((a) => (
                        <ArticleCard key={a.slug} article={a} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
