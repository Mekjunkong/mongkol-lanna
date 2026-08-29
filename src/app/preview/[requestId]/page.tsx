import { DirectionPreview } from "@/components/direction-preview";
import { SiteHeader } from "@/components/site-shell";

export default async function Preview({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;
  return <><SiteHeader /><DirectionPreview requestId={requestId} /></>;
}
