import { z } from "zod";

export const PROMPT_VERSION = "prompt-p0.2";

const structuredPromptInputSchema = z.object({
  chapter: z.enum(["NEW_BEGINNING", "GROWTH_SUCCESS", "HOME_FAMILY", "LOVE_CONNECTION", "INNER_STRENGTH"]),
  emotionalTone: z.enum(["QUIET", "WARM", "MAJESTIC"]),
  centralIntention: z.enum(["NEW_BEGINNING", "GROWTH", "COURAGE", "HARMONY", "GRATITUDE", "REMEMBRANCE", "BELONGING", "RESTORATION"]),
  visualMetaphor: z.enum(["opening-horizon", "patient-rhythm", "long-view", "held-space", "gathered-light", "returning-current"]),
  narrativeMovement: z.enum([
    "opening toward a new field",
    "growing upward in measured stages",
    "gathering around a stable center",
    "moving through layers toward open space",
    "returning through layered distance",
    "flowing back toward a familiar center",
  ]),
  suggestedHero: z.enum(["layered mountain ridge", "winding river", "sunlit botanical canopy", "garden tree"]),
  supportingElements: z.array(z.enum([
    "quiet mist", "observed teak leaves", "river stones", "distant northern hills",
    "rice stems", "restrained antique-gold light", "jasmine sprigs", "broad leaves",
  ])).min(1).max(2),
  collection: z.enum(["MOUNTAIN_MIST", "SACRED_RIVER", "GOLDEN_LANNA", "NORTHERN_GARDEN"]),
  palette: z.enum([
    "mist jade, charcoal, and aged paper",
    "river blue, deep jade, and warm ivory",
    "rice gold, muted vermillion, and charcoal",
    "botanical ivory, leaf jade, and earthen vermillion",
  ]),
  composition: z.enum([
    "low horizon with an open upper field",
    "a gentle current leading toward open space",
    "light gathered near the destination with a grounded foreground",
    "a balanced garden orbit with calm breathing room",
  ]),
}).strict();

export type StructuredPromptInput = z.infer<typeof structuredPromptInputSchema>;

export function compileStructuredPrompt(input: unknown) {
  const value = structuredPromptInputSchema.parse(input);
  return Object.freeze({
    positive: [value.collection, value.suggestedHero, ...value.supportingElements, value.composition, value.palette, value.emotionalTone, value.visualMetaphor, value.narrativeMovement, "contemporary Northern Thai and Lanna-inspired visual direction", "no writing in artwork"].join("; "),
    negative: "text, Thai script, Lanna script, Pali script, pseudo-writing, yantra, sacred text, Buddha imagery, signature, logo, watermark, copied artist style",
    version: PROMPT_VERSION,
  });
}
