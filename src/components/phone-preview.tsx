"use client";

import { useState } from "react";
import type { ArtworkTone } from "@/domains/artwork/presentation";
import { ArtworkComposition } from "./artwork-composition";

type PreviewMode = "ARTWORK" | "LOCK SCREEN" | "HOME SCREEN";
const modes: readonly PreviewMode[] = ["ARTWORK", "LOCK SCREEN", "HOME SCREEN"];

export function PhonePreview({ tone = "new-dawn", title = "Art Direction demonstration" }: { tone?: ArtworkTone; title?: string }) {
  const [mode, setMode] = useState<PreviewMode>("LOCK SCREEN");
  return <section className="phone-preview" aria-label="Artwork phone preview">
    <div className="preview-toggle" role="group" aria-label="Preview mode">{modes.map((item) => <button key={item} className={mode === item ? "is-active" : ""} onClick={() => setMode(item)} aria-pressed={mode === item}>{item}</button>)}</div>
    {mode === "ARTWORK" ? <div className="artwork-only-preview"><ArtworkComposition tone={tone} title={`${title}, artwork-only demonstration preview`} /></div> : <div className={`phone-frame ${mode === "HOME SCREEN" ? "phone-frame--home" : "phone-frame--lock"}`}>
      <div className="phone-screen">
        <ArtworkComposition tone={tone} title={`${title}, ${mode} demonstration preview`} />
        <div className="dynamic-island" aria-label="Dynamic Island safe area" />
        {mode === "LOCK SCREEN" ? <div className="lock-interface"><p>Saturday, 29 August</p><strong>09:41</strong><span>Focal artwork remains below this clock area</span><div className="lock-shortcuts"><i /><i /></div></div> : <div className="home-interface"><p>09:41</p><div className="icon-grid" aria-label="Home screen icon area">{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</div><div className="phone-dock"><i /><i /><i /><i /></div><span>Hero stays clear of icons and dock</span></div>}
      </div>
    </div>}
    <p className="phone-preview__note">The composition reserves the top interface zone and keeps the primary focal element clear of the clock, Dynamic Island, icons, and dock.</p>
  </section>;
}
