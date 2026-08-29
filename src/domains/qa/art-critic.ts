import { z } from "zod";

export const ART_CRITIC_DIMENSIONS = [
  "THAI_LANNA_CONSISTENCY", "COMPOSITION", "CRAFTSMANSHIP", "COLOR_HARMONY",
  "SYMBOL_COHERENCE", "NEGATIVE_SPACE", "HERO_CLARITY", "ARCHITECTURE",
  "ANATOMY", "AI_ARTIFACTS", "FAKE_TEXT", "WATERMARK_LOGO", "ASPECT_SAFE_ZONE",
] as const;

export type ArtCriticDimension = (typeof ART_CRITIC_DIMENSIONS)[number];

export const HARD_FAILURE_TAGS = [
  "FAKE_TEXT", "WATERMARK_OR_LOGO", "CULTURAL_POLICY_VIOLATION", "SACRED_CONTENT",
  "WRONG_ASPECT_RATIO", "SAFE_ZONE_VIOLATION",
] as const;
export type HardFailureTag = (typeof HARD_FAILURE_TAGS)[number];

const dimensionResultSchema = z.object({
  score: z.number().int().min(0).max(100),
  evidence: z.string().min(1).max(500),
});

export const artCriticInputSchema = z.object({
  dimensions: z.record(z.enum(ART_CRITIC_DIMENSIONS), dimensionResultSchema),
  failureTags: z.array(z.enum(HARD_FAILURE_TAGS)).default([]),
  simulated: z.boolean().default(false),
});

export type ArtCriticInput = z.input<typeof artCriticInputSchema>;
export type QaRoutingStatus = "PREVIEW_READY" | "REVIEW_REQUIRED";

export interface ArtCriticResult {
  score: number;
  dimensions: Record<ArtCriticDimension, z.infer<typeof dimensionResultSchema>>;
  failureTags: HardFailureTag[];
  status: QaRoutingStatus;
  simulated: boolean;
  automaticRegeneration: false;
}

export const ART_CRITIC_PASS_SCORE = 75;

export function evaluateArtwork(input: ArtCriticInput): ArtCriticResult {
  const parsed = artCriticInputSchema.parse(input);
  const sum = ART_CRITIC_DIMENSIONS.reduce((total, dimension) => total + parsed.dimensions[dimension].score, 0);
  const score = Math.round(sum / ART_CRITIC_DIMENSIONS.length);
  const status: QaRoutingStatus = score < ART_CRITIC_PASS_SCORE || parsed.failureTags.length > 0
    ? "REVIEW_REQUIRED"
    : "PREVIEW_READY";
  return {
    score,
    dimensions: parsed.dimensions,
    failureTags: [...new Set(parsed.failureTags)],
    status,
    simulated: parsed.simulated,
    automaticRegeneration: false,
  };
}

export function deterministicMockCritique(seed: string): ArtCriticResult {
  let state = 2166136261;
  for (const character of seed) state = Math.imul(state ^ character.charCodeAt(0), 16777619) >>> 0;
  const dimensions = Object.fromEntries(ART_CRITIC_DIMENSIONS.map((dimension, index) => [
    dimension,
    { score: 78 + ((state >>> (index % 16)) % 18), evidence: "Simulated deterministic mock evaluation." },
  ])) as Record<ArtCriticDimension, { score: number; evidence: string }>;
  return evaluateArtwork({ dimensions, failureTags: [], simulated: true });
}
