"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArtworkComposition } from "./artwork-composition";

export function RevealExperience() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Hydrate from client storage. Using useState in effect is acceptable for client-side hydration.
    const seen = sessionStorage.getItem("mongkol-reveal-seen");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (seen) setRevealed(true);
  }, []);

  const reveal = () => {
    setRevealed(true);
    sessionStorage.setItem("mongkol-reveal-seen", "1");
  };

  return (
    <main className={`reveal ${revealed ? "reveal--open" : ""}`}>
      {!revealed && (
        <button className="reveal-cover" onClick={reveal}>
          <span className="brand__mark">ML</span>
          <small>YOUR COMMISSION · 001</small>
          <strong>เปิดชมผลงานของคุณ</strong>
          <i>แตะเพื่อเปิด</i>
        </button>
      )}
      <section className="reveal-stage">
        <div className="reveal-art">
          <ArtworkComposition tone="mist" title="รุ่งอรุณยังคงคำมั่น" />
        </div>
        <div className="reveal-copy">
          <p className="eyebrow">PRIVATE COMMISSION · 001</p>
          <h1>
            รุ่งอรุณ
            <br />
            ยังคงคำมั่น
          </h1>
          <p className="lead">
            ต้นไทรยืนอยู่ในแสงแรกเหนือแนวดอย รากของมันทอดลงสู่ผืนดิน
            ขณะที่สายน้ำพาภาพไปสู่พื้นที่เปิด—การตีความส่วนบุคคลของการเริ่มต้นที่ไม่ทิ้งสิ่งสำคัญไว้ข้างหลัง
          </p>
          <div className="symbol-key">
            <span>
              <i className="dot dot--jade" />
              <small>ภาพหลัก</small>
              <strong>ต้นไทร</strong>
            </span>
            <span>
              <i className="dot dot--gold" />
              <small>อารมณ์</small>
              <strong>สงบนิ่ง</strong>
            </span>
            <span>
              <i className="dot dot--blue" />
              <small>โลกของภาพ</small>
              <strong>รุ่งอรุณเหนือดอย</strong>
            </span>
          </div>
          <div className="reveal-actions">
            <a href="#" className="button" download>
              บันทึกภาพตัวอย่าง
            </a>
            <Link className="button button--quiet" href="/account/artworks">
              ไปยังห้องสะสม
            </Link>
          </div>
          <p className="fine-print">ภาพสาธิตสำหรับเวิร์กโฟลว์ · ไม่มีการเรียกเก็บเงินหรือสร้างงานจริง</p>
        </div>
      </section>
    </main>
  );
}
