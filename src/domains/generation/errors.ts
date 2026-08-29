export type GenerationErrorClass = "TRANSIENT" | "PERMANENT" | "TIMEOUT" | "CANCELLED" | "UNKNOWN";

export class GenerationProviderError extends Error {
  constructor(
    message: string,
    readonly errorClass: GenerationErrorClass,
    readonly code: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "GenerationProviderError";
  }
}

export function classifyGenerationError(error: unknown): GenerationErrorClass {
  if (error instanceof GenerationProviderError) return error.errorClass;
  if (error instanceof DOMException && error.name === "AbortError") return "TIMEOUT";
  if (error instanceof Error && /timeout|timed out/i.test(error.message)) return "TIMEOUT";
  return "UNKNOWN";
}

export function isAutomaticRetryEligible(error: unknown): boolean {
  return classifyGenerationError(error) === "TRANSIENT";
}
