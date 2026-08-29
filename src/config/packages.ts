import { z } from "zod";

export const packageConfigSchema = z.object({
  id: z.enum(["essential", "signature", "collector"]),
  name: z.enum(["Essential", "Signature", "Collector"]),
  range: z.object({ min: z.number().int().nonnegative(), max: z.number().int().positive(), currency: z.literal("THB") }),
  deliverables: z.array(z.string().min(3)).min(1),
  artDirectionAdjustments: z.number().int().min(0).max(1),
  active: z.boolean(),
  version: z.literal("packages-p0.1"),
}).superRefine((record, context) => {
  if (record.range.min >= record.range.max) context.addIssue({ code: "custom", message: "Test range minimum must be lower than maximum" });
  if (record.id !== "essential" && record.artDirectionAdjustments !== 1) context.addIssue({ code: "custom", message: "Signature and Collector include exactly one Art Direction Adjustment" });
});

export type PackageConfig = z.infer<typeof packageConfigSchema>;

export const PACKAGE_CONFIG: readonly PackageConfig[] = Object.freeze([
  packageConfigSchema.parse({ id: "essential", name: "Essential", range: { min: 390, max: 590, currency: "THB" }, deliverables: ["Personal Art Direction", "Personalized artwork", "Lock screen", "Home screen"], artDirectionAdjustments: 0, active: true, version: "packages-p0.1" }),
  packageConfigSchema.parse({ id: "signature", name: "Signature", range: { min: 790, max: 1190, currency: "THB" }, deliverables: ["Everything in Essential", "Artwork Story", "Art Passport", "High-resolution digital artwork", "One Art Direction Adjustment"], artDirectionAdjustments: 1, active: true, version: "packages-p0.1" }),
  packageConfigSchema.parse({ id: "collector", name: "Collector", range: { min: 1490, max: 2490, currency: "THB" }, deliverables: ["Everything in Signature, including its one adjustment", "Print-ready master", "Multiple aspect ratios", "Collector presentation", "Priority quality review"], artDirectionAdjustments: 1, active: true, version: "packages-p0.1" }),
]);

export const formatTestRange = ({ min, max }: PackageConfig["range"]) => `฿${min.toLocaleString("en-US")}–${max.toLocaleString("en-US")}`;
