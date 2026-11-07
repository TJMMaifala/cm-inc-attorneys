/**
 * Insights / legal resources content model.
 *
 * CMS-ready: `getArticles()` and `getArticle()` are the only functions the pages call.
 * To move to a headless CMS later, re-implement those two functions (e.g. fetch from
 * Sanity, Contentful or Payload) and keep the `Article` type; no page needs to change.
 *
 * IMPORTANT: this array is intentionally empty. No articles may be published unless the
 * firm has approved the text and the named author. Do not add placeholder articles.
 */

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type InsightCategory =
  | "legal-updates"
  | "corporate"
  | "constitutional-law"
  | "estate-planning"
  | "family-law"
  | "tender-procurement"
  | "general-resources";

export const insightCategories: { id: InsightCategory; label: string }[] = [
  { id: "legal-updates", label: "Legal updates" },
  { id: "corporate", label: "Corporate legal insights" },
  { id: "constitutional-law", label: "Constitutional law developments" },
  { id: "estate-planning", label: "Estate planning" },
  { id: "family-law", label: "Family law" },
  { id: "tender-procurement", label: "Procurement and tender law" },
  { id: "general-resources", label: "General legal resources" },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  /** ISO date, e.g. "2027-02-14". */
  publishedAt: string;
  /** Only set when the firm has confirmed the author. Otherwise omit. */
  author?: { name: string; role?: string };
  featuredImage?: { src: string; alt: string; width: number; height: number };
  /** Optional manual override; otherwise calculated from the body. */
  readingMinutes?: number;
  /** Related article slugs; falls back to same category. */
  related?: string[];
  body: ArticleBlock[];
  /** Must be true for an article to appear on the site. */
  approvedByFirm: boolean;
};

const articles: Article[] = [];

export function readingTime(article: Pick<Article, "body" | "readingMinutes">) {
  if (article.readingMinutes) return article.readingMinutes;
  const words = article.body
    .map((b) => {
      if (b.type === "list") return b.items.join(" ");
      return b.text;
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getArticles(): Promise<Article[]> {
  return articles
    .filter((a) => a.approvedByFirm)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

export async function getRelatedArticles(article: Article, limit = 3) {
  const all = (await getArticles()).filter((a) => a.slug !== article.slug);
  const explicit = (article.related ?? [])
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));
  const sameCategory = all.filter(
    (a) => a.category === article.category && !explicit.includes(a),
  );
  return [...explicit, ...sameCategory].slice(0, limit);
}

export function categoryLabel(id: InsightCategory) {
  return insightCategories.find((c) => c.id === id)?.label ?? id;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
