import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { categoryLabel, formatDate, readingTime, type Article } from "@/content/insights";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={`group ${featured ? "lg:grid lg:grid-cols-2 lg:gap-12" : ""}`}>
      {article.featuredImage && (
        <Link
          href={`/insights/${article.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="zoom-frame relative block aspect-[16/10] overflow-hidden bg-navy-100"
        >
          <Image
            src={article.featuredImage.src}
            alt=""
            fill
            sizes={featured ? "(min-width: 1024px) 45vw, 92vw" : "(min-width: 768px) 30vw, 92vw"}
            className="object-cover"
          />
        </Link>
      )}
      <div className={article.featuredImage ? "mt-6 lg:mt-0" : ""}>
        <p className="eyebrow text-brand-grey">{categoryLabel(article.category)}</p>
        <h3 className={`mt-3 font-bold text-navy-900 ${featured ? "text-3xl" : "text-xl"}`}>
          <Link href={`/insights/${article.slug}`} className="link-rule">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-slate">{article.excerpt}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {readingTime(article)} min read
          </span>
        </p>
      </div>
    </article>
  );
}
