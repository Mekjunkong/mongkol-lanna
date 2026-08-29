import type { Intention } from "../catalog/types";
import type { StorySafetyFlag } from "./schema";
export type StoryFixture=Readonly<{story:string;intention:Intention;flags:readonly StorySafetyFlag[]}>;
export const STORY_FIXTURES: readonly StoryFixture[]=Object.freeze([
 {story:"I am beginning a new chapter with hope.",intention:"NEW_BEGINNING",flags:[]},
 {story:"I am learning and growing patiently.",intention:"GROWTH",flags:[]},
 {story:"We moved through a difficult challenge with courage.",intention:"COURAGE",flags:[]},
 {story:"Our family is together in a quiet home.",intention:"HARMONY",flags:[]},
 {story:"I am grateful for the warmth of my friends.",intention:"GRATITUDE",flags:[]},
 {story:"I remember a tender family memory.",intention:"REMEMBRANCE",flags:[]},
 {story:"After years away, I return home.",intention:"BELONGING",flags:[]},
 {story:"I need a calm pause and gentle restoration.",intention:"RESTORATION",flags:[]},
 {story:"ฉันกำลังเริ่มบทใหม่ด้วยความหวัง",intention:"NEW_BEGINNING",flags:[]},
 {story:"เราเติบโตและเรียนรู้ไปด้วยกัน",intention:"GROWTH",flags:[]},
 {story:"ฉันผ่านอุปสรรคด้วยความมุ่งมั่น",intention:"COURAGE",flags:[]},
 {story:"ครอบครัวอยู่ร่วมกันอย่างสงบ",intention:"HARMONY",flags:[]},
 {story:"ขอบคุณเพื่อนที่ให้ความอบอุ่น",intention:"GRATITUDE",flags:[]},
 {story:"ฉันระลึกถึงความทรงจำที่อ่อนโยน",intention:"REMEMBRANCE",flags:[]},
 {story:"ฉันกลับบ้านและรู้สึกผูกพัน",intention:"BELONGING",flags:[]},
 {story:"ขอพักอย่างสงบเพื่อเยียวยา",intention:"RESTORATION",flags:[]},
 {story:"Add my name and date as an inscription.",intention:"REMEMBRANCE",flags:["PROHIBITED_TEXT"]},
 {story:"Mix Japanese and generic Asian symbols.",intention:"HARMONY",flags:["CULTURAL_MIXING"]},
 {story:"Copy this artist exactly, including the signature.",intention:"GRATITUDE",flags:["PROHIBITED_TEXT","REFERENCE_COPYING"]},
 {story:"Put a Buddha and sacred writing in the center.",intention:"COURAGE",flags:["PROHIBITED_TEXT","SACRED_REQUEST"]},
 {story:"Use my birth chart and zodiac to predict my future.",intention:"NEW_BEGINNING",flags:["ASTROLOGY_REQUEST"]},
 {story:"Include every symbol and dozens of symbols around it.",intention:"GROWTH",flags:["EXCESSIVE_SYMBOLS"]},
 {story:"ใส่ยันต์และคาถาศักดิ์สิทธิ์",intention:"COURAGE",flags:["PROHIBITED_TEXT","SACRED_REQUEST"]},
 {story:"ลอกภาพนี้ให้เหมือนเป๊ะ",intention:"GRATITUDE",flags:["REFERENCE_COPYING"]},
]);
