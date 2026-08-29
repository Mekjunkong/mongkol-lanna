import type { CulturalConfidence } from "../catalog/types";

export const CONFIDENCE_LABELS: Readonly<Record<CulturalConfidence, string>> = Object.freeze({
  VERIFIED: "Cultural reference",
  INSPIRED: "Artistic interpretation",
  DECORATIVE: "Decorative visual material",
});

export function customerFacingCategory(confidence: CulturalConfidence): string {
  return CONFIDENCE_LABELS[confidence];
}
