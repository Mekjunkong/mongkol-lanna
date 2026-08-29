import type { SpiritualLevel, SymbolRecord } from "../catalog/types";
import { isAutomaticSymbol } from "./policy";

const forbiddenRequest = /(?:\b(?:asian|oriental|balinese|japanese|chinese|khmer|tibetan)\b|อักษร|ยันต์|คาถา|มนต์|พระพุทธ|buddha|mantra|yantra|sacred text|pseudo[- ]?script|inscription|calligraphy|signature|watermark|logo|copy (?:this|the) (?:art|artist)|in the style of)/iu;

export type CulturalGuardResult = Readonly<{ allowed: boolean; reasons: readonly string[] }>;

export function guardCustomerRequest(value: string, spiritualLevel: SpiritualLevel): CulturalGuardResult {
  const reasons: string[] = [];
  if (spiritualLevel === "SACRED") reasons.push("SACRED_AUTOMATION_DISABLED");
  if (forbiddenRequest.test(value.normalize("NFKC"))) reasons.push("PROHIBITED_CULTURAL_OR_TEXT_REQUEST");
  return Object.freeze({ allowed: reasons.length === 0, reasons: Object.freeze(reasons) });
}

export function guardSymbols(symbols: readonly SymbolRecord[], spiritualLevel: SpiritualLevel): CulturalGuardResult {
  const reasons = symbols.filter((symbol) => !isAutomaticSymbol(symbol, spiritualLevel)).map((symbol) => `SYMBOL_NOT_AUTOMATIC:${symbol.id}`);
  return Object.freeze({ allowed: reasons.length === 0, reasons: Object.freeze(reasons) });
}
