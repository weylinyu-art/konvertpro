// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

const BASE_URL = "https://koverts.com";
const LOCALES  = ["en", "zh", "es", "fr", "ru", "ar"];

// hreflang locale map — maps our locale codes to BCP 47 tags
const HREFLANG: Record<string, string> = {
  en: "en", zh: "zh-Hans", es: "es", fr: "fr", ru: "ru", ar: "ar",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

// Organization structured data — brand signals for Google
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Koverts",
  "url": BASE_URL,
  "logo": `${BASE_URL}/og-image.png`,
  "description": "Free instant unit converter and AI tools. 17 categories, 49 currencies, 6 languages. No signup, no ads.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@koverts.com",
    "contactType": "customer support",
  },
  "sameAs": [],
};

// WebSite schema — enables Google Sitelinks searchbox
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Koverts",
  "url": BASE_URL,
  "description": "Free unit converter and AI tools",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/length/meter-to-{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "Koverts — Free Unit Converter & AI Tools", template: "%s | Koverts" },
  description: "Free instant unit converter with 17 categories, 49 currencies and 6 languages. AI tools included: token calculator, model size estimator, API cost calculator. No signup, no ads.",
  keywords: [
    // English — Google/Bing
    "unit converter", "currency converter", "cooking converter",
    "shoe size converter", "ai token calculator", "koverts",
    "free unit conversion", "length converter", "weight converter",
    // Chinese — Baidu
    "单位换算", "货币换算", "汇率转换", "长度换算", "重量换算",
    "温度转换", "免费换算工具", "在线换算", "烹饪换算", "鞋码换算",
    // Russian — Yandex
    "конвертер единиц", "конвертер валют", "перевод единиц", "бесплатный конвертер",
  ],
  openGraph: {
    title: "Koverts — Free Unit Converter & AI Tools",
    description: "Instant conversions for every unit. Plus AI tools. Free, no signup.",
    type: "website", url: BASE_URL,
    locale: "en_US",
    alternateLocale: ["zh_CN", "ru_RU", "es_ES", "fr_FR", "ar_SA"],
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Koverts — Free Unit Converter" }],
    siteName: "Koverts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koverts — Free Unit Converter & AI Tools",
    description: "Instant conversions for every unit. Plus AI tools. Free, no signup.",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
    // hreflang — tells Google which language version to serve to which users
    languages: Object.fromEntries(
      LOCALES.map((l) => [HREFLANG[l], `${BASE_URL}?lang=${l}`])
    ),
  },
  robots: {
    index: true,
    follow: true,
    googleBot:   { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    // Baidu and Yandex respect standard robots directives
    // Explicit entries handled in robots.txt
  },
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, themeColor: "#f7f5f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* hreflang for all 6 languages (Google, Yandex) */}
        {LOCALES.map((l) => (
          <link key={l} rel="alternate" hrefLang={HREFLANG[l]} href={`${BASE_URL}?lang=${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

        {/* Baidu — site verification (replace XXXX with code from ziyuan.baidu.com) */}
        <meta name="baidu-site-verification" content="BAIDU_VERIFY_CODE" />
        {/* Baidu — preferred language signal */}
        <meta name="applicable-device" content="pc,mobile" />
        <meta httpEquiv="mobile-agent" content={`format=html5;url=${BASE_URL}`} />

        {/* Yandex — site verification (replace XXXX with code from webmaster.yandex.com) */}
        <meta name="yandex-verification" content="YANDEX_VERIFY_CODE" />

        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-[#f7f5f2] text-[#1a1814] font-sans antialiased min-h-screen">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
