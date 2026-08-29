import { describe, expect, it } from "vitest";
import type { ProviderGenerationInput } from "@/domains/generation/provider";
import { createImageProvider, RealGenerationUnavailableError } from "./provider-factory.server";
import { MockImageProvider } from "./mock-provider";

const input: ProviderGenerationInput = {
  requestHash: "a".repeat(64),
  prompt: "approved compiled prompt",
  negativePrompt: "text, watermark",
  model: "mock-v1",
  outputFormat: "portrait",
  width: 768,
  height: 1024,
  parameters: { seed: 7 },
};

describe("image provider factory", () => {
  it("fails closed to mock whenever real generation is false", () => {
    const provider = createImageProvider({ REAL_GENERATION: false });
    expect(provider).toBeInstanceOf(MockImageProvider);
    expect(provider.isMock).toBe(true);
  });

  it("refuses real generation because no approved adapter exists", () => {
    expect(() => createImageProvider({ REAL_GENERATION: true })).toThrow(RealGenerationUnavailableError);
  });
});

describe("MockImageProvider", () => {
  it("returns deterministic, clearly simulated, zero-cost jobs", async () => {
    const provider = new MockImageProvider();
    const [first, second] = await Promise.all([provider.generatePreview(input), provider.generatePreview(input)]);
    expect(first).toEqual(second);
    expect(first.providerGenerationId).toMatch(/^mock_preview_/);
    expect(first.metadata).toMatchObject({ simulated: true });
    expect(first.actualCost).toEqual({ amountMinor: 0, currency: "USD", estimated: false });
    await expect(provider.estimateCost(input)).resolves.toEqual({ amountMinor: 0, currency: "USD", estimated: true });
  });

  it("separates preview and HD identities", async () => {
    const preview = await providerJob("preview");
    const hd = await providerJob("hd");
    expect(preview.providerGenerationId).not.toBe(hd.providerGenerationId);
  });
});

async function providerJob(kind: "preview" | "hd") {
  const provider = new MockImageProvider();
  return kind === "preview" ? provider.generatePreview(input) : provider.generateHD(input);
}
