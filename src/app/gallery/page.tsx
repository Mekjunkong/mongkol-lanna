import type { Metadata } from "next";
import { StoryGallery } from "@/components/story-gallery";
import { PageIntro, PageShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "Story Gallery", description: "Demonstration Personal Lanna Story Art studies across life chapters, family, love, growth, inner strength, and Chiang Mai memories." };

export default function Gallery() { return <PageShell><PageIntro eyebrow="PERSONAL COMMISSIONS · DEMONSTRATIONS" title="Story Gallery" body="Begin with a life chapter, then open each artwork to explore its short story, Art Direction, and visual elements. These studies are demonstrations, not real customer commissions." /><StoryGallery /></PageShell>; }
