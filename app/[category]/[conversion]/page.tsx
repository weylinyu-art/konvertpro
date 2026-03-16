// app/[category]/[conversion]/page.tsx
// Supports: /length/miles-to-kilometers  AND  /length/100-miles-to-kilometers
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES, convert, formatNumber, getSymbol,
  slugToUnit, unitToSlug, getAllConversionPaths,
} from "@/lib/units";
import { NUMERIC_INDEX_PAIRS, NUMERIC_INDEX_VALUES, isWhitelistedNumericPage } from "@/lib/indexing";
import ConverterWidget from "@/components/ConverterWidget";
import { FAQHeading, HowToHeading, ConversionTableHeading, RelatedHeading } from "@/components/PageLabels";
import { CategoryLabelText, LocaleText, UnitLabelText } from "@/components/LocaleText";
import { buildPageAlternates } from "@/lib/seo";

const BASE_URL = "https://koverts.com";
const SUPPORTED_LANGUAGES = ["en", "zh-Hans", "es", "fr", "ru", "ar"];

interface Props {
  params: { category: string; conversion: string };
}

// Parse "/100-miles-to-kilometers" OR "/miles-to-kilometers"
function parseConversion(conversion: string): { from: string; to: string; prefixValue: number | null } | null {
  const idx = conversion.lastIndexOf("-to-");
  if (idx === -1) return null;
  const fromRaw = conversion.slice(0, idx);
  const toSlug  = conversion.slice(idx + 4);
  // Check if fromRaw starts with a number: "100-miles" → value=100, unit="miles"
  const numMatch = fromRaw.match(/^(\d+(?:\.\d+)?)-(.+)$/);
  if (numMatch) {
    return {
      from: slugToUnit(numMatch[2]),
      to:   slugToUnit(toSlug),
      prefixValue: parseFloat(numMatch[1]),
    };
  }
  return { from: slugToUnit(fromRaw), to: slugToUnit(toSlug), prefixValue: null };
}

export async function generateStaticParams() {
  const base = getAllConversionPaths();
  // Generate only high-value numeric variants to avoid thin-page bloat
  const numeric = NUMERIC_INDEX_PAIRS.flatMap(({ category, from, to }) =>
    NUMERIC_INDEX_VALUES.map((v) => ({
      category,
      conversion: `${v}-${unitToSlug(from)}-to-${unitToSlug(to)}`,
    }))
  );
  return [...base, ...numeric];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat    = CATEGORIES[params.category];
  const parsed = parseConversion(params.conversion);
  if (!cat || !parsed) return {};
  const { from, to, prefixValue } = parsed;
  if (!cat.units[from] || !cat.units[to]) return {};
  const fromLabel = cat.units[from].label;
  const toLabel   = cat.units[to].label;
  const fromSym   = getSymbol(from, params.category);
  const toSym     = getSymbol(to,   params.category);
  const pageUrl   = `${BASE_URL}/${params.category}/${params.conversion}`;
  const baseCanonicalUrl = `${BASE_URL}/${params.category}/${unitToSlug(from)}-to-${unitToSlug(to)}`;

  if (prefixValue !== null) {
    // Numeric page: "100 miles to kilometers"
    const result = convert(prefixValue, from, to, params.category);
    const resultStr = formatNumber(result);
    const allowIndex = isWhitelistedNumericPage(params.category, from, to, prefixValue);
    return {
      title: `${prefixValue} ${fromLabel} to ${toLabel} — ${resultStr} ${toSym}`,
      description: `${prefixValue} ${fromSym} = ${resultStr} ${toSym}. Instantly convert ${fromLabel} to ${toLabel} with our free online converter. No signup required.`,
      keywords: [
        `${prefixValue} ${fromLabel} to ${toLabel}`,
        `${prefixValue} ${fromSym} to ${toSym}`,
        `${prefixValue} ${fromSym} in ${toSym}`,
        `how many ${toSym} is ${prefixValue} ${fromSym}`,
      ],
      alternates: buildPageAlternates(
        allowIndex
          ? `/${params.category}/${params.conversion}`
          : `/${params.category}/${unitToSlug(from)}-to-${unitToSlug(to)}`
      ),
      robots: {
        index: allowIndex,
        follow: true,
      },
      openGraph: {
        title: `${prefixValue} ${fromLabel} = ${resultStr} ${toLabel}`,
        description: `${prefixValue} ${fromSym} = ${resultStr} ${toSym}. Free instant converter.`,
        url: pageUrl, type: "website",
        images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `${prefixValue} ${fromLabel} to ${toLabel}` }],
      },
    };
  }

  const oneResult = formatNumber(convert(1, from, to, params.category));
  return {
    title: `${fromLabel} to ${toLabel} Converter — Free & Instant`,
    description: `Convert ${fromLabel} to ${toLabel} instantly. 1 ${fromSym} = ${oneResult} ${toSym}. Free online ${cat.label.toLowerCase()} converter, no signup needed.`,
    keywords: [
      `${fromLabel} to ${toLabel}`,
      `convert ${fromSym} to ${toSym}`,
      `${fromSym} to ${toSym} converter`,
      `${fromLabel} ${toLabel} conversion`,
      `how many ${toSym} in ${fromSym}`,
    ],
    alternates: buildPageAlternates(`/${params.category}/${params.conversion}`),
    openGraph: {
      title: `${fromLabel} to ${toLabel} Converter`,
      description: `1 ${fromSym} = ${oneResult} ${toSym}. Free instant converter.`,
      url: pageUrl, type: "website",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `${fromLabel} to ${toLabel} converter` }],
    },
  };
}

const REFERENCE_VALUES = [1, 2, 5, 10, 20, 25, 50, 100, 250, 500, 1000];

export default function ConversionPage({ params }: Props) {
  const cat    = CATEGORIES[params.category];
  const parsed = parseConversion(params.conversion);
  if (!cat || !parsed) notFound();

  const { from, to, prefixValue } = parsed;
  if (!cat.units[from] || !cat.units[to]) notFound();

  const fromLabel  = cat.units[from].label;
  const toLabel    = cat.units[to].label;
  const fromSym    = getSymbol(from, params.category);
  const toSym      = getSymbol(to,   params.category);
  const oneResult  = convert(1, from, to, params.category);
  const pageUrl    = `${BASE_URL}/${params.category}/${params.conversion}`;
  const baseConversionUrl = `${BASE_URL}/${params.category}/${unitToSlug(from)}-to-${unitToSlug(to)}`;

  // For numeric pages, highlight the specific result
  const highlightValue  = prefixValue ?? 1;
  const highlightResult = convert(highlightValue, from, to, params.category);

  const related = Object.keys(cat.units)
    .filter((u) => u !== from && u !== to)
    .slice(0, 4)
    .map((u) => ({ unit: u, label: cat.units[u].label, sym: getSymbol(u, params.category) }));

  // ── Structured Data ──────────────────────────────────────────

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": cat.label, "item": `${BASE_URL}/${params.category}` },
      { "@type": "ListItem", "position": 3, "name": prefixValue ? `${prefixValue} ${fromLabel} to ${toLabel}` : `${fromLabel} to ${toLabel}`, "item": pageUrl },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to convert ${fromLabel} to ${toLabel}`,
    "description": `Step-by-step guide to convert ${fromLabel} (${fromSym}) to ${toLabel} (${toSym}).`,
    "totalTime": "PT10S",
    "tool": [{ "@type": "HowToTool", "name": "Koverts unit converter" }],
    "step": [
      {
        "@type": "HowToStep", "position": 1, "name": "Enter your value",
        "text": `Type the number of ${fromLabel} you want to convert in the input field.`,
        "url": baseConversionUrl,
      },
      {
        "@type": "HowToStep", "position": 2, "name": "Select units",
        "text": `Make sure the "From" field is set to ${fromLabel} and the "To" field is set to ${toLabel}.`,
        "url": baseConversionUrl,
      },
      {
        "@type": "HowToStep", "position": 3, "name": "Read the result",
        "text": `The converted value appears instantly. For example, 1 ${fromSym} = ${formatNumber(oneResult)} ${toSym}.`,
        "url": baseConversionUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": prefixValue
          ? `What is ${prefixValue} ${fromLabel} in ${toLabel}?`
          : `How many ${toLabel} are in a ${fromLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": prefixValue
            ? `${prefixValue} ${fromSym} = ${formatNumber(highlightResult)} ${toSym}. To convert ${fromLabel} to ${toLabel}, multiply by ${formatNumber(oneResult)}.`
            : `1 ${fromSym} equals ${formatNumber(oneResult)} ${toSym}. To convert ${fromLabel} to ${toLabel}, multiply your value by ${formatNumber(oneResult)}.`,
        },
      },
      {
        "@type": "Question",
        "name": `How do I convert ${fromLabel} to ${toLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To convert from ${fromLabel} to ${toLabel}, use the formula: ${toSym} = ${fromSym} × ${formatNumber(oneResult)}. For example, 10 ${fromSym} = ${formatNumber(convert(10, from, to, params.category))} ${toSym}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is ${formatNumber(convert(100, from, to, params.category))} ${toSym} in ${fromLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${formatNumber(convert(100, from, to, params.category))} ${toSym} is equal to 100 ${fromSym}.`,
        },
      },
    ],
  };

  // Dataset schema for the reference table
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${fromLabel} to ${toLabel} Conversion Table`,
    "description": `Conversion values from ${fromLabel} (${fromSym}) to ${toLabel} (${toSym}). Covers ${REFERENCE_VALUES.join(", ")} ${fromSym}.`,
    "url": baseConversionUrl,
    "creator": { "@type": "Organization", "name": "Koverts", "url": BASE_URL },
    "variableMeasured": [
      { "@type": "PropertyValue", "name": fromLabel, "unitCode": fromSym },
      { "@type": "PropertyValue", "name": toLabel,   "unitCode": toSym },
    ],
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "text/html",
      "contentUrl": baseConversionUrl,
    },
    "inLanguage": SUPPORTED_LANGUAGES,
    "isAccessibleForFree": true,
  };

  const quickAnswerSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${prefixValue ?? 1} ${fromLabel} in ${toLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is the conversion formula from ${fromLabel} to ${toLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${toSym} = ${fromSym} × ${formatNumber(oneResult)}.`,
        },
      },
    ],
  };

  const unitTermsSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": `${fromLabel} and ${toLabel} definitions`,
    "url": baseConversionUrl,
    "inLanguage": "en",
    "hasDefinedTerm": [
      {
        "@type": "DefinedTerm",
        "name": fromLabel,
        "description": `${fromLabel} is a ${cat.label.toLowerCase()} unit represented as ${fromSym}.`,
      },
      {
        "@type": "DefinedTerm",
        "name": toLabel,
        "description": `${toLabel} is a ${cat.label.toLowerCase()} unit represented as ${toSym}.`,
      },
    ],
  };

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quickAnswerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(unitTermsSchema) }} />

      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
              <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
                Koverts
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <Link href={`/${params.category}`}
              className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors flex-shrink-0">
              <CategoryLabelText slug={cat.slug} fallback={cat.label} />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[80px] md:max-w-[160px]">
              {prefixValue ? `${prefixValue} ${fromSym}` : fromSym} → {toSym}
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {cat.icon} <CategoryLabelText slug={cat.slug} fallback={cat.label} /> <LocaleText en="Converter" zh="换算器" es="Conversor" fr="Convertisseur" ru="Конвертер" ar="محوّل" />
          </div>

          {prefixValue !== null ? (
            // Numeric page hero — direct answer
            <>
              <h1 className="font-sans font-bold text-[clamp(28px,5vw,52px)] tracking-tight leading-tight mb-4">
                {prefixValue} <UnitLabelText unitKey={from} fallback={fromLabel} /> <LocaleText en="to" zh="转" es="a" fr="vers" ru="в" ar="إلى" /> <UnitLabelText unitKey={to} fallback={toLabel} />
              </h1>
              <div className="inline-flex items-baseline gap-3 bg-[#edf4f0] border border-[#3d6b4f]/30 rounded-2xl px-6 py-4 mb-4">
                <span className="font-mono text-[#9a948a] text-sm">{prefixValue} {fromSym} =</span>
                <span className="font-sans font-bold text-[clamp(28px,4vw,44px)] text-[#3d6b4f] tracking-tight">
                  {formatNumber(highlightResult)}
                </span>
                <span className="font-mono text-[#3d6b4f] text-lg">{toSym}</span>
              </div>
              <p className="text-[#9a948a] text-sm leading-relaxed max-w-lg">
                <LocaleText en="Use the converter below for any value, or see the full table." zh="可在下方输入任意数值进行换算，或查看完整参考表。" es="Usa el conversor de abajo para cualquier valor o consulta la tabla completa." fr="Utilisez le convertisseur ci-dessous pour n'importe quelle valeur ou consultez le tableau complet." ru="Используйте конвертер ниже для любого значения или смотрите полную таблицу." ar="استخدم أداة التحويل أدناه لأي قيمة أو راجع الجدول الكامل." />
              </p>
            </>
          ) : (
            // Standard page hero
            <>
              <h1 className="font-sans font-bold text-[clamp(32px,5vw,56px)] tracking-tight leading-tight mb-3">
                <UnitLabelText unitKey={from} fallback={fromLabel} /> <LocaleText en="to" zh="转" es="a" fr="vers" ru="в" ar="إلى" /> <UnitLabelText unitKey={to} fallback={toLabel} />
              </h1>
              <p className="text-[#9a948a] text-sm leading-relaxed max-w-lg">
                1 {fromSym} = <strong className="text-[#3d6b4f] font-semibold">{formatNumber(oneResult)} {toSym}</strong>
                &nbsp;· Free instant converter, no signup required.
              </p>
            </>
          )}
        </section>

        {/* Direct answer block for AEO/GEO extraction */}
        <section className="mb-8 bg-[#edf4f0] border border-[#3d6b4f]/25 rounded-2xl px-5 py-4">
          <h2 className="font-sans font-semibold text-lg text-[#1a1814] mb-1"><LocaleText en="Direct Answer" zh="直接答案" es="Respuesta directa" fr="Réponse directe" ru="Прямой ответ" ar="إجابة مباشرة" /></h2>
          <p className="text-sm text-[#3d6b4f] leading-relaxed">
            {prefixValue ?? 1} {fromSym} = {formatNumber(convert(prefixValue ?? 1, from, to, params.category))} {toSym}
          </p>
          <p className="text-xs text-[#6a6460] mt-2 leading-relaxed">
            <LocaleText en="Formula" zh="公式" es="Fórmula" fr="Formule" ru="Формула" ar="الصيغة" />: {toSym} = {fromSym} × {formatNumber(oneResult)}. <LocaleText en="This page supports instant conversion, reference table checks, and related unit links." zh="本页支持即时换算、参考表核对和相关单位跳转。" es="Esta página admite conversión instantánea, tabla de referencia y enlaces relacionados." fr="Cette page propose une conversion instantanée, un tableau de référence et des liens associés." ru="На странице доступны мгновенная конвертация, проверка по таблице и связанные ссылки." ar="تدعم هذه الصفحة التحويل الفوري والتحقق عبر الجدول وروابط الوحدات ذات الصلة." />
          </p>
        </section>

        <ConverterWidget defaultCategory={params.category} defaultFrom={from} defaultTo={to} />

        {/* Reference table with Dataset schema */}
        <section className="mt-14 mb-12">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            </p>
          <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider"><UnitLabelText unitKey={from} fallback={fromLabel} /> ({fromSym})</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider"><UnitLabelText unitKey={to} fallback={toLabel} /> ({toSym})</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_VALUES.map((v) => {
                  const isHighlighted = prefixValue === v;
                  return (
                    <tr key={v} className={`border-b border-[#f0ede8] ${isHighlighted ? "bg-[#edf4f0]" : "hover:bg-[#faf8f5]"}`}>
                      <td className={`px-6 py-3 font-mono ${isHighlighted ? "text-[#3d6b4f] font-semibold" : "text-[#1a1814]"}`}>
                        {v} {fromSym}
                      </td>
                      <td className={`px-6 py-3 font-mono font-medium ${isHighlighted ? "text-[#3d6b4f] font-bold" : "text-[#3d6b4f]"}`}>
                        {formatNumber(convert(v, from, to, params.category))} {toSym}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Numeric page link shortcuts */}
          {!prefixValue && (
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 10, 100].map((v) => (
                <Link key={v}
                  href={`/${params.category}/${v}-${unitToSlug(from)}-to-${unitToSlug(to)}`}
                  className="font-mono text-xs px-3 py-1.5 bg-white border border-[#e4e0da] rounded-lg text-[#9a948a] hover:text-[#3d6b4f] hover:border-[#3d6b4f] transition-all">
                  {v} {fromSym} →
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* How to convert */}
        <section className="mb-12 bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
  <HowToHeading /> 
          <p className="font-sans font-bold text-2xl mb-4"><UnitLabelText unitKey={from} fallback={fromLabel} /> → <UnitLabelText unitKey={to} fallback={toLabel} /></p>
          <p className="text-[#9a948a] text-sm leading-relaxed mb-4">
            <LocaleText en="To convert from" zh="将" es="Para convertir de" fr="Pour convertir de" ru="Чтобы перевести из" ar="للتحويل من" /> <UnitLabelText unitKey={from} fallback={fromLabel} /> ({fromSym}) <LocaleText en="to" zh="换算为" es="a" fr="vers" ru="в" ar="إلى" /> <UnitLabelText unitKey={to} fallback={toLabel} /> ({toSym})，<LocaleText en="multiply your value by" zh="将数值乘以" es="multiplica tu valor por" fr="multipliez votre valeur par" ru="умножьте значение на" ar="اضرب القيمة في" />{" "}
            <strong className="text-[#1a1814]">{formatNumber(oneResult)}</strong>.
          </p>
          <div className="bg-[#f7f5f2] rounded-xl px-6 py-4 font-mono text-sm text-[#3d6b4f]">
            {toSym} = {fromSym} × {formatNumber(oneResult)}
          </div>
          <p className="text-[#9a948a] text-sm leading-relaxed mt-4">
            <LocaleText en="For example" zh="例如" es="Por ejemplo" fr="Par exemple" ru="Например" ar="على سبيل المثال" />，10 {fromSym} = {formatNumber(convert(10, from, to, params.category))} {toSym}.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
<FAQHeading />
          <div className="space-y-2">
            {[
              {
                enQ: `What is ${prefixValue ?? 1} ${fromSym} in ${toSym}?`,
                zhQ: `${prefixValue ?? 1} ${fromSym} 等于多少 ${toSym}？`,
                esQ: `¿Cuánto es ${prefixValue ?? 1} ${fromSym} en ${toSym}?`,
                frQ: `${prefixValue ?? 1} ${fromSym} équivaut à combien en ${toSym} ?`,
                ruQ: `Сколько будет ${prefixValue ?? 1} ${fromSym} в ${toSym}?`,
                arQ: `كم يساوي ${prefixValue ?? 1} ${fromSym} بـ ${toSym}؟`,
                enA: `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}.`,
                zhA: `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}。`,
                esA: `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}.`,
                frA: `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}.`,
                ruA: `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}.`,
                arA: `${prefixValue ?? 1} ${fromSym} = ${formatNumber(convert(prefixValue ?? 1, from, to, params.category))} ${toSym}.`,
              },
              {
                enQ: "How is the conversion calculated?",
                zhQ: "换算是如何计算的？",
                esQ: "¿Cómo se calcula la conversión?",
                frQ: "Comment la conversion est-elle calculée ?",
                ruQ: "Как рассчитывается конвертация?",
                arQ: "كيف يتم حساب التحويل؟",
                enA: `${toSym} = ${fromSym} × ${formatNumber(oneResult)}.`,
                zhA: `公式：${toSym} = ${fromSym} × ${formatNumber(oneResult)}。`,
                esA: `Fórmula: ${toSym} = ${fromSym} × ${formatNumber(oneResult)}.`,
                frA: `Formule : ${toSym} = ${fromSym} × ${formatNumber(oneResult)}.`,
                ruA: `Формула: ${toSym} = ${fromSym} × ${formatNumber(oneResult)}.`,
                arA: `الصيغة: ${toSym} = ${fromSym} × ${formatNumber(oneResult)}.`,
              },
              {
                enQ: "Can I convert other values?",
                zhQ: "还能换算其他数值吗？",
                esQ: "¿Puedo convertir otros valores?",
                frQ: "Puis-je convertir d'autres valeurs ?",
                ruQ: "Можно конвертировать другие значения?",
                arQ: "هل يمكنني تحويل قيم أخرى؟",
                enA: "Yes. Use the converter box above to enter any value and get instant results.",
                zhA: "可以。使用上方换算器输入任意数值即可即时得到结果。",
                esA: "Sí. Usa el conversor de arriba para ingresar cualquier valor y obtener resultados al instante.",
                frA: "Oui. Utilisez le convertisseur ci-dessus pour saisir n'importe quelle valeur et obtenir un résultat instantané.",
                ruA: "Да. Используйте конвертер выше, чтобы ввести любое значение и сразу получить результат.",
                arA: "نعم. استخدم أداة التحويل أعلاه لإدخال أي قيمة والحصول على النتيجة فورًا.",
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">
                    <LocaleText en={faq.enQ} zh={faq.zhQ} es={faq.esQ} fr={faq.frQ} ru={faq.ruQ} ar={faq.arQ} />
                  </span>
                  <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  <LocaleText en={faq.enA} zh={faq.zhA} es={faq.esA} fr={faq.frA} ru={faq.ruA} ar={faq.arA} />
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related conversions */}
        <section className="mb-16">
<RelatedHeading />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link key={r.unit}
                href={`/${params.category}/${unitToSlug(from)}-to-${unitToSlug(r.unit)}`}
                className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm text-center">
                <p className="font-mono text-xs text-[#9a948a] group-hover:text-[#3d6b4f]">{fromSym} → {r.sym}</p>
                <p className="text-xs text-[#1a1814] mt-1 truncate"><UnitLabelText unitKey={r.unit} fallback={r.label} /></p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href={`/${params.category}`} className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">
            ← <CategoryLabelText slug={cat.slug} fallback={cat.label} /> <LocaleText en="converters" zh="换算器" es="conversores" fr="convertisseurs" ru="конвертеры" ar="محوّلات" />
          </Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
        </footer>
      </div>
    </main>
  );
}
