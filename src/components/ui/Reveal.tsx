"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "rise" | "fade" | "image" | "line";
  /** Delay in milliseconds, useful for staggering siblings. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-triggered entrance. Content stays fully visible unless the page has flagged
 * `html.motion` (set by an inline script only when the visitor has not requested
 * reduced motion), so no-JS and reduced-motion visitors always see everything.
 */
export function Reveal({ children, variant = "rise", delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("motion")) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: variant === "image" ? 0.01 : 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      style={{ "--d": delay } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
