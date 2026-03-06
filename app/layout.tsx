// app/layout.tsx
// 性能优化：
// 1. 字体用 next/font 自动自托管（消除 Google Fonts 跨域请求）
// 2. display: swap 避免字体阻塞渲染
// 3. preconnect 提前建立关键连接
// 4. viewport themeColor 减少 CLS

import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";

// next/font 会在构建时自动下载字体并自托管
// 用户不再需要连接 fonts.googleapis.com，首屏速度大幅提升
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",      // 字体加载前先用系统字体，避免 FOIT
  preload: true,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,       // 非关键字体，不预加载
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Konvert — Free Unit Converter",
    template: "%s | Konvert",
  },
  description: "Free, instant unit conversions for length, weight, temperature, volume, speed, area and data. No signup required.",
  keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "ai token calculator"],
  openGraph: {
    title: "Konvert — Free Unit Converter",
    description: "Instant conversions for every unit. Free, fast, no signup.",
    type: "website",
  },
  // 告诉爬虫这是可索引的
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// 独立导出 viewport（Next.js 14 推荐方式，避免 console warning）
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmMono.variable} ${outfit.variable}`}
    >
      <head>
        {/* DNS prefetch for any external resources */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="bg-[#f7f5f2] text-[#1a1814] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
