import type { ApprovedTone, Intention, JourneyState, LifeTheme } from "../catalog/types";
import type { StorySafetyFlag } from "./schema";

type Rule<T extends string> = Readonly<{ value: T; patterns: readonly RegExp[] }>;
export const LIFE_THEME_RULES: readonly Rule<LifeTheme>[] = [
 { value:"CHANGE", patterns:[/\b(?:change|new chapter|begin|transition|move)\b/iu,/เริ่ม|เปลี่ยน|บทใหม่/u] },
 { value:"RESILIENCE", patterns:[/\b(?:recover|overcome|courage|strong|challenge)\b/iu,/ผ่านพ้น|เข้มแข็ง|กล้า|อุปสรรค/u] },
 { value:"CONNECTION", patterns:[/\b(?:family|friend|together|connection|community)\b/iu,/ครอบครัว|เพื่อน|ร่วมกัน|ผูกพัน/u] },
 { value:"HOME", patterns:[/\b(?:home|belong|return|roots)\b/iu,/บ้าน|กลับ|ถิ่น|ราก/u] },
 { value:"APPRECIATION", patterns:[/\b(?:thank|grateful|appreciate|celebrate)\b/iu,/ขอบคุณ|ซาบซึ้ง|ยินดี/u] },
 { value:"REFLECTION", patterns:[/\b(?:remember|memory|reflect|past)\b/iu,/ระลึก|ความทรงจำ|อดีต/u] },
 { value:"REST", patterns:[/\b(?:rest|pause|heal|quiet|peace)\b/iu,/พัก|สงบ|เยียวยา/u] },
];
export const JOURNEY_RULES: readonly Rule<JourneyState>[] = [
 { value:"BEGINNING",patterns:[/\b(?:start|begin|new chapter|first)\b/iu,/เริ่ม|บทใหม่|ครั้งแรก/u] },
 { value:"BECOMING",patterns:[/\b(?:grow|learn|becoming|building)\b/iu,/เติบโต|เรียนรู้|สร้าง/u] },
 { value:"CROSSING",patterns:[/\b(?:through|cross|transition|challenge|move)\b/iu,/ผ่าน|เปลี่ยนผ่าน|อุปสรรค/u] },
 { value:"REMEMBERING",patterns:[/\b(?:remember|memory|miss|past)\b/iu,/ระลึก|ความทรงจำ|คิดถึง/u] },
 { value:"RETURNING",patterns:[/\b(?:return|home again|reconnect|restore)\b/iu,/กลับ|คืน|เชื่อมโยงอีกครั้ง/u] },
];
export const TONE_RULES: readonly Rule<ApprovedTone>[] = [
 { value:"CALM",patterns:[/\b(?:calm|quiet|peace|gentle)\b/iu,/สงบ|เงียบ|อ่อนโยน/u] },
 { value:"TENDER",patterns:[/\b(?:tender|care|love|miss)\b/iu,/รัก|คิดถึง|ห่วงใย/u] },
 { value:"HOPEFUL",patterns:[/\b(?:hope|possible|future|dawn)\b/iu,/หวัง|อนาคต|รุ่งอรุณ/u] },
 { value:"DETERMINED",patterns:[/\b(?:determined|courage|persist|overcome)\b/iu,/มุ่งมั่น|กล้า|ผ่านพ้น/u] },
 { value:"REFLECTIVE",patterns:[/\b(?:reflect|remember|memory|consider)\b/iu,/ระลึก|ความทรงจำ|ทบทวน/u] },
 { value:"WARM",patterns:[/\b(?:warm|grateful|together|family)\b/iu,/อบอุ่น|ขอบคุณ|ครอบครัว/u] },
];

export const INTENTION_DEFAULTS: Readonly<Record<Intention,{lifeTheme:LifeTheme;tone:ApprovedTone;journey:JourneyState;metaphors:readonly string[]}>>={
 NEW_BEGINNING:{lifeTheme:"CHANGE",tone:"HOPEFUL",journey:"BEGINNING",metaphors:["opening-horizon"]},
 GROWTH:{lifeTheme:"CHANGE",tone:"HOPEFUL",journey:"BECOMING",metaphors:["patient-rhythm"]},
 COURAGE:{lifeTheme:"RESILIENCE",tone:"DETERMINED",journey:"CROSSING",metaphors:["long-view"]},
 HARMONY:{lifeTheme:"CONNECTION",tone:"CALM",journey:"STEADY",metaphors:["held-space"]},
 GRATITUDE:{lifeTheme:"APPRECIATION",tone:"WARM",journey:"STEADY",metaphors:["gathered-light"]},
 REMEMBRANCE:{lifeTheme:"REFLECTION",tone:"REFLECTIVE",journey:"REMEMBERING",metaphors:["long-view"]},
 BELONGING:{lifeTheme:"HOME",tone:"WARM",journey:"RETURNING",metaphors:["held-space"]},
 RESTORATION:{lifeTheme:"REST",tone:"CALM",journey:"RETURNING",metaphors:["returning-current"]},
};

const safetyRules: readonly [StorySafetyFlag, RegExp][] = [
 ["PROHIBITED_TEXT",/(?:\b(?:text|writing|name|date|mantra|yantra|inscription|calligraphy|pseudo[- ]?script|letters?|signature)\b|อักษร|ชื่อ|วันที่|ยันต์|คาถา)/iu],
 ["CULTURAL_MIXING",/\b(?:asian|oriental|japanese|chinese|balinese|khmer|tibetan)\b/iu],
 ["REFERENCE_COPYING",/(?:copy|trace|replicate|in the style of|เหมือนเป๊ะ|ลอก)/iu],
 ["SACRED_REQUEST",/(?:\b(?:buddha|sacred|religious|temple deity)\b|พระพุทธ|ศักดิ์สิทธิ์|เทพ)/iu],
 ["ASTROLOGY_REQUEST",/(?:\b(?:astrology|zodiac|horoscope|birth chart)\b|ดูดวง|จักรราศี|วันเกิดกำหนด)/iu],
 ["EXCESSIVE_SYMBOLS",/(?:\b(?:every symbol|all symbols|dozens? of symbols|ten symbols)\b|ทุกสัญลักษณ์|สิบสัญลักษณ์)/iu],
];
export function safetyFlags(value:string):StorySafetyFlag[]{return safetyRules.filter(([,pattern])=>pattern.test(value)).map(([flag])=>flag);}
