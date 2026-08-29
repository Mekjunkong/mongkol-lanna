import { isAutomaticRetryEligible } from "./errors";

export const MAX_AUTOMATIC_RETRIES = 1 as const;

export type GenerationStatus =
  | "DRAFT" | "BLUEPRINT_CONFIRMED" | "PROMPT_READY" | "QUEUED" | "GENERATING"
  | "QA_PENDING" | "REVIEW_REQUIRED" | "PREVIEW_READY" | "FAILED" | "TIMED_OUT"
  | "HD_QUEUED" | "HD_READY" | "DELIVERED";

export interface GenerationEvent {
  from: GenerationStatus | null;
  to: GenerationStatus;
  type: string;
  at: Date;
  metadata: Readonly<Record<string, unknown>>;
}

const transitions: Readonly<Record<GenerationStatus, readonly GenerationStatus[]>> = {
  DRAFT: ["BLUEPRINT_CONFIRMED"],
  BLUEPRINT_CONFIRMED: ["PROMPT_READY"],
  PROMPT_READY: ["QUEUED"],
  QUEUED: ["GENERATING", "FAILED", "TIMED_OUT"],
  GENERATING: ["QA_PENDING", "FAILED", "TIMED_OUT"],
  QA_PENDING: ["REVIEW_REQUIRED", "PREVIEW_READY", "FAILED"],
  REVIEW_REQUIRED: ["PREVIEW_READY", "FAILED"],
  PREVIEW_READY: ["HD_QUEUED", "DELIVERED"],
  FAILED: ["QUEUED"],
  TIMED_OUT: [],
  HD_QUEUED: ["GENERATING", "FAILED", "TIMED_OUT"],
  HD_READY: ["DELIVERED"],
  DELIVERED: [],
};

export function transitionGeneration(
  current: GenerationStatus,
  next: GenerationStatus,
  type: string,
  metadata: Readonly<Record<string, unknown>> = {},
  at = new Date(),
): GenerationEvent {
  if (!transitions[current].includes(next)) throw new Error(`Invalid generation transition: ${current} -> ${next}`);
  return { from: current, to: next, type, metadata, at };
}

export function canAutomaticallyRetry(retryCount: number, error: unknown): boolean {
  if (!Number.isInteger(retryCount) || retryCount < 0) throw new RangeError("retryCount must be a non-negative integer");
  return retryCount < MAX_AUTOMATIC_RETRIES && isAutomaticRetryEligible(error);
}

export function nextAutomaticRetryCount(retryCount: number, error: unknown): number {
  if (!canAutomaticallyRetry(retryCount, error)) throw new Error("Automatic retry is not permitted");
  return retryCount + 1;
}

export function timeoutStatus(deadline: Date, now = new Date()): GenerationStatus | null {
  return now.getTime() >= deadline.getTime() ? "TIMED_OUT" : null;
}
