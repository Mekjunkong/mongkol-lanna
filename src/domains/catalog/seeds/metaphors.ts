import type { VisualMetaphor } from "../types";

const base = {
  version: "1.0.0",
  region: "THAI_LANNA" as const,
  status: "PUBLISHED" as const,
  active: true,
  interpretationLabel: "ARTISTIC_INTERPRETATION" as const,
};

export const METAPHOR_SEEDS: readonly VisualMetaphor[] = Object.freeze([
  {
    ...base,
    id: "opening-horizon",
    name: "Opening Horizon",
    fragment: "an opening horizon used as personal artistic symbolism for possibility",
    intentionWeights: { NEW_BEGINNING: 5, GROWTH: 2, COURAGE: 0, HARMONY: 0, GRATITUDE: 0, REMEMBRANCE: 0, BELONGING: 0, RESTORATION: 0 },
    journeyWeights: { BEGINNING: 5, CROSSING: 3, BECOMING: 0, STEADY: 0, REMEMBERING: 0, RETURNING: 0 },
  },
  {
    ...base,
    id: "patient-rhythm",
    name: "Patient Rhythm",
    fragment: "repeated natural forms used as personal artistic symbolism for patient growth",
    intentionWeights: { GROWTH: 5, COURAGE: 2, NEW_BEGINNING: 0, HARMONY: 0, GRATITUDE: 0, REMEMBRANCE: 0, BELONGING: 0, RESTORATION: 0 },
    journeyWeights: { BECOMING: 5, STEADY: 2, BEGINNING: 0, CROSSING: 0, REMEMBERING: 0, RETURNING: 0 },
  },
  {
    ...base,
    id: "held-space",
    name: "Held Space",
    fragment: "a calm enclosing field used as personal artistic symbolism for support",
    intentionWeights: { HARMONY: 5, BELONGING: 4, RESTORATION: 3, NEW_BEGINNING: 0, GROWTH: 0, COURAGE: 0, GRATITUDE: 0, REMEMBRANCE: 0 },
    journeyWeights: { RETURNING: 4, STEADY: 3, BEGINNING: 0, BECOMING: 0, CROSSING: 0, REMEMBERING: 0 },
  },
  {
    ...base,
    id: "long-view",
    name: "Long View",
    fragment: "layered distance used as personal artistic symbolism for perspective",
    intentionWeights: { COURAGE: 4, REMEMBRANCE: 3, NEW_BEGINNING: 0, GROWTH: 0, HARMONY: 0, GRATITUDE: 0, BELONGING: 0, RESTORATION: 0 },
    journeyWeights: { CROSSING: 4, REMEMBERING: 3, BEGINNING: 0, BECOMING: 0, STEADY: 0, RETURNING: 0 },
  },
  {
    ...base,
    id: "gathered-light",
    name: "Gathered Light",
    fragment: "small areas of light used as personal artistic symbolism for appreciation",
    intentionWeights: { GRATITUDE: 5, HARMONY: 2, NEW_BEGINNING: 0, GROWTH: 0, COURAGE: 0, REMEMBRANCE: 0, BELONGING: 0, RESTORATION: 0 },
    journeyWeights: { STEADY: 3, RETURNING: 2, BEGINNING: 0, BECOMING: 0, CROSSING: 0, REMEMBERING: 0 },
  },
  {
    ...base,
    id: "returning-current",
    name: "Returning Current",
    fragment: "a gentle current used as personal artistic symbolism for restoration",
    intentionWeights: { RESTORATION: 5, BELONGING: 3, NEW_BEGINNING: 0, GROWTH: 0, COURAGE: 0, HARMONY: 0, GRATITUDE: 0, REMEMBRANCE: 0 },
    journeyWeights: { RETURNING: 5, CROSSING: 2, BEGINNING: 0, BECOMING: 0, STEADY: 0, REMEMBERING: 0 },
  },
]);
