export const intentions = [
  { id: "new-beginning", th: "การเริ่มต้นใหม่", en: "A new beginning", note: "พื้นที่สำหรับการเปลี่ยนผ่านอย่างอ่อนโยน" },
  { id: "steadiness", th: "ความมั่นคง", en: "Steadiness", note: "จังหวะที่นิ่ง สงบ และมีรากฐาน" },
  { id: "belonging", th: "ความผูกพัน", en: "Belonging", note: "ความสัมพันธ์ บ้าน และการกลับคืน" },
  { id: "courage", th: "ความกล้า", en: "Courage", note: "พลังใจที่เติบโตโดยไม่เร่งรัด" },
] as const;

export const worlds = [
  { id: "mountain-dawn", name: "รุ่งอรุณเหนือดอย", en: "Mountain Dawn", tone: "mist" },
  { id: "river-courtyard", name: "ลานริมสายน้ำ", en: "River Courtyard", tone: "river" },
  { id: "forest-gold", name: "พงไพรสีทอง", en: "Golden Forest", tone: "forest" },
] as const;

export const moods = ["สงบนิ่ง", "อบอุ่น", "โปร่งเบา", "สง่างาม"] as const;
export const heroes = [
  { id: "banyan", name: "ต้นไทร", note: "สัญลักษณ์ส่วนบุคคลของรากและการเติบโต" },
  { id: "mountain", name: "แนวภูเขา", note: "รูปทรงแห่งจังหวะที่มั่นคง" },
  { id: "lotus", name: "ดอกบัว", note: "องค์ประกอบธรรมชาติที่ผ่านการคัดสรร" },
] as const;

export const artworks = [
  { id: "dawn-keeps-its-promise", title: "รุ่งอรุณยังคงคำมั่น", subtitle: "Mountain Dawn · Personal symbolism", tone: "mist" },
  { id: "roots-beside-the-river", title: "รากที่อยู่เคียงสายน้ำ", subtitle: "River Courtyard · Artistic interpretation", tone: "river" },
  { id: "quiet-gold-between-leaves", title: "ทองสงบระหว่างใบไม้", subtitle: "Golden Forest · Decorative study", tone: "forest" },
] as const;

export const faqs = [
  ["งานแต่ละชิ้นเป็นอย่างไร", "ทุกชิ้นเริ่มจากตัวเลือกและเรื่องราวของผู้ว่าจ้าง แล้วจึงพัฒนาเป็นพิมพ์เขียวทางศิลป์เฉพาะชิ้น"],
  ["จำเป็นต้องเล่าเรื่องส่วนตัวหรือไม่", "ไม่จำเป็น คุณข้ามส่วนเรื่องราวได้ และใช้เพียงความตั้งใจกับทิศทางภาพที่เลือก"],
  ["มีข้อความหรืออักขระในภาพไหม", "ไม่มี เราไม่สร้างอักษร ข้อความ ยันต์ หรืออักขระเลียนแบบในผลงาน"],
  ["ความหมายทางวัฒนธรรมตรวจสอบอย่างไร", "เราแยกข้อมูลอ้างอิงทางวัฒนธรรม การตีความทางศิลป์ และสัญลักษณ์ส่วนบุคคลอย่างชัดเจน สิ่งที่ยังไม่ผ่านการทบทวนจะไม่ถูกนำเสนอเป็นข้อเท็จจริง"],
] as const;
