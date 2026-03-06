// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Mono, Outfit } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

const BASE_URL = "https://koverts.com";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"], weight: ["400"], style: ["normal", "italic"],
  variable: "--font-serif", display: "swap", preload: true,
});
const dmMono = DM_Mono({
  subsets: ["latin"], weight: ["300", "400", "500"],
  variable: "--font-mono", display: "swap", preload: false,
});
const outfit = Outfit({
  subsets: ["latin"], weight: ["300", "400", "500", "600"],
  variable: "--font-sans", display: "swap", preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "Koverts — Free Unit Converter & AI Tools", template: "%s | Koverts" },
  description: "Free instant unit conversions for length, weight, temperature, volume, speed, area, cooking and more. Plus AI tools: token calculator, model size estimator, API cost calculator.",
  keywords: ["unit converter", "cooking converter", "shoe size converter", "ai token calculator", "koverts"],
  openGraph: {
    title: "Koverts — Free Unit Converter & AI Tools",
    description: "Instant conversions for every unit. Plus AI tools. Free, no signup.",
    type: "website", url: BASE_URL,
    images: [{ url: `${BASE_URL}/og-image.svg`, width: 1200, height: 630, alt: "Koverts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koverts — Free Unit Converter & AI Tools",
    description: "Instant conversions for every unit. Plus AI tools. Free, no signup.",
    images: [`${BASE_URL}/og-image.svg`],
  },
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, themeColor: "#f7f5f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmMono.variable} ${outfit.variable}`}>
      <body className="bg-[#f7f5f2] text-[#1a1814] font-sans antialiased min-h-screen">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
