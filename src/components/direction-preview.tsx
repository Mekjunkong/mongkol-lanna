"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { PhonePreview } from "./phone-preview";
import { ART_DIRECTION_OUTPUT_KEY, parseStoredArtDirection } from "@/domains/story/client-storage";
import { interpretStory } from "@/domains/story/interpreter";
import { presentationFromDirection } from "@/domains/artwork/presentation";

const fallbackDirection = interpretStory({ chapter: "NEW_BEGINNING", story: "", collection: "MOUNTAIN_MIST", mood: "QUIET" });
const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};
const getSnapshot = () => localStorage.getItem(ART_DIRECTION_OUTPUT_KEY);
const getServerSnapshot = () => null;

export function DirectionPreview({ requestId }: { requestId: string }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const direction = useMemo(() => parseStoredArtDirection(snapshot) ?? fallbackDirection, [snapshot]);
  const art = useMemo(() => presentationFromDirection(direction), [direction]);

  return <main className="preview">
    <header><p className="eyebrow">PHONE STUDY · MOCK ONLY</p><h1>See {art.title.toLowerCase()}<br />where it will live.</h1><p className="lead">Compare your {art.collection} Art Direction with realistic lock-screen and home-screen interface areas. This is a deterministic demonstration asset, not generated customer artwork.</p></header>
    <PhonePreview tone={art.tone} title={art.title} />
    <section className="mock-order"><div><p className="eyebrow">NO PAYMENT · NO PROVIDER CALL</p><h2>Continue through your demonstration reveal</h2><p>The next screen preserves this Art Direction and shows the museum-style story and Art Passport. It does not create an order, charge a card, or contact a paid image provider. Request: {requestId}.</p></div><Link className="button" href="/artwork/art-direction-demo">Open My Demonstration Reveal →</Link></section>
  </main>;
}
