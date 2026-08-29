import { storyInputSchema, storyInterpretationSchema, STORY_INTERPRETATION_VERSION, type StoryInterpretation } from "./schema";
import { INTENTION_DEFAULTS, JOURNEY_RULES, LIFE_THEME_RULES, TONE_RULES, safetyFlags } from "./rules";

const chapterToIntention = { NEW_BEGINNING: "NEW_BEGINNING", GROWTH_SUCCESS: "GROWTH", HOME_FAMILY: "BELONGING", LOVE_CONNECTION: "HARMONY", INNER_STRENGTH: "COURAGE" } as const;
const intentionToChapter = { NEW_BEGINNING: "NEW_BEGINNING", GROWTH: "GROWTH_SUCCESS", COURAGE: "INNER_STRENGTH", HARMONY: "LOVE_CONNECTION", GRATITUDE: "LOVE_CONNECTION", REMEMBRANCE: "HOME_FAMILY", BELONGING: "HOME_FAMILY", RESTORATION: "INNER_STRENGTH" } as const;
const collectionDirections = {
  MOUNTAIN_MIST: { hero: "layered mountain ridge", support: ["quiet mist", "observed teak leaves"], palette: "mist jade, charcoal, and aged paper", composition: "low horizon with an open upper field" },
  SACRED_RIVER: { hero: "winding river", support: ["river stones", "distant northern hills"], palette: "river blue, deep jade, and warm ivory", composition: "a gentle current leading toward open space" },
  GOLDEN_LANNA: { hero: "sunlit botanical canopy", support: ["rice stems", "restrained antique-gold light"], palette: "rice gold, muted vermillion, and charcoal", composition: "light gathered near the destination with a grounded foreground" },
  NORTHERN_GARDEN: { hero: "garden tree", support: ["jasmine sprigs", "broad leaves"], palette: "botanical ivory, leaf jade, and earthen vermillion", composition: "a balanced garden orbit with calm breathing room" },
} as const;
const movementLabels = { BEGINNING: "opening toward a new field", BECOMING: "growing upward in measured stages", STEADY: "gathering around a stable center", CROSSING: "moving through layers toward open space", REMEMBERING: "returning through layered distance", RETURNING: "flowing back toward a familiar center" } as const;
const customerMoodTones = { QUIET: "CALM", WARM: "WARM", MAJESTIC: "DETERMINED" } as const;

function firstMatch<T extends string>(value:string,rules:readonly {value:T;patterns:readonly RegExp[]}[]):T|undefined {
  return rules.find((rule)=>rule.patterns.some((pattern)=>pattern.test(value)))?.value;
}
function matches<T extends string>(value:string,rules:readonly {value:T;patterns:readonly RegExp[]}[]):T[]{
  return rules.filter((rule)=>rule.patterns.some((pattern)=>pattern.test(value))).map((rule)=>rule.value);
}

export function interpretStory(input: unknown): StoryInterpretation {
  const parsed = storyInputSchema.parse(input);
  const normalized = parsed.story.normalize("NFKC").toLocaleLowerCase("en-US");
  const intention = parsed.intention ?? chapterToIntention[parsed.chapter!];
  const chapter = parsed.chapter ?? intentionToChapter[intention];
  const defaults = INTENTION_DEFAULTS[intention];
  const lifeTheme = firstMatch(normalized, LIFE_THEME_RULES);
  const journey = firstMatch(normalized, JOURNEY_RULES);
  const detectedTones = matches(normalized, TONE_RULES).slice(0, 2);
  const emotionalTone = parsed.chapter ? [customerMoodTones[parsed.mood]] : detectedTones.length ? detectedTones : [defaults.tone];
  const flags = safetyFlags(normalized);

  const interpretation = storyInterpretationSchema.parse({
    lifeTheme: lifeTheme ?? defaults.lifeTheme,
    emotionalTone,
    intention,
    journeyState: journey ?? defaults.journey,
    visualMetaphorIds: defaults.metaphors.slice(0, 2),
    safetyFlags: flags,
    needsConfirmation: Boolean(parsed.story) && (!lifeTheme || !journey || flags.length > 0),
    chapter,
    centralIntention: intention,
    visualMetaphor: defaults.metaphors[0],
    narrativeMovement: movementLabels[journey ?? defaults.journey],
    suggestedHero: collectionDirections[parsed.collection].hero,
    supportingElements: collectionDirections[parsed.collection].support,
    collection: parsed.collection,
    palette: collectionDirections[parsed.collection].palette,
    composition: collectionDirections[parsed.collection].composition,
    interpretationVersion: STORY_INTERPRETATION_VERSION,
  });

  return interpretation;
}
