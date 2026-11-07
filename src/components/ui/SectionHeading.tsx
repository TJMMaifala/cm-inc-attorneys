import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  className = "",
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal variant="fade">
        <p className={`eyebrow flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${dark ? "text-navy-100" : "text-navy-700"}`}>
          <span aria-hidden="true" className={`h-px w-10 ${dark ? "bg-white/50" : "bg-navy-900/40"}`} />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <Tag className={`display mt-5 text-4xl sm:text-5xl ${dark ? "text-white" : "text-navy-900"}`}>
          {title}
        </Tag>
      </Reveal>
      {children && (
        <Reveal delay={160}>
          <div className={`mt-6 text-lg leading-relaxed ${dark ? "text-white/80" : "text-slate"}`}>
            {children}
          </div>
        </Reveal>
      )}
    </div>
  );
}
