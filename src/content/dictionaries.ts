export type Locale = "th" | "en";

const th = {
  nav: {
    create: "เริ่มสร้างงาน",
    gallery: "ผลงาน",
    about: "เกี่ยวกับเรา",
    approach: "แนวทางวัฒนธรรม",
    account: "ห้องสะสม",
  },
  brand: {
    name: "มงคลล้านนา",
    latin: "MONGKOL LANNA",
    descriptor: "สตูดิโอศิลปะเฉพาะบุคคล",
  },
  home: {
    eyebrow: "งานศิลป์ที่เริ่มต้นจากเรื่องของคุณ",
    title: "เรื่องราวของคุณ\nความตั้งใจของคุณ\nถ่ายทอดเป็นศิลป์ไทย–ล้านนา",
    intro: "ร่วมกำหนดทิศทางงานศิลป์ร่วมสมัยที่มีเพียงชิ้นเดียว ผ่านเรื่องราว สัญลักษณ์ และบรรยากาศที่คัดสรรอย่างใส่ใจ",
    cta: "เริ่มการว่าจ้าง",
    secondary: "ชมแนวทางการสร้างงาน",
    processTitle: "การว่าจ้างที่สงบและชัดเจน",
  },
  common: {
    learnMore: "อ่านต่อ",
    next: "ถัดไป",
    back: "ย้อนกลับ",
    save: "บันทึกแล้ว",
    edit: "แก้ไข",
    continue: "ดำเนินการต่อ",
  },
} as const;

export type Dictionary = {
  nav: Record<keyof typeof th.nav, string>;
  brand: Record<keyof typeof th.brand, string>;
  home: Record<keyof typeof th.home, string>;
  common: Record<keyof typeof th.common, string>;
};

const en: Dictionary = {
  nav: {
    create: "Begin a commission",
    gallery: "Gallery",
    about: "About",
    approach: "Cultural approach",
    account: "Library",
  },
  brand: {
    name: "Mongkol Lanna",
    latin: "MONGKOL LANNA",
    descriptor: "Personal art atelier",
  },
  home: {
    eyebrow: "Art that begins with your story",
    title: "Your story.\nYour intention.\nPainted as Thai–Lanna art.",
    intro: "Shape an original contemporary artwork through a considered dialogue of story, symbol and atmosphere.",
    cta: "Begin your commission",
    secondary: "See how it is made",
    processTitle: "A quiet, considered commission",
  },
  common: {
    learnMore: "Read more",
    next: "Next",
    back: "Back",
    save: "Saved",
    edit: "Edit",
    continue: "Continue",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { th, en };
export const getDictionary = (locale: Locale = "th") => dictionaries[locale];
