import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getArticles } from "@/content/insights";
import { practiceAreas } from "@/content/practice-areas";

/**
 * Draft legal pages (/privacy, /popia, /paia, /disclaimer) are deliberately left out
 * until CMI approves them. Add them here when the noindex flag is removed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/director", priority: 0.7 },
    { path: "/team", priority: 0.6 },
    { path: "/practice-areas", priority: 0.9 },
    { path: "/community", priority: 0.5 },
    { path: "/insights", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];
  const articles = await getArticles();

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...practiceAreas.map((a) => ({
      url: `${site.url}/practice-areas/${a.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
