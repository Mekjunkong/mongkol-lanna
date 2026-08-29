import type { Metadata } from "next";
import { Anuphan, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
const body = Anuphan({ variable: "--font-body", subsets: ["thai", "latin"], display: "swap" });
const display = Noto_Serif_Thai({ variable: "--font-display", subsets: ["thai", "latin"], display: "swap" });
export const metadata: Metadata = {
  title: { default: "MONGKOL LANNA | Personalized Lanna Story Art", template: "%s | MONGKOL LANNA" },
  description: "Personalized Lanna-inspired story art and custom Northern Thai artwork for life chapters, Chiang Mai memories, weddings, and new homes.",
  keywords: ["Personalized Lanna Art", "Custom Thai Artwork", "Chiang Mai Art Gift", "Personalized Thai Art", "Lanna Wedding Gift", "New Home Art Thailand", "Personalized Chiang Mai Gift", "Custom Northern Thai Art"],
  metadataBase: new URL("https://example.invalid"),
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable}`}><body>{children}</body></html>; }
