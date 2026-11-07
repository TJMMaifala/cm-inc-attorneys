import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Error 404"
      title={<>This page could not be <strong>found</strong>.</>}
      intro="The page you are looking for may have moved, or the address may have been typed incorrectly."
    >
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/" variant="light" arrow>
          Return home
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact the firm
        </ButtonLink>
      </div>
    </PageHero>
  );
}
