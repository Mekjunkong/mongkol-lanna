import { describe, expect, it } from "vitest";
import { generationRequestHash, stableJson, type GenerationHashInput } from "./hash";

const base: GenerationHashInput = {
  blueprintId: "blueprint-1",
  blueprintRevision: 3,
  promptVersion: "prompt-v2",
  provider: "mock",
  model: "atelier-v1",
  parameters: { steps: 20, nested: { guidance: 7, seed: 42 } },
  outputFormat: "portrait",
};

describe("generationRequestHash", () => {
  it("is a stable SHA-256 digest independent of object key insertion order", () => {
    const reordered: GenerationHashInput = {
      outputFormat: "portrait",
      parameters: { nested: { seed: 42, guidance: 7 }, steps: 20 },
      model: "atelier-v1",
      provider: "mock",
      promptVersion: "prompt-v2",
      blueprintRevision: 3,
      blueprintId: "blueprint-1",
    };
    expect(generationRequestHash(base)).toBe(generationRequestHash(reordered));
    expect(generationRequestHash(base)).toMatch(/^[a-f0-9]{64}$/);
  });

  it("changes when a generation identity field changes", () => {
    expect(generationRequestHash({ ...base, blueprintRevision: 4 })).not.toBe(generationRequestHash(base));
  });

  it("rejects ambiguous unsupported values", () => {
    expect(() => stableJson({ value: undefined })).toThrow(/undefined/);
    expect(() => stableJson({ value: Number.NaN })).toThrow(/non-finite/);
  });
});
