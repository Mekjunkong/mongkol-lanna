"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { ArtworkPresentation } from "@/domains/artwork/presentation";
import { ArtworkComposition } from "./artwork-composition";
import { ArtPassport } from "./art-passport";

export function RevealExperience({ art }: { art: ArtworkPresentation }) {
  const [exploring, setExploring] = useState(false);
  const storyRef = useRef<HTMLElement>(null);
  const explore = () => {
    setExploring(true);
    requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      storyRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      storyRef.current?.focus({ preventScroll: true });
    });
  };

  return <main className="reveal reveal--museum">
    <section className="reveal-artwork-first" aria-label={`${art.title} artwork reveal`}>
      <ArtworkComposition tone={art.tone} title={`${art.title}, demonstration artwork`} />
      <div className="reveal-title"><p>DEMONSTRATION ARTWORK · {art.commissionNumber}</p><h1>{art.title}</h1><span>{art.chapter} · {art.collection}</span></div>
      <button className="button button--light" onClick={explore}>Explore the Story ↓</button>
    </section>

    <section className={`museum-story ${exploring ? "museum-story--open" : ""}`} ref={storyRef} aria-hidden={!exploring} tabIndex={-1}>
      <header><p className="eyebrow">EXPLORE THE STORY</p><h2>A small museum<br />for one personal chapter.</h2><p>{art.story}</p></header>
      <div className="museum-observations">
        <article><span>01</span><h3>Visual narrative</h3><p>{art.artDirection}</p></article>
        <article><span>02</span><h3>What leads the eye</h3><p><strong>{art.hero}</strong> is the hero. {art.support.join(", ")} remain supporting elements.</p></article>
        <article><span>03</span><h3>Compositional observation</h3><p>{art.observation}</p></article>
        <article><span>04</span><h3>Interpretation boundary</h3><p><b>Cultural Reference:</b> observed northern landscape and botanical forms. <b>Artistic Interpretation:</b> {art.archetype.toLowerCase()}. <b>Personal Symbolism:</b> {art.symbolism.toLowerCase()}.</p></article>
      </div>
      <div className="visual-elements"><p className="eyebrow">VISUAL ELEMENTS</p><ul><li><span>Hero</span>{art.hero}</li>{art.support.map((item) => <li key={item}><span>Support</span>{item}</li>)}<li><span>Palette</span>{art.palette}</li><li><span>Composition</span>{art.composition}</li></ul></div>
      <ArtPassport art={art} />
      <footer className="reveal-actions"><Link className="button" href="/account/artworks">View My Collection</Link><Link className="button button--quiet" href="/preview/art-direction-demo">Phone Preview</Link></footer>
    </section>
  </main>;
}
