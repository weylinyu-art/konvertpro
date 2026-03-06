// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://koverts.com";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Koverts — Free Unit Converter",
    template: "%s | Koverts",
  },
  description: "Free, instant unit conversions for length, weight, temperature, volume, speed, area, data and more. Plus AI tools: token calculator, model size, API cost estimator.",
  keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "ai token calculator", "koverts"],
  openGraph: {
    title: "Koverts — Free Unit Converter",
    description: "Instant conversions for every unit. Free, fast, no signup.",
    type: "website",
    url: BASE_URL,
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmMono.variable} ${outfit.variable}`}>
      <head>
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body className="bg-[#f7f5f2] text-[#1a1814] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
