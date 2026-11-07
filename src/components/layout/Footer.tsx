import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { disclaimerShort, legalNav, mainNav, mapsSearchUrl, offices, site } from "@/config/site";
import { practiceAreas } from "@/content/practice-areas";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark facade bg-navy-950 text-white">
      <div className="container-page pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/logo-white.png"
              alt={`${site.name}: ${site.tagline}`}
              width={626}
              height={145}
              className="h-14 w-auto"
            />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/75">
              A South African law firm established in {site.foundedYear}, with offices in Polokwane
              and Sandton. {site.credentials.ownership} and a {site.credentials.bbbee}.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-white hover:underline">
                  <Mail className="h-4 w-4 text-white/60" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              {offices.flatMap((o) =>
                o.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 text-white hover:underline">
                      <Phone className="h-4 w-4 text-white/60" aria-hidden="true" />
                      {p.display}
                      <span className="text-xs text-white/50">
                        {o.id === "polokwane" ? "Polokwane" : "Sandton"}
                      </span>
                    </a>
                  </li>
                )),
              )}
            </ul>
          </div>

          <nav aria-label="Practice areas" className="lg:col-span-3">
            <h2 className="eyebrow text-white/60">Practice areas</h2>
            <ul className="mt-5 space-y-0 text-sm">
              {practiceAreas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/practice-areas/${a.slug}`} className="inline-block py-1.5 text-white/85 hover:text-white hover:underline">
                    {a.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/practice-areas#additional-services" className="inline-block py-1.5 text-white/85 hover:text-white hover:underline">
                  Additional services
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h2 className="eyebrow text-white/60">The firm</h2>
            <ul className="mt-5 space-y-0 text-sm">
              {mainNav
                .filter((n) => n.href !== "/practice-areas")
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="inline-block py-1.5 text-white/85 hover:text-white hover:underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/director" className="inline-block py-1.5 text-white/85 hover:text-white hover:underline">
                  Meet the Director
                </Link>
              </li>
              <li>
                <Link href="/community" className="inline-block py-1.5 text-white/85 hover:text-white hover:underline">
                  Community Service
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-white/60">Our offices</h2>
            <div className="mt-6 space-y-6 text-sm">
              {offices.map((o) => (
                <address key={o.id} className="not-italic">
                  <p className="font-semibold">{o.name}</p>
                  <p className="mt-1 leading-relaxed text-white/75">
                    {o.addressLines.slice(0, o.id === "polokwane" ? 3 : 3).join(", ")}
                  </p>
                  <a
                    href={mapsSearchUrl(o.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-white/85 hover:text-white hover:underline"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    View on map
                    <span className="sr-only"> ({o.name}, opens in a new tab)</span>
                  </a>
                </address>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-white/60">{disclaimerShort}</p>
          <div className="mt-6 flex flex-col gap-4 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p>
                &copy; {year} {site.name}. {site.legalName}. All rights reserved.
              </p>
              <p>
                Website created by{" "}
                <a
                  href="https://www.instagram.com/thabo_maifala/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  Thabo Maifala
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
