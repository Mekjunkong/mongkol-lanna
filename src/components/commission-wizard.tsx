"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { heroes, intentions, moods, worlds } from "@/content/mock-data";
import { ArtworkComposition, artworkStudySources } from "./artwork-composition";

type Draft = { intention?: string; story?: string; world?: string; mood?: string; hero?: string; format?: string };
const stages = ["ความตั้งใจ", "เรื่องราว", "โลกของภาพ", "อารมณ์", "ภาพหลัก", "รายละเอียด"];
const initial: Draft = { format: "portrait" };

export function CommissionWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initial);
  const [restored, setRestored] = useState(false);
  useEffect(() => { try { const raw=localStorage.getItem("mongkol-commission-v1"); if(raw){const saved=JSON.parse(raw) as {step:number;draft:Draft}; setDraft(saved.draft); setStep(Math.min(saved.step, stages.length-1));} } finally {setRestored(true);} }, []);
  useEffect(() => { if(restored) localStorage.setItem("mongkol-commission-v1", JSON.stringify({step,draft})); }, [draft,step,restored]);
  const update=(key:keyof Draft,value:string)=>setDraft(v=>({...v,[key]:value}));
  const valid = step===1 || Boolean([draft.intention,draft.story,draft.world,draft.mood,draft.hero,draft.format][step]);
  const next=()=>{ if(step<stages.length-1)setStep(s=>s+1); else router.push("/blueprint/quiet-dawn-001"); };
  const selectedTone = draft.world === "river-courtyard" ? "sacred-river" : draft.world === "forest-gold" ? "golden-forest" : "new-dawn";
  return <div className="wizard-shell">
    <aside className="wizard-visual"><ArtworkComposition tone={selectedTone}/><p>ภาพตัวอย่างนี้เป็น MOCK ARTWORK สำหรับช่วยกำหนดทิศทาง ไม่ใช่ผลงานที่สร้างเสร็จ</p></aside>
    <section className="wizard-panel" aria-labelledby="wizard-title">
      <header className="wizard-progress"><LinkHome/><div><p>ขั้นที่ {step+1} จาก {stages.length}</p><progress value={step+1} max={stages.length}>{step+1}/{stages.length}</progress></div><span aria-live="polite">{restored ? "บันทึกแล้ว" : "กำลังเรียกคืน…"}</span></header>
      <div className="wizard-content">
        <p className="eyebrow">{stages[step]} · {String(step+1).padStart(2,"0")}</p>
        {step===0 && <ChoiceStep title="คุณกำลังอยู่ในบทไหนของชีวิต?" intro="เลือกหนึ่งสิ่งที่อยากให้งานชิ้นนี้เก็บไว้ ไม่มีคำตอบที่ถูกหรือผิด" name="intention" value={draft.intention} options={intentions.map((x,i)=>({id:x.id,label:x.th,detail:x.note,tone:(["new-dawn","quiet-mountain","sacred-river","guardian"] as const)[i]}))} onChange={v=>update("intention",v)}/>}
        {step===1 && <div><h1 id="wizard-title">มีเรื่องราวที่อยากแบ่งปันไหม?</h1><p className="step-intro">ส่วนนี้ไม่บังคับ เขียนสั้น ๆ 1–5 ประโยค หรือข้ามไปได้ เรื่องของคุณใช้เพื่อกำหนดทิศทางภาพเท่านั้น</p><label className="story-field"><span>เรื่องราวของคุณ <small>ไม่บังคับ</small></span><textarea maxLength={600} rows={7} value={draft.story||""} onChange={e=>update("story",e.target.value)} placeholder="เช่น ช่วงเวลาที่กำลังเปลี่ยนผ่าน บ้านที่คิดถึง หรือสิ่งที่อยากจดจำ…"/><small>{draft.story?.length||0} / 600</small></label></div>}
        {step===2 && <ChoiceStep title="โลกของภาพแบบใดใกล้กับคุณ?" intro="แต่ละโลกกำหนดภูมิทัศน์ แสง และจังหวะขององค์ประกอบ" name="world" value={draft.world} options={worlds.map(x=>({id:x.id,label:x.name,detail:x.en,tone:x.tone}))} onChange={v=>update("world",v)}/>}
        {step===3 && <ChoiceStep title="อยากให้ภาพรู้สึกอย่างไร?" intro="เลือกน้ำเสียงหลักหนึ่งอย่าง เพื่อให้รายละเอียดทั้งหมดเดินไปในจังหวะเดียวกัน" name="mood" value={draft.mood} options={moods.map((x,i)=>({id:x,label:x,detail:"อารมณ์หลักขององค์ประกอบ",tone:(["quiet-mountain","golden-forest","new-dawn","guardian"] as const)[i]}))} onChange={v=>update("mood",v)}/>}
        {step===4 && <ChoiceStep title="สิ่งใดควรเป็นหัวใจของภาพ?" intro="ภาพหลักจะเด่นที่สุด ส่วนองค์ประกอบอื่นมีหน้าที่สนับสนุน" name="hero" value={draft.hero} options={heroes.map((x,i)=>({id:x.id,label:x.name,detail:x.note,tone:(["golden-forest","quiet-mountain","sacred-river"] as const)[i]}))} onChange={v=>update("hero",v)}/>}
        {step===5 && <ChoiceStep title="รูปแบบใดจะช่วยโอบอุ้มงานชิ้นนี้?" intro="เราจะสงวนพื้นที่ว่างและจัดลำดับภาพให้เหมาะกับสัดส่วนนี้" name="format" value={draft.format} options={[{id:"portrait",label:"แนวตั้ง",detail:"เหมาะกับหน้าจอและผนังแคบ",tone:"new-dawn" as const},{id:"landscape",label:"แนวนอน",detail:"เหมาะกับผนังกว้างและพื้นที่รับแขก",tone:"sacred-river" as const},{id:"square",label:"จัตุรัส",detail:"สมดุลและใช้งานได้หลากหลาย",tone:"guardian" as const}]} onChange={v=>update("format",v)}/>}
      </div>
      <footer className="wizard-actions"><button className="button button--quiet" onClick={()=>step?setStep(s=>s-1):router.push("/")}><span>←</span> ย้อนกลับ</button><button className="button" disabled={!valid} onClick={next}>{step===stages.length-1?"ดูพิมพ์เขียว":"ถัดไป"} <span>→</span></button></footer>
    </section>
  </div>;
}
function LinkHome() {
  return (
    <Link className="wizard-brand" href="/" aria-label="กลับหน้าหลัก">
      ML
    </Link>
  );
}
function ChoiceStep({title,intro,name,value,options,onChange}:{title:string;intro:string;name:string;value?:string;options:{id:string;label:string;detail:string;tone: keyof typeof artworkStudySources}[];onChange:(value:string)=>void}) { return <fieldset><legend id="wizard-title">{title}</legend><p className="step-intro">{intro}</p><div className="choice-list">{options.map((o,i)=><label className={`choice ${value===o.id?"choice--selected":""}`} onClick={()=>onChange(o.id)} key={o.id}><Image className="choice__thumb" src={artworkStudySources[o.tone]} alt="" width={58} height={58}/><input type="radio" name={name} value={o.id} checked={value===o.id} onChange={()=>onChange(o.id)}/><span className="choice__number">{String(i+1).padStart(2,"0")}</span><span className="choice__copy"><strong>{o.label}</strong><small>{o.detail}</small></span><span className="choice__check">✓</span></label>)}</div></fieldset> }
