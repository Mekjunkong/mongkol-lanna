import { z } from "zod";
import {
  archetypeSchema, artWorldSchema, catalogSnapshotSchema, compositionSchema, confidenceSchema,
  detailLevelSchema, formatSchema, intentionSchema, journeyStateSchema, lifeThemeSchema, metaphorSchema,
  moodSchema, paletteSchema, reviewStatusSchema, safeZoneTypeSchema, spiritualLevelSchema, symbolSchema,
  toneSchema, traditionLevelSchema,
} from "./schemas";

export type Intention = z.infer<typeof intentionSchema>;
export type Mood = z.infer<typeof moodSchema>;
export type DetailLevel = z.infer<typeof detailLevelSchema>;
export type TraditionLevel = z.infer<typeof traditionLevelSchema>;
export type SpiritualLevel = z.infer<typeof spiritualLevelSchema>;
export type CulturalConfidence = z.infer<typeof confidenceSchema>;
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;
export type OutputFormat = z.infer<typeof formatSchema>;
export type SafeZoneType = z.infer<typeof safeZoneTypeSchema>;
export type JourneyState = z.infer<typeof journeyStateSchema>;
export type LifeTheme = z.infer<typeof lifeThemeSchema>;
export type ApprovedTone = z.infer<typeof toneSchema>;
export type ArtWorld = z.infer<typeof artWorldSchema>;
export type Archetype = z.infer<typeof archetypeSchema>;
export type SymbolRecord = z.infer<typeof symbolSchema>;
export type Palette = z.infer<typeof paletteSchema>;
export type Composition = z.infer<typeof compositionSchema>;
export type VisualMetaphor = z.infer<typeof metaphorSchema>;
export type CatalogSnapshot = z.infer<typeof catalogSnapshotSchema>;
