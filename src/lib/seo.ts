import type { Metadata } from "next";
import { offices, site } from "@/config/site";
import { practiceAreas } from "@/content/practice-areas";

type PageMeta = {
  title: string;
  description: string;
  /** Path beginning with "/". */
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
  publishedTime,
}: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_ZA",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Schema.org structured data. Only verified facts from src/config/site.ts are used:
 * no ratings, reviews, opening hours or coordinates are published.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/images/logo.png`,
        email: site.email,
        foundingDate: String(site.foundedYear),
        slogan: site.tagline,
      },
      ...offices.map((o) => ({
        "@type": "LegalService",
        "@id": `${site.url}/#${o.id}`,
        name: `${site.name}, ${o.name.replace(" Office", "")}`,
        url: `${site.url}/contact`,
        parentOrganization: { "@id": `${site.url}/#organization` },
        email: site.email,
        telephone: o.phones[0].tel,
        image: `${site.url}/opengraph-image.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: o.streetAddress,
          addressLocality: o.locality,
          addressRegion: o.province,
          addressCountry: "ZA",
        },
        areaServed: o.id === "polokwane" ? "Polokwane and Limpopo" : "Sandton and Gauteng",
        knowsAbout: practiceAreas.map((a) => a.title),
      })),
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
