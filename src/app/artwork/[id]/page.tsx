import { notFound } from "next/navigation";
import { RevealExperience } from "@/components/reveal";
import { DirectionReveal } from "@/components/direction-reveal";
import { artworks } from "@/content/mock-data";

export default async function Artwork({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === "art-direction-demo") return <DirectionReveal />;
  const art = artworks.find((item) => item.id === id);
  if (!art) notFound();
  return <RevealExperience art={art} />;
}
