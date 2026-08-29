import { z } from "zod";

export const qualityDatasetRecordSchema = z.object({
  blueprintVersion: z.string().min(1),
  promptVersion: z.string().min(1),
  provider: z.literal("mock"),
  model: z.literal("deterministic-study"),
  qaScore: z.number().int().min(0).max(100),
  adminRating: z.enum(["EXCELLENT", "GOOD", "ACCEPTABLE", "REJECT"]).nullable(),
  failureTags: z.array(z.string()),
  simulated: z.literal(true),
}).readonly();

export type QualityDatasetRecord = z.infer<typeof qualityDatasetRecordSchema>;
