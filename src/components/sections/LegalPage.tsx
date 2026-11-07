import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "./PageHero";

type Props = {
  eyebrow: string;
  title: string;
  path: string;
  intro?: string;
  children: ReactNode;
  lastReviewed?: string;
};

/** Shared layout for the legal-information pages (all drafts pending CMI approval). */
export function LegalPage({ eyebrow, title, path, intro, children }: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} crumbs={[{ name: title, path }]} />
      <section className="section">
        <div className="container-page">
          <div
            role="note"
            className="mx-auto mb-12 flex max-w-3xl gap-4 border-l-4 border-navy-900 bg-navy-50 p-5 text-sm text-navy-900"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <strong>Draft for review by CMI Attorneys.</strong> This page has been prepared as a
              starting point and has not yet been approved by the firm. Items in square brackets
              must be completed or confirmed before the website is published.
            </p>
          </div>
          <div className="prose-cmi mx-auto max-w-3xl text-base sm:text-lg">{children}</div>
        </div>
      </section>
    </>
  );
}
