import type { SpiritualLevel, SymbolRecord } from "../catalog/types";

export const CULTURAL_REGION = "THAI_LANNA" as const;
export const AUTOMATIC_SPIRITUAL_LEVELS: readonly SpiritualLevel[] = Object.freeze(["CULTURAL", "SYMBOLIC"]);

export function isAutomaticSymbol(symbol: SymbolRecord, requestedLevel: SpiritualLevel): boolean {
  if (requestedLevel === "SACRED" || symbol.region !== CULTURAL_REGION || !symbol.active || symbol.status !== "PUBLISHED") return false;
  if (symbol.category === "MYTHOLOGICAL" || symbol.spiritualMin === "SACRED" || symbol.spiritualMax === "SACRED") return false;
  if (symbol.confidence === "VERIFIED" && symbol.culturalReview?.status !== "APPROVED") return false;
  const rank = { CULTURAL: 0, SYMBOLIC: 1, SACRED: 2 } as const;
  return rank[requestedLevel] >= rank[symbol.spiritualMin] && rank[requestedLevel] <= rank[symbol.spiritualMax];
}
