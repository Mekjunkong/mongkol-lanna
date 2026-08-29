import { describe, expect, it } from "vitest";
import { GenerationProviderError } from "./errors";
import { canAutomaticallyRetry, nextAutomaticRetryCount, timeoutStatus, transitionGeneration } from "./jobs";
import { resolveDuplicate } from "./idempotency";

describe("generation retry controls", () => {
  const transient = new GenerationProviderError("busy", "TRANSIENT", "UPSTREAM_BUSY");

  it("allows exactly one automatic retry for a typed transient error", () => {
    expect(canAutomaticallyRetry(0, transient)).toBe(true);
    expect(nextAutomaticRetryCount(0, transient)).toBe(1);
    expect(canAutomaticallyRetry(1, transient)).toBe(false);
    expect(() => nextAutomaticRetryCount(1, transient)).toThrow(/not permitted/);
  });

  it("never retries aesthetic/permanent failures or timeouts", () => {
    expect(canAutomaticallyRetry(0, new GenerationProviderError("bad request", "PERMANENT", "BAD_INPUT"))).toBe(false);
    expect(canAutomaticallyRetry(0, new GenerationProviderError("timed out", "TIMEOUT", "DEADLINE"))).toBe(false);
  });

  it("makes timeout inspectable instead of silently requeueing", () => {
    expect(timeoutStatus(new Date("2026-01-01T00:00:00Z"), new Date("2026-01-01T00:00:01Z"))).toBe("TIMED_OUT");
    expect(() => transitionGeneration("TIMED_OUT", "QUEUED", "silent-retry")).toThrow(/Invalid/);
  });
});

describe("duplicate protection", () => {
  const jobs = [
    { id: "job-1", requestHash: "hash-a", idempotencyKey: "key-a", status: "QUEUED" as const },
    { id: "job-2", requestHash: "hash-b", idempotencyKey: "key-b", status: "FAILED" as const },
  ];

  it("reuses exact idempotent submissions", () => {
    expect(resolveDuplicate(jobs, "different", "key-a")).toEqual({ action: "REUSE", jobId: "job-1", reason: "IDEMPOTENCY_KEY" });
  });

  it("reuses an active request hash but permits a new job after terminal failure", () => {
    expect(resolveDuplicate(jobs, "hash-a", "new-key")).toMatchObject({ action: "REUSE", jobId: "job-1" });
    expect(resolveDuplicate(jobs, "hash-b", "new-key")).toEqual({ action: "CREATE" });
  });
});
