import { createHash } from "node:crypto";

export interface GenerationHashInput {
  blueprintId: string;
  blueprintRevision: number;
  promptVersion: string;
  provider: string;
  model: string;
  parameters: Readonly<Record<string, unknown>>;
  outputFormat: string;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, canonicalize(child)]),
    );
  }
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new TypeError("Generation hash input cannot contain non-finite numbers");
  }
  if (value === undefined) throw new TypeError("Generation hash input cannot contain undefined");
  return value;
}

export function stableJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

export function generationRequestHash(input: GenerationHashInput): string {
  return createHash("sha256").update(stableJson(input), "utf8").digest("hex");
}
