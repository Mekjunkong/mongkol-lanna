import Image from "next/image";

type ArtworkTone = "new-dawn" | "guardian" | "sacred-river" | "quiet-mountain" | "golden-forest" | "journey";

type ArtworkCompositionProps = {
  tone?: ArtworkTone;
  title?: string;
  compact?: boolean;
  safeZone?: boolean;
};

export const artworkStudySources: Record<ArtworkTone, string> = {
  "new-dawn": "/art-studies/new-dawn.svg",
  guardian: "/art-studies/guardian.svg",
  "sacred-river": "/art-studies/sacred-river.svg",
  "quiet-mountain": "/art-studies/quiet-mountain.svg",
  "golden-forest": "/art-studies/golden-forest.svg",
  journey: "/art-studies/journey.svg",
};

export function ArtworkComposition({
  tone = "new-dawn",
  title = "Mock Thai-Lanna artwork study",
  compact = false,
  safeZone = false,
}: ArtworkCompositionProps) {
  return (
    <figure className={`artwork artwork--${tone} ${compact ? "artwork--compact" : ""}`}>
      <Image src={artworkStudySources[tone]} alt={title} width={900} height={1120} priority={!compact} />
      <span className="artwork__rule" aria-hidden="true" />
      {safeZone && (
        <span className="artwork__safe" aria-label="พื้นที่ว่างที่สงวนไว้">
          <small>SAFE AREA</small>
        </span>
      )}
      <span className="artwork__disclosure">MOCK ARTWORK · DEVELOPMENT STUDY</span>
    </figure>
  );
}
