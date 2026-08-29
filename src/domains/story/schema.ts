import { z } from "zod";
import { intentionSchema, journeyStateSchema, lifeThemeSchema, toneSchema } from "../catalog/schemas";

export const STORY_INTERPRETATION_VERSION = "story-rules-1.0.0";
export const storySafetyFlagSchema = z.enum(["PROHIBITED_TEXT", "CULTURAL_MIXING", "REFERENCE_COPYING", "SACRED_REQUEST", "ASTROLOGY_REQUEST", "EXCESSIVE_SYMBOLS"]);
export const lifeChapterSchema = z.enum(["NEW_BEGINNING", "GROWTH_SUCCESS", "HOME_FAMILY", "LOVE_CONNECTION", "INNER_STRENGTH"]);
export const collectionDirectionSchema = z.enum(["MOUNTAIN_MIST", "SACRED_RIVER", "GOLDEN_LANNA", "NORTHERN_GARDEN"]);
export const customerMoodSchema = z.enum(["QUIET", "WARM", "MAJESTIC"]);

function sentenceCount(value: string): number {
  return value.split(/[.!?。！？]+|\n+/u).map((part) => part.trim()).filter(Boolean).length;
}

export const storyInputSchema = z.object({
  story: z.string().trim().max(800).refine((value) => sentenceCount(value) <= 5, "Story must contain at most five sentences").refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u.test(value), "Story contains control characters").default(""),
  intention: intentionSchema.optional(),
  chapter: lifeChapterSchema.optional(),
  collection: collectionDirectionSchema.default("MOUNTAIN_MIST"),
  mood: customerMoodSchema.default("QUIET"),
}).refine((value) => Boolean(value.intention || value.chapter), "Life chapter is required");

export const storyInterpretationSchema = z.object({
  lifeTheme: lifeThemeSchema,
  emotionalTone: z.array(toneSchema).max(2),
  intention: intentionSchema,
  journeyState: journeyStateSchema,
  visualMetaphorIds: z.array(z.string()).max(2),
  safetyFlags: z.array(storySafetyFlagSchema),
  needsConfirmation: z.boolean(),
  chapter: lifeChapterSchema,
  centralIntention: intentionSchema,
  visualMetaphor: z.string().min(3),
  narrativeMovement: z.string().min(3),
  suggestedHero: z.string().min(3),
  supportingElements: z.array(z.string()).min(1).max(4),
  collection: collectionDirectionSchema,
  palette: z.string().min(3),
  composition: z.string().min(3),
  interpretationVersion: z.literal(STORY_INTERPRETATION_VERSION),
}).strict().readonly();

export type StoryInput = z.infer<typeof storyInputSchema>;
export type StoryInterpretation = z.infer<typeof storyInterpretationSchema>;
export type StorySafetyFlag = z.infer<typeof storySafetyFlagSchema>;
