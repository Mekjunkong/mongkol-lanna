import { describe, expect, it } from "vitest";
import {
  ART_CRITIC_DIMENSIONS,
  deterministicMockCritique,
  evaluateArtwork,
  type ArtCriticDimension,
} from "./art-critic";

function dimensions(score: number) {
  return Object.fromEntries(ART_CRITIC_DIMENSIONS.map((dimension) => [
    dimension,
    { score, evidence: `Evidence for ${dimension}` },
  ])) as Record<ArtCriticDimension, { score: number; evidence: string }>;
}

describe("Art Critic", () => {
  it("scores all dimensions out of 100 and routes a passing asset", () => {
    const result = evaluateArtwork({ dimensions: dimensions(90), failureTags: [] });
    expect(result.score).toBe(90);
    expect(result.status).toBe("PREVIEW_READY");
    expect(result.automaticRegeneration).toBe(false);
  });

  it("routes low scores to human review without regeneration", () => {
    const result = evaluateArtwork({ dimensions: dimensions(60), failureTags: [] });
    expect(result.status).toBe("REVIEW_REQUIRED");
    expect(result.automaticRegeneration).toBe(false);
  });

  it("hard failure tags force review even with a high score", () => {
    const result = evaluateArtwork({ dimensions: dimensions(98), failureTags: ["FAKE_TEXT"] });
    expect(result.score).toBe(98);
    expect(result.failureTags).toEqual(["FAKE_TEXT"]);
    expect(result.status).toBe("REVIEW_REQUIRED");
    expect(result.automaticRegeneration).toBe(false);
  });

  it("produces deterministic mock critique clearly marked simulated", () => {
    const first = deterministicMockCritique("asset-1:blueprint-2");
    const second = deterministicMockCritique("asset-1:blueprint-2");
    expect(first).toEqual(second);
    expect(first.simulated).toBe(true);
  });

  it("rejects missing dimensions and out-of-range scores", () => {
    expect(() => evaluateArtwork({ dimensions: {} as never, failureTags: [] })).toThrow();
    const invalid = dimensions(80);
    invalid.COMPOSITION.score = 101;
    expect(() => evaluateArtwork({ dimensions: invalid, failureTags: [] })).toThrow();
  });
});
