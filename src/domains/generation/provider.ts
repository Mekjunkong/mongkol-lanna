export type GenerationKind = "PREVIEW" | "HD";
export type ProviderJobState = "QUEUED" | "GENERATING" | "SUCCEEDED" | "FAILED" | "CANCELLED";

export interface MoneyEstimate {
  amountMinor: number;
  currency: string;
  estimated: boolean;
}

export interface ProviderGenerationInput {
  requestHash: string;
  prompt: string;
  negativePrompt: string;
  model: string;
  outputFormat: string;
  width: number;
  height: number;
  parameters: Readonly<Record<string, unknown>>;
}

export interface ProviderJob {
  providerGenerationId: string;
  state: ProviderJobState;
  assetUrl?: string;
  actualCost?: MoneyEstimate;
  metadata: Readonly<Record<string, unknown>>;
}

export type ProviderStatus = ProviderJob;

export interface CancelResult {
  supported: boolean;
  cancelled: boolean;
}

export interface ImageProvider {
  readonly name: string;
  readonly isMock: boolean;
  generatePreview(input: ProviderGenerationInput): Promise<ProviderJob>;
  generateHD(input: ProviderGenerationInput): Promise<ProviderJob>;
  getStatus(providerGenerationId: string): Promise<ProviderStatus>;
  estimateCost(input: ProviderGenerationInput): Promise<MoneyEstimate>;
  cancelIfSupported(providerGenerationId: string): Promise<CancelResult>;
}
