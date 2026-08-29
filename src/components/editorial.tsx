import Link from "next/link";
import { ArtworkComposition } from "./artwork-composition";
import { artworks } from "@/content/mock-data";

export function ArtworkGrid({ limit = artworks.length }: { limit?: number }) { return <div className="art-grid">{artworks.slice(0, limit).map((art, i) => <Link href={`/artwork/${art.id}`} className={`art-tile art-tile--${(i % 3) + 1}`} key={art.id}><ArtworkComposition tone={art.tone} compact title={art.title}/><div><small>{String(i + 1).padStart(2, "0")} / {art.archetype}</small><h3>{art.title}</h3><p>{art.subtitle}</p><p className="art-tile__meaning">{art.symbolism}</p></div></Link>)}</div>; }

export function CulturalNote() { return <aside className="cultural-note"><span className="ornament" aria-hidden="true">✦</span><div><p className="eyebrow">OUR CULTURAL APPROACH</p><h2>เคารพรากเดิม<br/>พร้อมพื้นที่ให้การตีความใหม่</h2><p>เราแยกสิ่งที่เป็นข้อมูลอ้างอิงทางวัฒนธรรม การตีความทางศิลป์ และความหมายส่วนบุคคลอย่างตรงไปตรงมา โดยไม่กล่าวอ้างผลลัพธ์เหนือธรรมชาติ</p><Link href="/cultural-approach" className="text-link">อ่านแนวทางของเรา <span>↗</span></Link></div></aside>; }
