// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

const BASE_URL = "https://koverts.com";

// Inter — 最主流的现代无衬线字体，Figma/Linear/Vercel都用它
// 大多数设备已有缓存，加载极快
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// JetBrains Mono — 替换 DM Mono，更清晰，开发者友好
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // 非关键字体，不阻塞
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#f7f5f2] text-[#1a1814] font-sans antialiased min-h-screen">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
