import type { GenerationKind, MoneyEstimate } from "./provider";

export interface GenerationCostRecord {
  jobId: string;
  attemptNumber: number;
  provider: string;
  model: string;
  kind: GenerationKind;
  estimate: MoneyEstimate;
  actual: MoneyEstimate | null;
  durationMs: number | null;
  recordedAt: Date;
}

export function assertMoney(value: MoneyEstimate): MoneyEstimate {
  if (!Number.isSafeInteger(value.amountMinor) || value.amountMinor < 0) {
    throw new RangeError("Money amountMinor must be a non-negative safe integer");
  }
  if (!/^[A-Z]{3}$/.test(value.currency)) throw new TypeError("Currency must be an ISO-style three-letter uppercase code");
  return value;
}

export function createCostRecord(input: Omit<GenerationCostRecord, "estimate" | "actual"> & {
  estimate: MoneyEstimate;
  actual?: MoneyEstimate | null;
}): GenerationCostRecord {
  const estimate = assertMoney(input.estimate);
  const actual = input.actual == null ? null : assertMoney(input.actual);
  if (actual && actual.currency !== estimate.currency) throw new TypeError("Estimated and actual cost currencies must match");
  return { ...input, estimate, actual };
}
