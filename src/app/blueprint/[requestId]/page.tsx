import { ArtDirectionBlueprint } from "@/components/art-direction-blueprint";
import { SiteHeader } from "@/components/site-shell";

export default async function BlueprintPage({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;
  return <><SiteHeader /><ArtDirectionBlueprint requestId={requestId} /></>;
}
