import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/insights/ArticleLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { getArticle, getArticles, getRelatedArticles } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const related = await getRelatedArticles(article);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
    publisher: { "@id": `${site.url}/#organization` },
    ...(article.author ? { author: { "@type": "Person", name: article.author.name } } : {}),
    ...(article.featuredImage ? { image: `${site.url}${article.featuredImage.src}` } : {}),
  };

  return (
    <>
      <JsonLd data={ld} />
      <ArticleLayout article={article} related={related} />
    </>
  );
}
