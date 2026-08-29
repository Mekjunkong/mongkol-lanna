import type { Metadata } from "next";
import { Anuphan, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
const body = Anuphan({ variable: "--font-body", subsets: ["thai", "latin"], display: "swap" });
const display = Noto_Serif_Thai({ variable: "--font-display", subsets: ["thai", "latin"], display: "swap" });
export const metadata: Metadata = { title: { default: "MONGKOL LANNA — Personal Thai–Lanna Art", template: "%s — MONGKOL LANNA" }, description: "สตูดิโอศิลปะไทย–ล้านนาร่วมสมัยเฉพาะบุคคล ถ่ายทอดเรื่องราวและความตั้งใจของคุณอย่างใส่ใจ" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="th" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable}`}><body>{children}</body></html>; }
