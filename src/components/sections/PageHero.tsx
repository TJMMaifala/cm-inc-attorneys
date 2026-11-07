import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
};

/** Dark editorial page opener used by every inner page. */
export function PageHero({ eyebrow, title, intro, crumbs, children }: Props) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...(crumbs ?? [])];
  return (
    <section className="on-dark facade relative overflow-hidden bg-navy-950 pb-16 pt-36 text-white lg:pb-24 lg:pt-48">
      {crumbs && crumbs.length > 0 && <JsonLd data={breadcrumbJsonLd(trail)} />}
      <div className="container-page">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="hero-rise mb-10 text-xs text-white/65" style={{ ["--d" as string]: 0 }}>
            <ol className="flex flex-wrap items-center gap-2">
              {trail.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i < trail.length - 1 ? (
                    <>
                      <Link href={c.path} className="hover:text-white hover:underline">
                        {c.name}
                      </Link>
                      <ChevronRight className="h-3 w-3" aria-hidden="true" />
                    </>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow hero-rise flex items-center gap-4 text-navy-100" style={{ ["--d" as string]: 80 }}>
          <span aria-hidden="true" className="hero-line h-px w-12 bg-white/50" style={{ ["--d" as string]: 300 }} />
          {eyebrow}
        </p>
        <h1 className="display hero-rise mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-7xl" style={{ ["--d" as string]: 160 }}>
          {title}
        </h1>
        {intro && (
          <div className="hero-rise mt-8 max-w-2xl text-lg leading-relaxed text-white/80" style={{ ["--d" as string]: 280 }}>
            {intro}
          </div>
        )}
        {children && (
          <div className="hero-rise mt-10" style={{ ["--d" as string]: 400 }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
