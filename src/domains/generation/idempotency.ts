import type { GenerationStatus } from "./jobs";

export const ACTIVE_GENERATION_STATUSES = new Set<GenerationStatus>([
  "QUEUED", "GENERATING", "QA_PENDING", "REVIEW_REQUIRED", "HD_QUEUED",
]);

export interface ExistingGenerationJob {
  id: string;
  requestHash: string;
  idempotencyKey: string;
  status: GenerationStatus;
}

export type DuplicateDecision =
  | { action: "REUSE"; jobId: string; reason: "IDEMPOTENCY_KEY" | "ACTIVE_REQUEST_HASH" }
  | { action: "CREATE" };

export function resolveDuplicate(
  existing: readonly ExistingGenerationJob[],
  requestHash: string,
  idempotencyKey: string,
): DuplicateDecision {
  const exact = existing.find((job) => job.idempotencyKey === idempotencyKey);
  if (exact) return { action: "REUSE", jobId: exact.id, reason: "IDEMPOTENCY_KEY" };
  const active = existing.find((job) => job.requestHash === requestHash && ACTIVE_GENERATION_STATUSES.has(job.status));
  return active
    ? { action: "REUSE", jobId: active.id, reason: "ACTIVE_REQUEST_HASH" }
    : { action: "CREATE" };
}
