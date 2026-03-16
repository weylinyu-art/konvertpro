"use client";
// app/page.tsx

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/units";
import ConverterWidget from "@/components/ConverterWidget";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel } from "@/lib/i18n";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const BASE_URL = "https://koverts.com";

// Ordered by global search volume (2025-2026)
const CATEGORY_ORDER = [
  "length", "weight", "temperature", "volume", "speed",
  "area", "time", "data", "cooking", "energy",
  "pressure", "power", "fuel", "angle", "shoe", "numbase",
];

const HOME_POPULAR_LINKS = [
  { href: "/length/mile-to-kilometer", en: "Miles to Kilometers", zh: "英里转公里" },
  { href: "/length/foot-to-meter", en: "Feet to Meters", zh: "英尺转米" },
  { href: "/weight/pound-to-kilogram", en: "Pounds to Kilograms", zh: "磅转千克" },
  { href: "/temperature/fahrenheit-to-celsius", en: "Fahrenheit to Celsius", zh: "华氏度转摄氏度" },
  { href: "/volume/gallon-us-to-liter", en: "US Gallons to Liters", zh: "美制加仑转升" },
  { href: "/speed/mph-to-kph", en: "MPH to KM/H", zh: "英里/时转千米/时" },
  { href: "/currency", en: "Currency Converter", zh: "货币汇率换算" },
  { href: "/ai/token-calculator", en: "AI Token Calculator", zh: "AI Token 计算器" },
];

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const [mobileAllExpanded, setMobileAllExpanded] = useState(false);

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];

  const seoText = locale === "zh"
    ? {
        introTitle: "为什么选择 Koverts",
        introBody:
          "Koverts 是一个可直接使用的在线换算工具，覆盖长度、重量、温度、体积、速度、面积、数据、时间、压强、角度、油耗、鞋码等多个场景。每个分类页都提供单位说明、热门换算和可复用的链接结构，方便搜索引擎抓取与用户快速跳转。",
        introBody2:
          "如果你需要高频查询（如英里转公里、磅转千克、华氏度转摄氏度、美元汇率换算），可以直接使用下方热门入口。所有结果均实时计算，无需下载和注册。",
        guidesTitle: "热门换算入口",
        faqTitle: "常见问题",
        faq: [
          {
            q: "Koverts 支持哪些单位换算？",
            a: "支持长度、重量、温度、体积、速度、面积、数据、时间、能量、压强、角度、功率、油耗、烹饪、鞋码与进制转换等常见场景。",
          },
          {
            q: "换算结果是否实时？",
            a: "是。输入数值并选择单位后会立即计算结果，适合移动端和桌面端快速查询。",
          },
          {
            q: "是否需要注册才能使用？",
            a: "不需要。Koverts 可直接免费使用，适合日常学习、工作和跨单位协作。",
          },
        ],
      }
    : {
        introTitle: "Why Use Koverts",
        introBody:
          "Koverts is a fast online unit converter covering length, weight, temperature, volume, speed, area, data, time, pressure, angle, fuel efficiency, shoe size, and more. Each category page includes useful conversion references and linkable routes for quick search access.",
        introBody2:
          "For high-frequency queries like miles to kilometers, pounds to kilograms, Fahrenheit to Celsius, or live currency conversion, use the popular links below. No signup and no installation required.",
        guidesTitle: "Popular Conversion Guides",
        faqTitle: "FAQ",
        faq: [
          {
            q: "What units can I convert on Koverts?",
            a: "You can convert across length, weight, temperature, volume, speed, area, data, time, energy, pressure, angle, power, fuel, cooking, shoe size, and number base categories.",
          },
          {
            q: "Are the conversion results instant?",
            a: "Yes. Results are calculated instantly after entering a value and selecting source and target units.",
          },
          {
            q: "Do I need to create an account?",
            a: "No. Koverts is free to use with no signup required.",
          },
        ],
      };

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoText.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: locale === "zh" ? "Koverts 单位换算器" : "Koverts Unit Converter",
    url: BASE_URL,
    inLanguage: locale === "zh" ? "zh-Hans" : locale,
    description: seoText.introBody,
    isPartOf: {
      "@type": "WebSite",
      name: "Koverts",
      url: BASE_URL,
    },
  };

  const popularLinksItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "zh" ? "热门换算入口" : "Popular Conversion Guides",
    itemListElement: HOME_POPULAR_LINKS.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: locale === "zh" ? item.zh : item.en,
      url: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(popularLinksItemListSchema) }} />
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814]">
              Koverts
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
          </div>
          {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
        </header>

        {/* Hero */}
        <section className="text-center py-14">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] animate-pulse" />
            {t.heroBadge}
          </div>
          <h1 className="font-sans font-bold text-[clamp(40px,7vw,72px)] leading-[1.05] tracking-tight mb-4">
            {t.heroTitle} <em className="italic text-[#3d6b4f]">{t.heroTitleEm}</em>
            <br />{t.heroTitleSuffix}
          </h1>
          <p className="text-[#9a948a] font-light text-base max-w-sm mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </section>

        <ConverterWidget />

        {/* Crawlable SEO content */}
        <section className="mt-14 mb-12 bg-white border border-[#e4e0da] rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-sans font-bold text-2xl md:text-3xl mb-4">{seoText.introTitle}</h2>
          <p className="text-[#6a6460] leading-relaxed text-sm md:text-base mb-3">{seoText.introBody}</p>
          <p className="text-[#6a6460] leading-relaxed text-sm md:text-base">{seoText.introBody2}</p>
        </section>

        {/* Popular SEO links */}
        <section className="mb-12">
          <h2 className="font-sans font-bold text-xl md:text-2xl mb-4">{seoText.guidesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {HOME_POPULAR_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-[#e4e0da] rounded-xl px-4 py-3 text-sm text-[#1a1814] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all shadow-sm"
              >
                {locale === "zh" ? item.zh : item.en}
              </Link>
            ))}
          </div>
        </section>

        {/* Homepage FAQ */}
        <section className="mb-14">
          <h2 className="font-sans font-bold text-xl md:text-2xl mb-4">{seoText.faqTitle}</h2>
          <div className="space-y-2">
            {seoText.faq.map((item, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">{item.q}</span>
                  <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* All categories grid */}
        <section className="mt-16 mb-20">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // {t.allConverters}
          </p>

          {/* Mobile: collapsed by default */}
          <div className="md:hidden mb-4 flex justify-center">
            <button
              onClick={() => setMobileAllExpanded((v) => !v)}
              className="px-4 py-2 rounded-full text-xs font-medium border border-[#e4e0da] bg-[#f8f6f2] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all"
            >
              {mobileAllExpanded ? t.showLess : t.moreCategories}
            </button>
          </div>

          <div className={`${mobileAllExpanded ? "grid" : "hidden"} md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3`}>

            {/* Currency - highest traffic */}
            <Link href="/currency"
              className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">💱</span>
              <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                {t.currency}
              </span>
              <p className="text-xs text-[#9a948a] mt-1">49 {t.units} · live</p>
            </Link>

            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <span className="text-2xl mb-3 block">{cat.icon}</span>
                <span className="font-semibold text-sm text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors block">
                  {getCategoryLabel(cat.slug, t)}
                </span>
                <p className="text-xs text-[#9a948a] mt-1">{Object.keys(cat.units).length} {t.units}</p>
              </Link>
            ))}

            {/* AI Tools */}
            <Link href="/ai"
              className="group bg-[#edf4f0] border border-[#3d6b4f]/30 rounded-2xl p-5 hover:border-[#3d6b4f] hover:bg-[#3d6b4f] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <span className="text-2xl mb-3 block">🤖</span>
              <span className="font-semibold text-sm text-[#3d6b4f] group-hover:text-white transition-colors block">
                {t.aiTools}
              </span>
              <p className="text-xs text-[#3d6b4f]/60 group-hover:text-white/70 mt-1">5 tools</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
          <div className="flex gap-4 flex-wrap">
            <Link href="/currency" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {t.currency}
            </Link>
            {orderedCats.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
                {getCategoryLabel(cat.slug, t)}
              </Link>
            ))}
            <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {t.aiTools}
            </Link>
            <Link href="/about" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              About
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
