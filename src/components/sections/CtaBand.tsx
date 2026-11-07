import { Mail, Phone } from "lucide-react";
import { offices, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title?: string;
  body?: string;
  topic?: string;
};

/** Consultation call-to-action used at the foot of most pages. */
export function CtaBand({
  title = "Speak to CMI Attorneys about your matter.",
  body = "Send a consultation request and a member of the team will contact you using your preferred method. Requests are not confirmed appointments.",
  topic,
}: Props) {
  const href = topic ? `/contact?topic=${topic}#consultation` : "/contact#consultation";
  return (
    <section className="on-dark facade relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      <div className="container-page grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 max-w-xl text-lg text-white/80">{body}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={href} variant="light" arrow>
                Request a consultation
              </ButtonLink>
              <ButtonLink href="/practice-areas" variant="outline">
                Explore practice areas
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-5">
          <ul className="space-y-0 border-t border-white/25 text-sm">
            {offices.map((o) => (
              <li key={o.id} className="border-b border-white/25">
                <a
                  href={`tel:${o.phones[0].tel}`}
                  className="flex items-center justify-between gap-4 py-5 transition-colors hover:text-navy-100"
                >
                  <span>
                    <span className="eyebrow block text-white/60">{o.name}</span>
                    <span className="mt-1 block text-xl font-light">{o.phones[0].display}</span>
                  </span>
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="border-b border-white/25">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center justify-between gap-4 py-5 transition-colors hover:text-navy-100"
              >
                <span>
                  <span className="eyebrow block text-white/60">Email</span>
                  <span className="mt-1 block text-xl font-light break-all">{site.email}</span>
                </span>
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
