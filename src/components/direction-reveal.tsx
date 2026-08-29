"use client";

import { useMemo, useSyncExternalStore } from "react";
import { RevealExperience } from "./reveal";
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

export function DirectionReveal() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const direction = useMemo(() => parseStoredArtDirection(snapshot) ?? fallbackDirection, [snapshot]);
  const art = useMemo(() => presentationFromDirection(direction), [direction]);
  return <RevealExperience art={art} />;
}
