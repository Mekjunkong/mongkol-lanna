import Link from "next/link";
import { ArtworkComposition } from "@/components/artwork-composition";
import { ArtworkGrid, CulturalNote } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";
import { getDictionary } from "@/content/dictionaries";

export default function Home() {
  const d = getDictionary();

  return (
    <PageShell>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">{d.home.eyebrow}</p>
          <h1>
            {d.home.title.split("\n").map((x, i) => (
              <span key={`${x}-${i}`}>
                {x}
                {i < 2 && <br />}
              </span>
            ))}
          </h1>
          <p className="lead">{d.home.intro}</p>
          <div className="button-row">
            <Link className="button" href="/create">
              {d.home.cta} <span>→</span>
            </Link>
            <Link className="text-link" href="#process">
              {d.home.secondary} ↓
            </Link>
          </div>
        </div>

        <div className="hero__art">
          <ArtworkComposition />
          <p className="art-caption">
            <span>PERSONAL COMMISSION · STUDY 01</span>
            <span>CONTEMPORARY THAI–LANNA</span>
          </p>
        </div>

        <aside className="hero__rail" aria-hidden="true">
          <span>ORIGINAL ART DIRECTION</span>
          <i />
        </aside>
      </section>

      <section className="signal-strip" aria-label="สิ่งที่คุณจะได้รับจากขั้นตอนเริ่มต้น">
        <div><span>01</span><strong>เริ่มจากเรื่องของคุณ</strong><p>ไม่ต้องรู้ศัพท์ศิลปะ แค่เลือกสิ่งที่อยากเก็บไว้</p></div>
        <div><span>02</span><strong>เห็นทิศทางก่อนสร้าง</strong><p>ตรวจพิมพ์เขียวและปรับความรู้สึกได้ก่อนยืนยัน</p></div>
        <div><span>03</span><strong>ตีความอย่างมีขอบเขต</strong><p>แยกข้อมูลอ้างอิง ความหมายส่วนบุคคล และงานศิลป์ให้ชัดเจน</p></div>
      </section>

      <section className="process" id="process">
        <header>
          <p className="eyebrow">THE QUIET COMMISSION</p>
          <h2>{d.home.processTitle}</h2>
        </header>
        <ol>
          <li>
            <span>01</span>
            <h3>เลือกความตั้งใจ</h3>
            <p>เริ่มจากสิ่งที่คุณอยากเก็บไว้ในงานชิ้นนี้</p>
          </li>
          <li>
            <span>02</span>
            <h3>กำหนดโลกของภาพ</h3>
            <p>เลือกบรรยากาศ อารมณ์ และสัญลักษณ์ที่ใกล้กับคุณ</p>
          </li>
          <li>
            <span>03</span>
            <h3>ทบทวนพิมพ์เขียว</h3>
            <p>เห็นทิศทางภาพและความหมายก่อนยืนยันการสร้างงาน</p>
          </li>
          <li>
            <span>04</span>
            <h3>พบกับผลงาน</h3>
            <p>เปิดชมเรื่องราวของคุณในรูปแบบงานศิลป์เฉพาะชิ้น</p>
          </li>
        </ol>
      </section>

      <section className="selected">
        <header>
          <p className="eyebrow">SELECTED COMMISSIONS</p>
          <h2>
            เรื่องราวที่แปรเป็น
            <br />
            ภูมิทัศน์และสัญลักษณ์
          </h2>
          <Link href="/gallery" className="text-link">
            ชมผลงานทั้งหมด ↗
          </Link>
        </header>
        <ArtworkGrid />
      </section>

      <CulturalNote />

      <section className="final-cta">
        <p className="eyebrow">YOUR STORY, HELD IN ART</p>
        <h2>
          พร้อมเริ่มต้น
          <br />
          งานชิ้นของคุณหรือยัง?
        </h2>
        <Link className="button button--light" href="/create">
          เริ่มการว่าจ้าง <span>→</span>
        </Link>
      </section>
    </PageShell>
  );
}
