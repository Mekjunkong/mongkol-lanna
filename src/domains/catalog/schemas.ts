import { z } from "zod";

export const intentionSchema = z.enum([
  "NEW_BEGINNING", "GROWTH", "COURAGE", "HARMONY", "GRATITUDE", "REMEMBRANCE", "BELONGING", "RESTORATION",
]);
export const moodSchema = z.enum(["SERENE", "HOPEFUL", "GROUNDED", "LUMINOUS", "CONTEMPLATIVE", "JOYFUL"]);
export const detailLevelSchema = z.enum(["SERENE", "BALANCED", "GRAND"]);
export const traditionLevelSchema = z.enum(["HERITAGE", "BALANCED", "CONTEMPORARY"]);
export const spiritualLevelSchema = z.enum(["CULTURAL", "SYMBOLIC", "SACRED"]);
export const confidenceSchema = z.enum(["VERIFIED", "INSPIRED", "DECORATIVE"]);
export const reviewStatusSchema = z.enum(["DRAFT", "REVIEW_REQUIRED", "PUBLISHED", "ARCHIVED"]);
export const regionSchema = z.literal("THAI_LANNA");
export const formatSchema = z.enum(["PORTRAIT", "LANDSCAPE", "SQUARE"]);
export const safeZoneTypeSchema = z.enum(["NONE", "LOCK_SCREEN", "HOME_SCREEN"]);
export const journeyStateSchema = z.enum(["BEGINNING", "BECOMING", "STEADY", "CROSSING", "REMEMBERING", "RETURNING"]);
export const lifeThemeSchema = z.enum(["CHANGE", "RESILIENCE", "CONNECTION", "HOME", "APPRECIATION", "REFLECTION", "REST"]);
export const toneSchema = z.enum(["CALM", "TENDER", "HOPEFUL", "DETERMINED", "REFLECTIVE", "WARM"]);

const idSchema = z.string().regex(/^[a-z][a-z0-9-]{2,63}$/);
const weightMapSchema = z.record(z.string(), z.number().min(-10).max(10));
const promptFragmentSchema = z.string().min(3).max(240).refine(
  (value) => !/(?:\b(?:text|letters?|words?|script|mantra|yantra|inscription|logo|watermark|signature|glyphs?)\b|calligraph)/i.test(value),
  "Prompt fragments must not request text or script",
);

export const culturalReviewSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  reviewerId: z.string().min(1).optional(),
  evidenceNote: z.string().min(20).optional(),
  permittedContext: z.string().min(10).optional(),
  reviewedAt: z.string().datetime().optional(),
}).superRefine((review, context) => {
  if (review.status === "APPROVED" && (!review.reviewerId || !review.evidenceNote || !review.permittedContext || !review.reviewedAt)) {
    context.addIssue({ code: "custom", message: "Approved cultural review requires reviewer, evidence, context and date" });
  }
});

const baseRecordSchema = z.object({
  id: idSchema,
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  region: regionSchema,
  status: reviewStatusSchema,
  active: z.boolean(),
});

export const artWorldSchema = baseRecordSchema.extend({
  name: z.string().min(2),
  visualDna: z.array(promptFragmentSchema).min(2).max(6),
  environmentFragments: z.array(promptFragmentSchema).min(1).max(5),
  compatibleSymbolIds: z.array(idSchema).min(1),
  paletteIds: z.array(idSchema).min(1),
  compositionIds: z.array(idSchema).min(1),
  negativeConstraints: z.array(z.string().min(2)).min(1),
});

export const archetypeSchema = baseRecordSchema.extend({
  name: z.string().min(2),
  intentionWeights: weightMapSchema,
  worldWeights: weightMapSchema,
  heroPlacement: z.enum(["CENTER", "LOWER_THIRD", "UPPER_THIRD", "LEFT_THIRD", "RIGHT_THIRD"]),
  density: detailLevelSchema,
  hierarchyGrammar: promptFragmentSchema,
  negativeSpacePreference: z.enum(["TOP", "BOTTOM", "LEFT", "RIGHT", "CENTER", "PERIMETER"]),
});

export const symbolSchema = baseRecordSchema.extend({
  name: z.string().min(2),
  category: z.enum(["LANDSCAPE", "BOTANICAL", "MATERIAL", "OBJECT", "ANIMAL", "MYTHOLOGICAL", "ARCHITECTURE", "ORNAMENT"]),
  visualDescription: z.string().min(10).max(300),
  culturalNote: z.string().min(10).max(400).nullable(),
  artisticInterpretation: z.string().min(10).max(400),
  promptFragment: promptFragmentSchema,
  confidence: confidenceSchema,
  compatibleWorldIds: z.array(idSchema).min(1),
  conflictsWith: z.array(idSchema),
  spiritualMin: spiritualLevelSchema,
  spiritualMax: spiritualLevelSchema,
  allowedAsHero: z.boolean(),
  culturalReview: culturalReviewSchema.optional(),
}).superRefine((symbol, context) => {
  const rank = { CULTURAL: 0, SYMBOLIC: 1, SACRED: 2 } as const;
  if (rank[symbol.spiritualMin] > rank[symbol.spiritualMax]) context.addIssue({ code: "custom", message: "Invalid spiritual range" });
  if (symbol.confidence === "VERIFIED" && symbol.culturalReview?.status !== "APPROVED") context.addIssue({ code: "custom", message: "VERIFIED requires approved human review" });
  if ((symbol.category === "MYTHOLOGICAL" || symbol.spiritualMax === "SACRED") && symbol.status === "PUBLISHED") context.addIssue({ code: "custom", message: "Mythological and sacred-adjacent records cannot be published for P0" });
  if (symbol.spiritualMin === "SACRED" && symbol.active) context.addIssue({ code: "custom", message: "SACRED records must fail closed" });
});

export const paletteSchema = baseRecordSchema.extend({
  name: z.string().min(2),
  colors: z.object({ field: z.string(), hero: z.string(), support: z.string(), accent: z.string(), atmosphere: z.string() }),
  pigmentLanguage: promptFragmentSchema,
  moodWeights: weightMapSchema,
  worldWeights: weightMapSchema,
  prohibitedPairings: z.array(z.string()),
});

export const compositionSchema = baseRecordSchema.extend({
  name: z.string().min(2),
  grammar: promptFragmentSchema,
  heroPlacements: z.array(z.enum(["CENTER", "LOWER_THIRD", "UPPER_THIRD", "LEFT_THIRD", "RIGHT_THIRD"])).min(1),
  safeZoneTypes: z.array(safeZoneTypeSchema).min(1),
  formats: z.array(formatSchema).min(1),
  negativeSpace: z.enum(["TOP", "BOTTOM", "LEFT", "RIGHT", "CENTER", "PERIMETER"]),
  archetypeIds: z.array(idSchema),
});

export const metaphorSchema = baseRecordSchema.extend({
  name: z.string().min(2),
  interpretationLabel: z.literal("ARTISTIC_INTERPRETATION"),
  fragment: promptFragmentSchema,
  intentionWeights: weightMapSchema,
  journeyWeights: weightMapSchema,
});

export const catalogSnapshotSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  worlds: z.array(artWorldSchema).min(1),
  archetypes: z.array(archetypeSchema).min(1),
  symbols: z.array(symbolSchema).min(1),
  palettes: z.array(paletteSchema).min(1),
  compositions: z.array(compositionSchema).min(1),
  metaphors: z.array(metaphorSchema).min(1),
});
