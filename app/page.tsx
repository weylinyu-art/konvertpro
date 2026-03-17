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
  { href: "/length/mile-to-kilometer", en: "Miles to Kilometers", zh: "英里转公里", es: "Millas a kilómetros", fr: "Miles en kilomètres", ru: "Мили в километры", ar: "أميال إلى كيلومترات" },
  { href: "/length/foot-to-meter", en: "Feet to Meters", zh: "英尺转米", es: "Pies a metros", fr: "Pieds en mètres", ru: "Футы в метры", ar: "قدم إلى متر" },
  { href: "/weight/pound-to-kilogram", en: "Pounds to Kilograms", zh: "磅转千克", es: "Libras a kilogramos", fr: "Livres en kilogrammes", ru: "Фунты в килограммы", ar: "رطل إلى كيلوغرام" },
  { href: "/temperature/fahrenheit-to-celsius", en: "Fahrenheit to Celsius", zh: "华氏度转摄氏度", es: "Fahrenheit a Celsius", fr: "Fahrenheit en Celsius", ru: "Фаренгейт в Цельсий", ar: "فهرنهايت إلى مئوية" },
  { href: "/volume/gallon-us-to-liter", en: "US Gallons to Liters", zh: "美制加仑转升", es: "Galones US a litros", fr: "Gallons US en litres", ru: "Галлоны США в литры", ar: "غالون أمريكي إلى لتر" },
  { href: "/speed/mph-to-kph", en: "MPH to KM/H", zh: "英里/时转千米/时", es: "MPH a KM/H", fr: "MPH en KM/H", ru: "Миль/ч в км/ч", ar: "ميل/س إلى كم/س" },
  { href: "/currency", en: "Currency Converter", zh: "货币汇率换算", es: "Conversor de divisas", fr: "Convertisseur de devises", ru: "Конвертер валют", ar: "محول العملات" },
  { href: "/ai/token-calculator", en: "AI Token Calculator", zh: "AI Token 计算器", es: "Calculadora de tokens IA", fr: "Calculateur de tokens IA", ru: "Калькулятор токенов AI", ar: "حاسبة رموز الذكاء الاصطناعي" },
];

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const [mobileAllExpanded, setMobileAllExpanded] = useState(false);
  const localeText = <T,>(m: { en: T; zh: T; es: T; fr: T; ru: T; ar: T }) => m[locale];

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];

  const seoText = {
    introTitle: localeText({
      en: "Why Use Koverts",
      zh: "为什么选择 Koverts",
      es: "Por qué usar Koverts",
      fr: "Pourquoi utiliser Koverts",
      ru: "Почему выбирают Koverts",
      ar: "لماذا تستخدم Koverts",
    }),
    introBody: localeText({
      en: "Koverts is a fast online unit converter covering length, weight, temperature, volume, speed, area, data, time, pressure, angle, fuel efficiency, shoe size, and more.",
      zh: "Koverts 是一个可直接使用的在线换算工具，覆盖长度、重量、温度、体积、速度、面积、数据、时间、压强、角度、油耗、鞋码等多个场景。",
      es: "Koverts es un conversor online rápido que cubre longitud, peso, temperatura, volumen, velocidad, área, datos, tiempo, presión, ángulo y más.",
      fr: "Koverts est un convertisseur en ligne rapide couvrant longueur, poids, température, volume, vitesse, surface, données, temps, pression, angle et plus.",
      ru: "Koverts — быстрый онлайн-конвертер единиц: длина, вес, температура, объем, скорость, площадь, данные, время, давление, углы и другое.",
      ar: "Koverts أداة تحويل وحدات سريعة عبر الإنترنت تشمل الطول والوزن والحرارة والحجم والسرعة والمساحة والبيانات والوقت والضغط والزوايا وغيرها.",
    }),
    introBody2: localeText({
      en: "Use the popular links below for high-frequency queries. All results are instant and no signup is required.",
      zh: "如果你需要高频查询（如英里转公里、磅转千克、华氏度转摄氏度、美元汇率换算），可以直接使用下方热门入口。所有结果均实时计算，无需下载和注册。",
      es: "Para consultas frecuentes, usa los accesos rápidos de abajo. Los resultados son instantáneos y no requieren registro.",
      fr: "Pour les recherches fréquentes, utilisez les raccourcis ci-dessous. Résultats instantanés, sans inscription.",
      ru: "Для частых запросов используйте быстрые ссылки ниже. Результаты мгновенные и без регистрации.",
      ar: "للاستعلامات المتكررة استخدم الروابط الشائعة أدناه. النتائج فورية ولا يلزم التسجيل.",
    }),
    guidesTitle: localeText({
      en: "Popular Conversion Guides",
      zh: "热门换算入口",
      es: "Guías de conversión populares",
      fr: "Guides de conversion populaires",
      ru: "Популярные конвертации",
      ar: "أدلة التحويل الشائعة",
    }),
    faqTitle: localeText({
      en: "FAQ",
      zh: "常见问题",
      es: "Preguntas frecuentes",
      fr: "FAQ",
      ru: "Частые вопросы",
      ar: "الأسئلة الشائعة",
    }),
    faq: [
      {
        q: localeText({
          en: "What units can I convert on Koverts?",
          zh: "Koverts 支持哪些单位换算？",
          es: "¿Qué unidades puedo convertir en Koverts?",
          fr: "Quelles unités puis-je convertir sur Koverts ?",
          ru: "Какие единицы можно конвертировать в Koverts?",
          ar: "ما الوحدات التي يمكن تحويلها في Koverts؟",
        }),
        a: localeText({
          en: "You can convert across length, weight, temperature, volume, speed, area, data, time, energy, pressure, angle, power, fuel, cooking, shoe size, and number base.",
          zh: "支持长度、重量、温度、体积、速度、面积、数据、时间、能量、压强、角度、功率、油耗、烹饪、鞋码与进制转换等常见场景。",
          es: "Puedes convertir longitud, peso, temperatura, volumen, velocidad, área, datos, tiempo, energía, presión, ángulo, potencia, combustible, cocina, talla y base numérica.",
          fr: "Vous pouvez convertir longueur, poids, température, volume, vitesse, surface, données, temps, énergie, pression, angle, puissance, carburant, cuisine, pointure et base numérique.",
          ru: "Поддерживаются длина, вес, температура, объем, скорость, площадь, данные, время, энергия, давление, углы, мощность, топливо, кулинария, размеры обуви и системы счисления.",
          ar: "يمكنك تحويل الطول والوزن والحرارة والحجم والسرعة والمساحة والبيانات والوقت والطاقة والضغط والزوايا والقدرة والوقود والطبخ ومقاسات الأحذية وأنظمة الأعداد.",
        }),
      },
      {
        q: localeText({
          en: "Are the conversion results instant?",
          zh: "换算结果是否实时？",
          es: "¿Los resultados son instantáneos?",
          fr: "Les résultats sont-ils instantanés ?",
          ru: "Результаты конвертации мгновенные?",
          ar: "هل نتائج التحويل فورية؟",
        }),
        a: localeText({
          en: "Yes. Results are calculated instantly after entering a value and selecting source and target units.",
          zh: "是。输入数值并选择单位后会立即计算结果，适合移动端和桌面端快速查询。",
          es: "Sí. El resultado se calcula al instante al ingresar el valor y elegir las unidades.",
          fr: "Oui. Le résultat est calculé immédiatement après la saisie et le choix des unités.",
          ru: "Да. Результат рассчитывается сразу после ввода значения и выбора единиц.",
          ar: "نعم. يتم حساب النتيجة فور إدخال القيمة واختيار الوحدات.",
        }),
      },
      {
        q: localeText({
          en: "Do I need to create an account?",
          zh: "是否需要注册才能使用？",
          es: "¿Necesito crear una cuenta?",
          fr: "Faut-il créer un compte ?",
          ru: "Нужно ли создавать аккаунт?",
          ar: "هل أحتاج إلى إنشاء حساب؟",
        }),
        a: localeText({
          en: "No. Koverts is free to use with no signup required.",
          zh: "不需要。Koverts 可直接免费使用，适合日常学习、工作和跨单位协作。",
          es: "No. Koverts es gratuito y no requiere registro.",
          fr: "Non. Koverts est gratuit et sans inscription.",
          ru: "Нет. Koverts бесплатен и не требует регистрации.",
          ar: "لا. Koverts مجاني ولا يتطلب تسجيلًا.",
        }),
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
    name: localeText({
      en: "Koverts Unit Converter",
      zh: "Koverts 单位换算器",
      es: "Conversor de unidades Koverts",
      fr: "Convertisseur d'unités Koverts",
      ru: "Конвертер единиц Koverts",
      ar: "محول الوحدات Koverts",
    }),
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
    name: seoText.guidesTitle,
    itemListElement: HOME_POPULAR_LINKS.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: localeText({ en: item.en, zh: item.zh, es: item.es, fr: item.fr, ru: item.ru, ar: item.ar }),
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
                {localeText({ en: item.en, zh: item.zh, es: item.es, fr: item.fr, ru: item.ru, ar: item.ar })}
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
              <p className="text-xs text-[#9a948a] mt-1">49 {t.units} · {localeText({ en: "live", zh: "实时", es: "en vivo", fr: "en direct", ru: "онлайн", ar: "مباشر" })}</p>
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
              <p className="text-xs text-[#3d6b4f]/60 group-hover:text-white/70 mt-1">5 {localeText({ en: "tools", zh: "工具", es: "herramientas", fr: "outils", ru: "инструментов", ar: "أدوات" })}</p>
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
            <Link href="/compare" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {localeText({ en: "Compare", zh: "对比", es: "Comparar", fr: "Comparer", ru: "Сравнить", ar: "مقارنة" })}
            </Link>
            <Link href="/faq" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {localeText({ en: "FAQ", zh: "常见问题", es: "FAQ", fr: "FAQ", ru: "FAQ", ar: "الأسئلة الشائعة" })}
            </Link>
            <Link href="/conversion-tips" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              {localeText({ en: "Tips", zh: "小常识", es: "Consejos", fr: "Astuces", ru: "Советы", ar: "نصائح" })}
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
