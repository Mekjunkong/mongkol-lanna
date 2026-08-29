import type { StoryInterpretation } from "../story/schema";

export type ArtworkTone = "new-dawn" | "guardian" | "sacred-river" | "quiet-mountain" | "golden-forest" | "journey";

export type ArtworkPresentation = Readonly<{
  id: string;
  title: string;
  chapter: string;
  collection: string;
  mood: string;
  tone: ArtworkTone;
  shortStory: string;
  story: string;
  artDirection: string;
  hero: string;
  support: readonly string[];
  palette: string;
  composition: string;
  archetype: string;
  symbolism: string;
  observation: string;
  createdDate: string;
  commissionNumber: string;
  edition: string;
}>;

const chapterLabels = {
  NEW_BEGINNING: "New Beginning",
  GROWTH_SUCCESS: "Growth & Success",
  HOME_FAMILY: "Home & Family",
  LOVE_CONNECTION: "Love & Connection",
  INNER_STRENGTH: "Inner Strength",
} as const;
const titles = {
  NEW_BEGINNING: "FIRST LIGHT",
  GROWTH_SUCCESS: "THE WIDER FIELD",
  HOME_FAMILY: "A PLACE HELD CLOSE",
  LOVE_CONNECTION: "TWO CURRENTS",
  INNER_STRENGTH: "THE STEADY RIDGE",
} as const;
const collectionPresentation = {
  MOUNTAIN_MIST: { label: "Mountain & Mist", tone: "quiet-mountain", observation: "The open upper field gives the mountain ridge room to remain calm and visually steady." },
  SACRED_RIVER: { label: "Sacred River", tone: "sacred-river", observation: "The river carries the eye through the composition toward wider, quieter space." },
  GOLDEN_LANNA: { label: "Golden Lanna", tone: "golden-forest", observation: "Gold is concentrated near the destination, creating increasing visual warmth." },
  NORTHERN_GARDEN: { label: "Northern Garden", tone: "guardian", observation: "Botanical forms gather around the center while leaving the upper field quiet." },
} as const satisfies Record<StoryInterpretation["collection"], { label: string; tone: ArtworkTone; observation: string }>;
const moodLabels = { CALM: "Quiet", WARM: "Warm", DETERMINED: "Majestic", TENDER: "Warm", HOPEFUL: "Warm", REFLECTIVE: "Quiet" } as const;

export function presentationFromDirection(direction: StoryInterpretation): ArtworkPresentation {
  const collection = collectionPresentation[direction.collection];
  const title = titles[direction.chapter];
  const intention = direction.centralIntention.toLowerCase().replaceAll("_", " ");
  return Object.freeze({
    id: "art-direction-demo",
    title,
    chapter: chapterLabels[direction.chapter],
    collection: collection.label,
    mood: moodLabels[direction.emotionalTone[0]],
    tone: collection.tone,
    shortStory: `A personal study composed around ${intention}.`,
    story: `This demonstration carries the chapter through ${direction.narrativeMovement}, without adding sacred, historical, or supernatural claims.`,
    artDirection: `A ${direction.suggestedHero} leads the composition, supported by ${direction.supportingElements.join(" and ")}.`,
    hero: direction.suggestedHero,
    support: direction.supportingElements,
    palette: direction.palette,
    composition: direction.composition,
    archetype: direction.visualMetaphor.replaceAll("-", " "),
    symbolism: `Personal symbolism for ${intention}`,
    observation: collection.observation,
    createdDate: "29 August 2026",
    commissionNumber: "ML-DEMO-DIRECTION",
    edition: "Deterministic demonstration study",
  });
}
