import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { mapsDirectionsUrl, mapsSearchUrl, site, type Office } from "@/config/site";

export function OfficeCard({ office, tone = "light" }: { office: Office; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const action = `inline-flex items-center gap-2 text-sm font-semibold link-rule ${dark ? "text-white" : "text-navy-900"}`;
  return (
    <article
      aria-labelledby={`office-${office.id}`}
      className={`flex h-full flex-col border-t-2 p-7 sm:p-9 ${
        dark ? "border-white bg-white/5" : "border-navy-900 bg-mist"
      }`}
    >
      <p className={`eyebrow ${dark ? "text-navy-100" : "text-brand-grey"}`}>{office.region}</p>
      <h3 id={`office-${office.id}`} className={`mt-2 text-2xl font-bold ${dark ? "text-white" : "text-navy-900"}`}>
        {office.name}
      </h3>
      <address className={`mt-5 not-italic leading-relaxed ${dark ? "text-white/80" : "text-slate"}`}>
        {office.addressLines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>

      <ul className="mt-6 space-y-3 text-sm">
        {office.phones.map((p) => (
          <li key={p.tel}>
            <a
              href={`tel:${p.tel}`}
              className={`inline-flex items-center gap-3 font-semibold ${dark ? "text-white" : "text-navy-900"} hover:underline`}
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                <span className={`mr-2 text-xs font-medium uppercase tracking-[0.12em] ${dark ? "text-white/60" : "text-brand-grey"}`}>
                  {p.label}
                </span>
                {p.display}
              </span>
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${site.email}`}
            className={`inline-flex items-center gap-3 font-semibold ${dark ? "text-white" : "text-navy-900"} hover:underline`}
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {site.email}
          </a>
        </li>
      </ul>

      <div className={`mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-8`}>
        <a href={mapsDirectionsUrl(office.mapsQuery)} target="_blank" rel="noopener noreferrer" className={action}>
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Get directions
          <span className="sr-only"> to the {office.name} (opens in a new tab)</span>
        </a>
        <a href={mapsSearchUrl(office.mapsQuery)} target="_blank" rel="noopener noreferrer" className={action}>
          <MapPin className="h-4 w-4" aria-hidden="true" />
          View on map
          <span className="sr-only"> ({office.name}, opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
