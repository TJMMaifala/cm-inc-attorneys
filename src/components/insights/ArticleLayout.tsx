import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Fragment } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleCard } from "./ArticleCard";
import { disclaimerShort } from "@/config/site";
import {
  categoryLabel,
  formatDate,
  readingTime,
  type Article,
  type ArticleBlock,
} from "@/content/insights";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading":
      return block.level === 3 ? <h3>{block.text}</h3> : <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
  }
}

/**
 * Reusable article template: title, optional verified author, date, featured image,
 * reading time, body, related articles and a consultation CTA.
 */
export function ArticleLayout({ article, related }: { article: Article; related: Article[] }) {
  return (
    <>
      <PageHero
        eyebrow={categoryLabel(article.category)}
        title={article.title}
        intro={article.excerpt}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      >
        <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {readingTime(article)} min read
          </span>
          {article.author && (
            <span>
              By {article.author.name}
              {article.author.role ? `, ${article.author.role}` : ""}
            </span>
          )}
        </p>
      </PageHero>

      <article className="section">
        <div className="container-page">
          {article.featuredImage && (
            <div className="relative mx-auto mb-14 aspect-[16/8] max-w-5xl overflow-hidden bg-navy-100">
              <Image
                src={article.featuredImage.src}
                alt={article.featuredImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 92vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="prose-cmi mx-auto max-w-3xl text-lg">
            {article.body.map((block, i) => (
              <Fragment key={i}>
                <Block block={block} />
              </Fragment>
            ))}
            <p className="mt-12 border-l-4 border-navy-100 pl-5 text-sm">{disclaimerShort}</p>
            <p className="mt-8">
              <Link href="/insights" className="inline-flex items-center gap-2 font-semibold no-underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All insights
              </Link>
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-mist" aria-labelledby="related-articles">
          <div className="container-page">
            <h2 id="related-articles" className="display text-3xl text-navy-900 sm:text-4xl">
              Related <strong>articles</strong>
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
