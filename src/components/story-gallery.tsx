"use client";

import { useState } from "react";
import Link from "next/link";
import { ArtworkComposition } from "./artwork-composition";
import { artworks, galleryFilters, type GalleryFilter } from "@/content/mock-data";

export function StoryGallery() {
  const [filter, setFilter] = useState<GalleryFilter>("New Beginning");
  const visible = artworks.filter((art) => art.filter === filter);
  return <section className="story-gallery">
    <div className="gallery-filters" role="group" aria-label="Filter Personal Commissions">{galleryFilters.map((item) => <button key={item} className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <p className="gallery-disclosure">All works shown are clearly labeled demonstration studies. They are not real customer commissions or testimonials.</p>
    <div className="gallery-results" aria-live="polite">{visible.map((art) => <Link href={`/artwork/${art.id}`} className="story-card" key={art.id}><ArtworkComposition tone={art.tone} compact title={art.title} /><div><small>DEMONSTRATION · PERSONAL COMMISSION STUDY</small><h2>{art.title}</h2><p><b>Life Chapter</b> {art.chapter}</p><p>{art.shortStory}</p><span>Open artwork, story, Art Direction, and visual elements →</span></div></Link>)}</div>
  </section>;
}
