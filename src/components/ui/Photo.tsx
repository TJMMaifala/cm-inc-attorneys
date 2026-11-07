import Image from "next/image";
import { images } from "@/content/firm";
import type { ImageKey } from "@/content/practice-areas";
import { Reveal } from "./Reveal";

type Props = {
  name: ImageKey;
  /** CSS aspect-ratio, e.g. "4 / 5". Defaults to the image's intrinsic ratio. */
  ratio?: string;
  sizes: string;
  position?: string;
  priority?: boolean;
  reveal?: boolean;
  delay?: number;
  alt?: string;
  className?: string;
  zoom?: boolean;
};

/** Registry-backed photograph with a fixed aspect ratio (no layout shift). */
export function Photo({
  name,
  ratio,
  sizes,
  position = "center",
  priority,
  reveal = false,
  delay,
  alt,
  className = "",
  zoom = false,
}: Props) {
  const img = images[name];
  const frame = (
    <div
      className={`relative overflow-hidden bg-navy-100 ${zoom ? "zoom-frame" : ""} ${className}`}
      style={{ aspectRatio: ratio ?? `${img.width} / ${img.height}` }}
    >
      <Image
        src={img.src}
        alt={alt ?? img.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={90}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
  if (!reveal) return frame;
  return (
    <Reveal variant="image" delay={delay}>
      {frame}
    </Reveal>
  );
}
