// app/layout.tsx
import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: { default: "Konvert — Free Unit Converter", template: "%s | Konvert" },
  description: "Free, instant unit conversions for length, weight, temperature, volume, speed, area and data. No signup required.",
  keywords: ["unit converter", "length converter", "weight converter", "temperature converter"],
  verification: {
    google: "F8Iq38o3BwOPbFfefYM3d8MXRslMOFDXHipAJHItem4",
  },
  openGraph: {
    title: "Konvert — Free Unit Converter",
    description: "Instant conversions for every unit. Free, fast, no signup.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmMono.variable} ${outfit.variable}`}>
      <body className="bg-[#f7f5f2] text-[#1a1814] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
