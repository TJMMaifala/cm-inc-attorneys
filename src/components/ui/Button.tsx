import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "light" | "outline" | "outline-dark";
  arrow?: boolean;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
};

const variants = {
  solid: "btn btn-solid",
  light: "btn btn-light",
  outline: "btn btn-outline",
  "outline-dark": "btn btn-outline-dark",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  arrow = false,
  className = "",
  external,
  ...rest
}: Props) {
  const classes = `${variants[variant]} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="arrow h-4 w-4 shrink-0" aria-hidden="true" />}
    </>
  );

  const isInternal = href.startsWith("/") && !external;
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
