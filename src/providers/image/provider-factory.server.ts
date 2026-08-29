import type { ImageProvider } from "@/domains/generation/provider";
import type { ServerEnvironment } from "@/config/env.server";
import { parseServerEnvironment } from "@/config/env.server";
import { MockImageProvider } from "./mock-provider";

export class RealGenerationUnavailableError extends Error {
  constructor() {
    super("REAL_GENERATION=true was requested, but no approved real image provider is implemented");
    this.name = "RealGenerationUnavailableError";
  }
}

export function createImageProvider(
  environment: Pick<ServerEnvironment, "REAL_GENERATION"> = parseServerEnvironment(),
): ImageProvider {
  if (!environment.REAL_GENERATION) return new MockImageProvider();
  throw new RealGenerationUnavailableError();
}
