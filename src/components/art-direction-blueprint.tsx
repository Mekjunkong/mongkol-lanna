"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArtworkComposition } from "@/components/artwork-composition";
import { collections } from "@/content/mock-data";
import { ART_DIRECTION_OUTPUT_KEY, parseStoredArtDirection } from "@/domains/story/client-storage";
import { interpretStory } from "@/domains/story/interpreter";
import type { StoryInterpretation } from "@/domains/story/schema";

const chapterLabels = {
  NEW_BEGINNING: "New Beginning",
  GROWTH_SUCCESS: "Growth & Success",
  HOME_FAMILY: "Home & Family",
  LOVE_CONNECTION: "Love & Connection",
  INNER_STRENGTH: "Inner Strength",
} as const;

const collectionLabels = {
  MOUNTAIN_MIST: "Mountain & Mist",
  SACRED_RIVER: "Sacred River",
  GOLDEN_LANNA: "Golden Lanna",
  NORTHERN_GARDEN: "Northern Garden",
} as const;

const moodLabels = { QUIET: "Quiet", WARM: "Warm", MAJESTIC: "Majestic" } as const;
const interpretedMoodLabels = { CALM: "Quiet", WARM: "Warm", DETERMINED: "Majestic" } as const;
const titleByChapter = {
  NEW_BEGINNING: "FIRST LIGHT",
  GROWTH_SUCCESS: "THE WIDER FIELD",
  HOME_FAMILY: "A PLACE HELD CLOSE",
  LOVE_CONNECTION: "TWO CURRENTS",
  INNER_STRENGTH: "THE STEADY RIDGE",
} as const;

const fallbackInput = { chapter: "NEW_BEGINNING", story: "", collection: "MOUNTAIN_MIST", mood: "QUIET" } as const;

const fallbackDirection: StoryInterpretation = interpretStory(fallbackInput);

const subscribeToDraft = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};
const getDraftSnapshot = () => localStorage.getItem(ART_DIRECTION_OUTPUT_KEY);
const getServerDraftSnapshot = () => null;
const subscribeToHydration = () => () => undefined;
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

export function ArtDirectionBlueprint({ requestId }: { requestId: string }) {
  const draftSnapshot = useSyncExternalStore(subscribeToDraft, getDraftSnapshot, getServerDraftSnapshot);
  const hydrated = useSyncExternalStore(subscribeToHydration, getHydratedSnapshot, getServerHydratedSnapshot);
  const direction = useMemo(() => {
    return parseStoredArtDirection(draftSnapshot) ?? fallbackDirection;
  }, [draftSnapshot]);
  const restored = hydrated && draftSnapshot !== null;
  const restorationMessage = !hydrated
    ? "Checking for choices saved on this device."
    : restored
      ? "This Blueprint reflects the four choices saved on this device."
      : "No saved choices were found, so this page shows the default demonstration direction.";

  const collection = collections.find((item) => item.id === direction.collection) ?? collections[0];
  const title = titleByChapter[direction.chapter];
  const chapter = chapterLabels[direction.chapter];
  const collectionName = collectionLabels[direction.collection];
  const interpretedMood = direction.emotionalTone[0];
  const mood = interpretedMoodLabels[interpretedMood as keyof typeof interpretedMoodLabels] ?? moodLabels.QUIET;

  return <main className="blueprint">
    <header className="blueprint__header"><div><p className="eyebrow">FREE ART DIRECTION · DEMONSTRATION</p><h1>{title}<br /><span>Your Art Direction</span></h1></div><p>{restorationMessage} It is free to review and creates no artwork, order, payment, or provider request.</p></header>
    <div className="blueprint__spread">
      <div className="blueprint-study"><ArtworkComposition tone={collection.tone} title={`${title} large demonstration artwork study`} safeZone /><p>Large artwork study · focal content remains below the clock-safe area</p></div>
      <section className="blueprint__details">
        <section><span>01 / TITLE & LIFE CHAPTER</span><h2>{title}</h2><dl className="direction-pairs"><div><dt>Life Chapter</dt><dd>{chapter}</dd></div><div><dt>Collection</dt><dd>{collectionName}</dd></div><div><dt>Mood</dt><dd>{mood}</dd></div></dl></section>
        <section><span>02 / VISUAL NARRATIVE</span><h2>{direction.narrativeMovement}</h2><p>The composition centers on {direction.suggestedHero}, then moves through {direction.supportingElements.join(" and ")} toward an open destination.</p></section>
        <section><span>03 / HERO & SUPPORT</span><h2>What leads the eye</h2><ol><li><i>Hero</i><strong>{direction.suggestedHero}</strong><small>Primary focal element</small></li>{direction.supportingElements.map((item) => <li key={item}><i>Support</i><strong>{item}</strong><small>Secondary visual element</small></li>)}</ol></section>
        <section><span>04 / PALETTE & COMPOSITION</span><h2>{direction.palette}</h2><div className="palette"><i style={{ background: "#efe3c5" }} /><i style={{ background: "#6d8781" }} /><i style={{ background: "#274d43" }} /><i style={{ background: "#a98745" }} /><i style={{ background: "#9d4638" }} /></div><p>{direction.composition}. The upper field remains calm for phone interface elements.</p></section>
        <section><span>05 / LANNA DIRECTION</span><h2>Contemporary Northern Thai restraint</h2><p>Layered atmosphere, observed botanical forms, matte color, and quiet mural depth. This is Lanna-inspired art direction, not a claim of historical authenticity.</p></section>
        <section><span>06 / INTERPRETATION BOUNDARIES</span><div className="cultural-labels cultural-labels--ink"><strong>Cultural Reference</strong><strong>Artistic Interpretation</strong><strong>Personal Symbolism</strong></div><p><b>Cultural Reference:</b> observed northern landscape and botanical forms. <b>Artistic Interpretation:</b> {direction.visualMetaphor.toLowerCase()} and {direction.narrativeMovement.toLowerCase()}. <b>Personal Symbolism:</b> {direction.centralIntention.toLowerCase().replaceAll("_", " ")}. No religious claim, automatic Buddha imagery, astrology, sacred text, fake script, yantra, logo, signature, or watermark.</p></section>
        <aside className="confidence"><strong>Deterministic demonstration boundary</strong><p>Interpreter {direction.interpretationVersion}. Request {requestId}. Personal story, name, and dates stay outside the compiled image prompt.</p></aside>
      </section>
    </div>
    <footer className="blueprint-actions"><Link href="/create" className="button button--quiet">← Edit My Direction</Link><div className="mock-cta"><Link href="/preview/art-direction-demo" className="button">Create My Artwork →</Link><small>Your Art Direction continues to the mock preview · no charge · no paid generation</small></div></footer>
  </main>;
}
