"use client";
// components/ConverterWidget.tsx

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol } from "@/lib/units";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel, getCategoryTitle, getUnitLabel } from "@/lib/i18n";

// Ordered by global search volume / popularity (2025–2026)
const CATEGORY_ORDER = [
  "length", "weight", "temperature", "volume", "speed",
  "area", "time", "data", "cooking", "energy",
  "pressure", "power", "fuel", "angle", "shoe", "numbase",
];

// 首页优先展示高频类别
const PRIMARY_CATEGORIES = ["length", "weight", "temperature", "volume", "speed", "area"];

interface Props {
  defaultCategory?: string;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function ConverterWidget({ defaultCategory = "length", defaultFrom, defaultTo }: Props) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const uiText = {
    en: { copy: "Copy", copied: "Copied", resultHint: "Result shown below", invalid: "Please enter a valid number" },
    zh: { copy: "复制", copied: "已复制", resultHint: "结果在下方显示", invalid: "请输入有效数字" },
    es: { copy: "Copiar", copied: "Listo", resultHint: "Resultado abajo", invalid: "Ingresa un numero valido" },
    fr: { copy: "Copier", copied: "OK", resultHint: "Resultat ci-dessous", invalid: "Saisissez un nombre valide" },
    ru: { copy: "Копировать", copied: "Готово", resultHint: "Результат ниже", invalid: "Введите корректное число" },
    ar: { copy: "نسخ", copied: "تم", resultHint: "النتيجة بالأسفل", invalid: "أدخل رقمًا صحيحًا" },
  }[locale];

  const [catSlug, setCatSlug] = useState(defaultCategory);
  const cat = CATEGORIES[catSlug];
  const unitKeys = Object.keys(cat.units);

  const [from,     setFrom]     = useState(defaultFrom ?? unitKeys[0]);
  const [to,       setTo]       = useState(defaultTo   ?? unitKeys[1]);
  const [inputVal, setInputVal] = useState("1");
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputNum = parseFloat(inputVal);
  const hasValidInput = !isNaN(inputNum);
  const result = hasValidInput ? convert(inputNum, from, to, catSlug) : null;

  const fromSym = getSymbol(from, catSlug);
  const toSym   = getSymbol(to,   catSlug);

  const swap = () => { setFrom(to); setTo(from); };
  const copyResult = async () => {
    if (!hasValidInput || result === null) return;
    const text = `${inputVal} ${fromSym} = ${formatNumber(result)} ${toSym}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const switchCat = (slug: string) => {
    setCatSlug(slug);
    const keys = Object.keys(CATEGORIES[slug].units);
    setFrom(keys[0]);
    setTo(keys[1]);
    setInputVal("1");
  };

  const orderedCats = [
    ...CATEGORY_ORDER.filter((s) => CATEGORIES[s]).map((s) => CATEGORIES[s]),
    ...Object.values(CATEGORIES).filter((c) => !CATEGORY_ORDER.includes(c.slug)),
  ];
  const primaryCats = orderedCats.filter((c) => PRIMARY_CATEGORIES.includes(c.slug));
  const moreCats = orderedCats.filter((c) => !PRIMARY_CATEGORIES.includes(c.slug));

  // 当选中的类别在「更多」中时，自动展开
  useEffect(() => {
    if (moreCats.some((c) => c.slug === catSlug)) setMoreExpanded(true);
  }, [catSlug]);

  return (
    <div className="animate-slide-up">

      {/* Category tabs */}
      {!defaultFrom && (
        <>
          {/* 单行 flex-wrap：主类 + Currency + AI Tools + 展开项紧随其后 + More 按钮 */}
          <div className="flex gap-1.5 md:gap-2 flex-wrap justify-start mb-6">
            {primaryCats.map((c) => (
              <button key={c.slug} onClick={() => switchCat(c.slug)}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-[13px] font-medium border transition-all ${
                  catSlug === c.slug
                    ? "bg-[#3d6b4f] border-[#3d6b4f] text-white "
                    : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
                }`}>
                <span className="text-sm shrink-0">{c.icon}</span>
                <span>{getCategoryLabel(c.slug, t)}</span>
              </button>
            ))}
            <Link href="/currency"
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-[13px] font-medium border bg-white border-[#e8e4df] text-[#6a6460] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#f8f7f5] transition-colors">
              <span className="text-sm shrink-0">💱</span>
              <span>{t.currency}</span>
            </Link>
            <Link href="/ai"
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-[13px] font-medium border bg-[#f5f8f6] border-[#3d6b4f]/30 text-[#3d6b4f] hover:bg-[#3d6b4f] hover:text-white hover:border-[#3d6b4f] transition-colors">
              <span className="text-sm shrink-0">🤖</span>
              <span>{t.aiTools}</span>
            </Link>
            {moreExpanded && moreCats.map((c) => (
              <button key={c.slug} onClick={() => switchCat(c.slug)}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-[13px] font-medium border transition-all ${
                  catSlug === c.slug
                    ? "bg-[#3d6b4f] border-[#3d6b4f] text-white "
                    : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
                }`}>
                <span className="text-sm shrink-0">{c.icon}</span>
                <span>{getCategoryLabel(c.slug, t)}</span>
              </button>
            ))}
            <button onClick={() => setMoreExpanded(!moreExpanded)}
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-[13px] font-medium border border-[#e8e4df] bg-[#f8f7f5] text-[#6a6460] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-colors">
              {moreExpanded ? t.showLess : t.moreCategories}
            </button>
          </div>
        </>
      )}

      {/* Main card — substantial layout, at least as weighty as ArticleMiniConverter */}
      <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[#e8e4df]">
          <span className={`font-mono text-[11px] text-[#9a948a] tracking-wider ${locale === "zh" ? "" : "uppercase"}`}>
            {cat.icon} {getCategoryTitle(catSlug, locale)}
          </span>
          {defaultFrom && (
            <Link href={`/${catSlug}`} className="font-mono text-[11px] text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              ← {getCategoryLabel(catSlug, t)}
            </Link>
          )}
        </div>

        {/* MOBILE — stacked with clear sections */}
        <div className="md:hidden p-4 space-y-3">
          <div>
            <label className="block text-xs text-[#7c756c] mb-1.5">{t.from}</label>
            <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              className="w-full h-12 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 font-mono text-[20px] text-[#1a1814] outline-none focus:border-[#3d6b4f]/50 focus:ring-2 focus:ring-[#3d6b4f]/10" />
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="mt-2 w-full h-11 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
              {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
            </select>
          </div>
          <div className="flex justify-center">
            <button onClick={swap}
              className="w-11 h-11 rounded-xl bg-[#f0eeeb] border border-[#e4e0da] text-[#6f6a61] flex items-center justify-center hover:bg-[#3d6b4f] hover:text-white hover:border-[#3d6b4f] transition-colors active:scale-95"
              title={t.swap}>
              ⇄
            </button>
          </div>
          <div>
            <label className="block text-xs text-[#7c756c] mb-1.5">{t.to}</label>
            <input readOnly value={result !== null ? formatNumber(result) : ""}
              className="w-full h-12 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 font-mono text-[20px] text-[#3d6b4f] font-semibold outline-none" />
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="mt-2 w-full h-11 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
              {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
            </select>
          </div>
        </div>

        {/* DESKTOP — 3-column layout like ArticleMiniConverter */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 p-6 items-start">
          <div>
            <label className="block text-xs text-[#7c756c] mb-2">{t.from}</label>
            <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              className="w-full h-12 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 font-mono text-[24px] text-[#1a1814] outline-none focus:border-[#3d6b4f]/50 focus:ring-2 focus:ring-[#3d6b4f]/10" />
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="mt-2.5 w-full h-11 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
              {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
            </select>
          </div>
          <button onClick={swap}
            className="mt-[52px] w-12 h-12 rounded-xl bg-[#f0eeeb] border border-[#e4e0da] text-[#6f6a61] flex items-center justify-center hover:bg-[#3d6b4f] hover:text-white hover:border-[#3d6b4f] transition-colors shrink-0"
            title={t.swap}>
            ⇄
          </button>
          <div>
            <label className="block text-xs text-[#7c756c] mb-2">{t.to}</label>
            <input readOnly value={result !== null ? formatNumber(result) : ""}
              className="w-full h-12 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 font-mono text-[24px] text-[#3d6b4f] font-semibold outline-none" />
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="mt-2.5 w-full h-11 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-4 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
              {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
            </select>
          </div>
        </div>

        {/* Result bar — adds visual weight, more prominent than ArticleMiniConverter */}
        <div className="border-t border-[#e8e4df] bg-[#f7f5f2] px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="font-mono text-[10px] text-[#9a948a] tracking-wider uppercase">{t.result}</p>
            <button
              onClick={copyResult}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#e4e0da] text-[#6f6a61] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-colors"
            >
              {copied ? uiText.copied : uiText.copy}
            </button>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-sans text-[clamp(28px,5vw,44px)] font-bold text-[#3d6b4f] leading-none tracking-tight">
              {result !== null ? formatNumber(result) : "—"}
            </span>
            <span className="font-mono text-base text-[#9a948a]">{toSym}</span>
          </div>
          {result !== null ? (
            <p className="font-mono text-xs text-[#9a948a] mt-2.5 bg-white/80 border border-[#e4e0da] inline-block px-3 py-1.5 rounded-lg">
              {inputVal} {fromSym} = {formatNumber(result)} {toSym}
            </p>
          ) : (
            <p className="text-xs text-[#9a948a] mt-2.5">{uiText.invalid}</p>
          )}
        </div>
      </div>

      {/* Popular conversions — card style for more weight */}
      {cat.popular.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-[10px] text-[#9a948a] tracking-wider uppercase mb-4">{t.popularConversions}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cat.popular.map((p) => {
              const r  = convert(p.val, p.from, p.to, catSlug);
              const fs = getSymbol(p.from, catSlug);
              const ts = getSymbol(p.to,   catSlug);
              return (
                <button key={`${p.from}-${p.to}`}
                  onClick={() => { setFrom(p.from); setTo(p.to); setInputVal(String(p.val)); }}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-4 text-left hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all hover:border-[#3d6b4f]/60 transition-colors">
                  <p className="font-mono text-sm text-[#1a1814]">{p.val} {fs} →</p>
                  <p className="text-xs text-[#9a948a] mt-0.5 group-hover:text-[#3d6b4f]">{formatNumber(r)} {ts}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
