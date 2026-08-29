import type { Palette } from "../types";

const base = { version: "1.0.0", region: "THAI_LANNA" as const, status: "PUBLISHED" as const, active: true };

const colors = (field: string, hero: string, support: string, accent: string, atmosphere: string) => ({
  field,
  hero,
  support,
  accent,
  atmosphere,
});

// All mood keys from moodSchema: SERENE, HOPEFUL, GROUNDED, LUMINOUS, CONTEMPLATIVE, JOYFUL
// All world keys from art worlds that will be seeded

export const PALETTE_SEEDS: readonly Palette[] = Object.freeze([
  {
    ...base,
    id: "mist-jade",
    name: "Mist Jade",
    colors: colors("ivory", "deep jade", "muted leaf green", "antique gold", "mist blue"),
    pigmentLanguage: "matte mineral color, translucent washes, restrained antique-gold accent",
    moodWeights: { SERENE: 3, GROUNDED: 2, HOPEFUL: 0, LUMINOUS: 0, CONTEMPLATIVE: 0, JOYFUL: 0 },
    worldWeights: {},
    prohibitedPairings: ["neon"],
  },
  {
    ...base,
    id: "earthen-vermillion",
    name: "Earthen Vermillion",
    colors: colors("warm parchment", "charcoal", "clay brown", "restrained vermillion", "smoke grey"),
    pigmentLanguage: "warm earthen pigments with dry-brush depth and sparing vermillion",
    moodWeights: { GROUNDED: 3, HOPEFUL: 0, SERENE: 0, LUMINOUS: 0, CONTEMPLATIVE: 0, JOYFUL: 0 },
    worldWeights: {},
    prohibitedPairings: ["neon", "electric blue"],
  },
  {
    ...base,
    id: "rice-gold",
    name: "Rice Gold",
    colors: colors("pale straw", "dark jade", "rice green", "antique gold", "warm haze"),
    pigmentLanguage: "soft straw and leaf pigments with a narrow aged-gold highlight",
    moodWeights: { HOPEFUL: 3, JOYFUL: 2, SERENE: 0, GROUNDED: 0, LUMINOUS: 0, CONTEMPLATIVE: 0 },
    worldWeights: {},
    prohibitedPairings: ["glitter gold"],
  },
  {
    ...base,
    id: "forest-rain",
    name: "Forest Rain",
    colors: colors("moss", "deep green", "bark brown", "pale mineral blue", "rain grey"),
    pigmentLanguage: "layered forest pigments softened by translucent rain atmosphere",
    moodWeights: { CONTEMPLATIVE: 3, SERENE: 2, HOPEFUL: 0, GROUNDED: 0, LUMINOUS: 0, JOYFUL: 0 },
    worldWeights: {},
    prohibitedPairings: ["neon green"],
  },
  {
    ...base,
    id: "dawn-lacquer",
    name: "Dawn Lacquer",
    colors: colors("muted peach", "charcoal", "smoky rose", "antique gold", "pale dawn blue"),
    pigmentLanguage: "muted dawn washes against deep matte linework with minimal gold",
    moodWeights: { LUMINOUS: 4, HOPEFUL: 2, SERENE: 0, GROUNDED: 0, CONTEMPLATIVE: 0, JOYFUL: 0 },
    worldWeights: {},
    prohibitedPairings: ["chrome"],
  },
  {
    ...base,
    id: "botanical-ivory",
    name: "Botanical Ivory",
    colors: colors("ivory", "teak green", "sage", "clay red", "soft cream"),
    pigmentLanguage: "botanical color on quiet ivory with hand-painted tonal variation",
    moodWeights: { SERENE: 2, JOYFUL: 2, HOPEFUL: 0, GROUNDED: 0, LUMINOUS: 0, CONTEMPLATIVE: 0 },
    worldWeights: {},
    prohibitedPairings: ["fluorescent"],
  },
  {
    ...base,
    id: "indigo-timber",
    name: "Indigo Timber",
    colors: colors("parchment", "deep indigo", "timber brown", "muted gold", "blue-grey"),
    pigmentLanguage: "deep plant-like indigo impression and timber tones, used without provenance claims",
    moodWeights: { CONTEMPLATIVE: 3, SERENE: 0, HOPEFUL: 0, GROUNDED: 0, LUMINOUS: 0, JOYFUL: 0 },
    worldWeights: {},
    prohibitedPairings: ["ultraviolet"],
  },
]);
