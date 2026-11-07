import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/content/practice-areas";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Editorial index of the six principal practice areas. Deliberately a ruled list rather
 * than a grid of cards, so it reads like the contents page of a legal journal.
 */
export function PracticeIndex({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="border-t border-navy-900">
      {practiceAreas.map((area, i) => (
        <li key={area.slug} className="border-b border-line">
          <Reveal delay={i * 60}>
            <Link
              href={`/practice-areas/${area.slug}`}
              className="index-row group grid items-start gap-x-8 gap-y-3 py-7 sm:grid-cols-[4.5rem_1fr_auto] lg:py-9"
            >
              <span className="font-serif text-4xl font-light italic text-brand-grey transition-colors group-hover:text-navy-900 sm:text-5xl">
                {area.number}
              </span>
              <span>
                <span className="block text-xl font-bold text-navy-900 sm:text-2xl">
                  {area.title}
                </span>
                <span className="mt-2 block max-w-2xl text-slate">{area.summary}</span>
                {detailed && (
                  <span className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
                    {area.categories.slice(0, 4).map((c) => (
                      <span
                        key={c.title}
                        className="border border-line px-3 py-1 text-xs font-medium text-slate"
                      >
                        {c.title}
                      </span>
                    ))}
                  </span>
                )}
              </span>
              <span
                className="index-arrow hidden h-12 w-12 place-items-center border border-navy-900 text-navy-900 sm:grid"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
