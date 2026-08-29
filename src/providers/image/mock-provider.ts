import { createHash } from "node:crypto";
import type {
  CancelResult,
  ImageProvider,
  MoneyEstimate,
  ProviderGenerationInput,
  ProviderJob,
  ProviderStatus,
} from "@/domains/generation/provider";

function mockId(kind: "preview" | "hd", input: ProviderGenerationInput): string {
  const digest = createHash("sha256")
    .update(`${kind}:${input.requestHash}:${input.model}:${input.width}x${input.height}`)
    .digest("hex")
    .slice(0, 24);
  return `mock_${kind}_${digest}`;
}

function completedJob(kind: "preview" | "hd", input: ProviderGenerationInput): ProviderJob {
  const providerGenerationId = mockId(kind, input);
  return {
    providerGenerationId,
    state: "SUCCEEDED",
    assetUrl: `/mock-assets/${providerGenerationId}.svg`,
    actualCost: { amountMinor: 0, currency: "USD", estimated: false },
    metadata: { simulated: true, kind, width: input.width, height: input.height },
  };
}

export class MockImageProvider implements ImageProvider {
  readonly name = "mock";
  readonly isMock = true;

  async generatePreview(input: ProviderGenerationInput): Promise<ProviderJob> {
    return completedJob("preview", input);
  }

  async generateHD(input: ProviderGenerationInput): Promise<ProviderJob> {
    return completedJob("hd", input);
  }

  async getStatus(providerGenerationId: string): Promise<ProviderStatus> {
    if (!/^mock_(preview|hd)_[a-f0-9]{24}$/.test(providerGenerationId)) {
      return { providerGenerationId, state: "FAILED", metadata: { simulated: true, reason: "UNKNOWN_MOCK_JOB" } };
    }
    return {
      providerGenerationId,
      state: "SUCCEEDED",
      assetUrl: `/mock-assets/${providerGenerationId}.svg`,
      actualCost: { amountMinor: 0, currency: "USD", estimated: false },
      metadata: { simulated: true },
    };
  }

  async estimateCost(input: ProviderGenerationInput): Promise<MoneyEstimate> {
    void input;
    return { amountMinor: 0, currency: "USD", estimated: true };
  }

  async cancelIfSupported(providerGenerationId: string): Promise<CancelResult> {
    void providerGenerationId;
    return { supported: false, cancelled: false };
  }
}
