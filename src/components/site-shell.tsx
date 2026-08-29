import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary } from "@/content/dictionaries";

export function SiteHeader() {
  const d = getDictionary("th");
  return <header className="site-header"><Link href="/" className="brand"><span className="brand__mark">ML</span><span><strong>{d.brand.name}</strong><small>{d.brand.latin}</small></span></Link><nav aria-label="เมนูหลัก"><Link href="/gallery">{d.nav.gallery}</Link><Link href="/about">{d.nav.about}</Link><Link href="/account">{d.nav.account}</Link><Link className="nav-cta" href="/create">{d.nav.create}</Link></nav><details className="mobile-nav"><summary aria-label="เปิดเมนู"><span/><span/></summary><div><Link href="/create">{d.nav.create}</Link><Link href="/gallery">{d.nav.gallery}</Link><Link href="/about">{d.nav.about}</Link><Link href="/cultural-approach">{d.nav.approach}</Link><Link href="/account">{d.nav.account}</Link></div></details></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div><span className="eyebrow">MONGKOL LANNA</span><h2>ศิลปะที่ให้พื้นที่<br/>แก่เรื่องราวของคุณ</h2></div><div className="footer-links"><Link href="/gallery">ผลงาน</Link><Link href="/about">เกี่ยวกับเรา</Link><Link href="/cultural-approach">แนวทางวัฒนธรรม</Link><Link href="/faq">คำถามที่พบบ่อย</Link></div><p className="fine-print">ร่วมสมัย · ไทย–ล้านนา · สร้างขึ้นอย่างใส่ใจ<br/>© 2026 MONGKOL LANNA</p></footer>;
}

export function PageShell({ children }: { children: ReactNode }) { return <><SiteHeader/><main>{children}</main><SiteFooter/></>; }

export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) { return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{body}</p></header>; }
