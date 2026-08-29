import { z } from "zod";
import { collectionDirectionSchema, customerMoodSchema, lifeChapterSchema, storyInterpretationSchema } from "./schema";

export const ART_DIRECTION_CHOICE_KEY = "mongkol-art-direction-v4-choices";
export const ART_DIRECTION_OUTPUT_KEY = "mongkol-art-direction-v4-output";

export const persistedChoiceSchema = z.object({
  step: z.number().int().min(0).max(3),
  choices: z.object({
    chapter: lifeChapterSchema.optional(),
    collection: collectionDirectionSchema.optional(),
    mood: customerMoodSchema.optional(),
  }).strict(),
}).strict();

export type PersistedChoices = z.infer<typeof persistedChoiceSchema>;

export function parsePersistedChoices(raw: string | null): PersistedChoices | null {
  if (!raw) return null;
  try {
    const result = persistedChoiceSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function parseStoredArtDirection(raw: string | null) {
  if (!raw) return null;
  try {
    const result = storyInterpretationSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
