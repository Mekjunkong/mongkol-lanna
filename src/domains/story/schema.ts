import { z } from "zod";
import { intentionSchema, journeyStateSchema, lifeThemeSchema, toneSchema } from "../catalog/schemas";

export const STORY_INTERPRETATION_VERSION = "story-rules-1.0.0";
export const storySafetyFlagSchema = z.enum(["PROHIBITED_TEXT", "CULTURAL_MIXING", "REFERENCE_COPYING", "SACRED_REQUEST", "ASTROLOGY_REQUEST", "EXCESSIVE_SYMBOLS"]);

function sentenceCount(value: string): number {
  return value.split(/[.!?。！？]+|\n+/u).map((part) => part.trim()).filter(Boolean).length;
}

export const storyInputSchema = z.object({
  story: z.string().trim().min(1).max(800).refine((value) => sentenceCount(value) <= 5, "Story must contain at most five sentences").refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u.test(value), "Story contains control characters"),
  intention: intentionSchema,
});

export const storyInterpretationSchema = z.object({
  lifeTheme: lifeThemeSchema,
  emotionalTone: z.array(toneSchema).max(2),
  intention: intentionSchema,
  journeyState: journeyStateSchema,
  visualMetaphorIds: z.array(z.string()).max(2),
  safetyFlags: z.array(storySafetyFlagSchema),
  needsConfirmation: z.boolean(),
  interpretationVersion: z.literal(STORY_INTERPRETATION_VERSION),
}).readonly();

export type StoryInput = z.infer<typeof storyInputSchema>;
export type StoryInterpretation = z.infer<typeof storyInterpretationSchema>;
export type StorySafetyFlag = z.infer<typeof storySafetyFlagSchema>;
