import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary } from "@/content/dictionaries";

export function SiteHeader() {
  const d = getDictionary("th");
  return <header className="site-header"><Link href="/" className="brand" aria-label={`${d.brand.name} กลับหน้าหลัก`}><span className="brand__mark">ML</span><span><strong>{d.brand.name}</strong><small>{d.brand.latin}</small></span></Link><nav aria-label="เมนูหลัก"><Link href="/gallery">{d.nav.gallery}</Link><Link href="/about">{d.nav.about}</Link><Link href="/account">{d.nav.account}</Link><Link className="nav-cta" href="/create">{d.nav.create}</Link></nav><details className="mobile-nav"><summary aria-label="เปิดเมนู"><span/><span/></summary><div><Link href="/create">{d.nav.create}</Link><Link href="/gallery">{d.nav.gallery}</Link><Link href="/about">{d.nav.about}</Link><Link href="/cultural-approach">{d.nav.approach}</Link><Link href="/account">{d.nav.account}</Link></div></details></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div><span className="eyebrow">MONGKOL LANNA · THE ATELIER</span><h2>ศิลปะที่ให้พื้นที่<br/>แก่เรื่องราวของคุณ</h2><p>Your story, composed as contemporary Lanna art.</p></div><div className="footer-links"><Link href="/about">The Atelier</Link><Link href="/#process">How It Works</Link><Link href="/gallery">Story Gallery</Link><Link href="/cultural-approach">Cultural Approach</Link><Link href="/faq">FAQ</Link><a href="https://wa.me/66929894495" rel="noreferrer">WhatsApp ↗</a></div><div className="footer-meta"><p className="footer-language" aria-label="Available languages">TH <span>/</span> EN</p><p className="fine-print">ร่วมสมัย · ไทย–ล้านนา · สร้างขึ้นอย่างใส่ใจ<br/>© 2026 MONGKOL LANNA<br/><Link href="/faq">Privacy &amp; terms</Link></p></div></footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <><SiteHeader/><main>{children}</main><SiteFooter/></>; }

export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) { return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{body}</p></header>; }
