export const intentions = [
  { id: "new-beginning", th: "การเริ่มต้นใหม่", en: "A new beginning", note: "พื้นที่สำหรับการเปลี่ยนผ่านอย่างอ่อนโยน" },
  { id: "steadiness", th: "ความมั่นคง", en: "Steadiness", note: "จังหวะที่นิ่ง สงบ และมีรากฐาน" },
  { id: "belonging", th: "ความผูกพัน", en: "Belonging", note: "ความสัมพันธ์ บ้าน และการกลับคืน" },
  { id: "courage", th: "ความกล้า", en: "Courage", note: "พลังใจที่เติบโตโดยไม่เร่งรัด" },
] as const;

export const worlds = [
  { id: "mountain-dawn", name: "รุ่งอรุณเหนือดอย", en: "Mountain Dawn", tone: "new-dawn" },
  { id: "river-courtyard", name: "ลานริมสายน้ำ", en: "River Courtyard", tone: "sacred-river" },
  { id: "forest-gold", name: "พงไพรสีทอง", en: "Golden Forest", tone: "golden-forest" },
] as const;

export const moods = ["สงบนิ่ง", "อบอุ่น", "โปร่งเบา", "สง่างาม"] as const;
export const heroes = [
  { id: "banyan", name: "ต้นไทร", note: "สัญลักษณ์ส่วนบุคคลของรากและการเติบโต" },
  { id: "mountain", name: "แนวภูเขา", note: "รูปทรงแห่งจังหวะที่มั่นคง" },
  { id: "lotus", name: "ดอกบัว", note: "องค์ประกอบธรรมชาติที่ผ่านการคัดสรร" },
] as const;

export const artworks = [
  { id: "the-new-dawn", title: "THE NEW DAWN", subtitle: "รุ่งอรุณเหนือดอย · ต้นไทร · สงบนิ่ง", tone: "new-dawn", archetype: "The New Dawn", hero: "ต้นไทร", world: "รุ่งอรุณเหนือดอย", mood: "สงบนิ่ง", symbolism: "รากและการเริ่มต้นใหม่", interpretation: "ภูมิทัศน์เชิงกวีของการเปลี่ยนผ่าน" },
  { id: "the-guardian", title: "THE GUARDIAN", subtitle: "ผู้เฝ้ารักษา · ลานพิธีร่วมสมัย · สง่างาม", tone: "guardian", archetype: "The Guardian", hero: "รูปทรงผู้พิทักษ์", world: "ลานกลางบ้าน", mood: "สง่างาม", symbolism: "ความมั่นคงและการดูแล", interpretation: "รูปทรงสมมติจากภาษาทัศนศิลป์ล้านนา" },
  { id: "the-sacred-river", title: "THE SACRED RIVER", subtitle: "สายน้ำที่พากลับบ้าน · ริมน้ำ · อบอุ่น", tone: "sacred-river", archetype: "The Sacred River", hero: "สายน้ำ", world: "ลานริมสายน้ำ", mood: "อบอุ่น", symbolism: "ความผูกพันและการไหลต่อเนื่อง", interpretation: "การตีความทางศิลป์ ไม่ใช่ความหมายศักดิ์สิทธิ์" },
  { id: "the-quiet-mountain", title: "THE QUIET MOUNTAIN", subtitle: "ภูเขาที่ไม่เร่งรัด · แนวดอย · โปร่งเบา", tone: "quiet-mountain", archetype: "The Quiet Mountain", hero: "แนวภูเขา", world: "หุบเขาเงียบ", mood: "โปร่งเบา", symbolism: "จังหวะที่มั่นคง", interpretation: "ภูมิทัศน์ร่วมสมัยจากเส้นสายและพื้นที่ว่าง" },
  { id: "the-golden-forest", title: "THE GOLDEN FOREST", subtitle: "แสงลอดผ่านพงไพร · พฤกษา · อบอุ่น", tone: "golden-forest", archetype: "The Golden Forest", hero: "พฤกษา", world: "พงไพรสีทอง", mood: "อบอุ่น", symbolism: "การเติบโตอย่างมีราก", interpretation: "รูปแบบพฤกษาที่คัดสรรสำหรับงานชิ้นนี้" },
  { id: "the-journey", title: "THE JOURNEY", subtitle: "เส้นทางที่ยังเปิดอยู่ · สายน้ำและพฤกษา · สงบนิ่ง", tone: "journey", archetype: "The Journey", hero: "เส้นทางน้ำ", world: "ทางผ่านระหว่างหุบเขา", mood: "สงบนิ่ง", symbolism: "การเดินทางโดยไม่ละทิ้งบ้านเดิม", interpretation: "เรื่องเล่าเชิงภาพที่เว้นพื้นที่ให้ผู้ชมเติมความหมาย" },
] as const;

export const faqs = [
  ["งานแต่ละชิ้นเป็นอย่างไร", "ทุกชิ้นเริ่มจากตัวเลือกและเรื่องราวของผู้ว่าจ้าง แล้วจึงพัฒนาเป็นพิมพ์เขียวทางศิลป์เฉพาะชิ้น"],
  ["จำเป็นต้องเล่าเรื่องส่วนตัวหรือไม่", "ไม่จำเป็น คุณข้ามส่วนเรื่องราวได้ และใช้เพียงความตั้งใจกับทิศทางภาพที่เลือก"],
  ["มีข้อความหรืออักขระในภาพไหม", "ไม่มี เราไม่สร้างอักษร ข้อความ ยันต์ หรืออักขระเลียนแบบในผลงาน"],
  ["ความหมายทางวัฒนธรรมตรวจสอบอย่างไร", "เราแยกข้อมูลอ้างอิงทางวัฒนธรรม การตีความทางศิลป์ และสัญลักษณ์ส่วนบุคคลอย่างชัดเจน สิ่งที่ยังไม่ผ่านการทบทวนจะไม่ถูกนำเสนอเป็นข้อเท็จจริง"],
] as const;
