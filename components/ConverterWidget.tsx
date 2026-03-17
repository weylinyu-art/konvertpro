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
                    ? "bg-[#3d6b4f] border-[#3d6b4f] text-white shadow-md shadow-[#3d6b4f]/20"
                    : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
                }`}>
                <span className="text-sm shrink-0">{c.icon}</span>
                <span>{getCategoryLabel(c.slug, t)}</span>
              </button>
            ))}
            <Link href="/currency"
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-[13px] font-medium border bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0] transition-all">
              <span className="text-sm shrink-0">💱</span>
              <span>{t.currency}</span>
            </Link>
            <Link href="/ai"
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-[13px] font-medium border bg-[#edf4f0] border-[#3d6b4f]/40 text-[#3d6b4f] hover:bg-[#3d6b4f] hover:text-white transition-all">
              <span className="text-sm shrink-0">🤖</span>
              <span>{t.aiTools}</span>
            </Link>
            {moreExpanded && moreCats.map((c) => (
              <button key={c.slug} onClick={() => switchCat(c.slug)}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-[13px] font-medium border transition-all ${
                  catSlug === c.slug
                    ? "bg-[#3d6b4f] border-[#3d6b4f] text-white shadow-md shadow-[#3d6b4f]/20"
                    : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
                }`}>
                <span className="text-sm shrink-0">{c.icon}</span>
                <span>{getCategoryLabel(c.slug, t)}</span>
              </button>
            ))}
            <button onClick={() => setMoreExpanded(!moreExpanded)}
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-[13px] font-medium border border-[#e4e0da] bg-[#f8f6f2] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-all">
              {moreExpanded ? t.showLess : t.moreCategories}
            </button>
          </div>
        </>
      )}

      {/* Main card — lightweight flat style */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#e8e4df] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Compact header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#ebe8e3]">
          <span className={`font-mono text-[10px] text-[#a39e96] tracking-wider ${locale === "zh" ? "" : "uppercase"}`}>
            {cat.icon} {getCategoryTitle(catSlug, locale)}
          </span>
          {defaultFrom && (
            <Link href={`/${catSlug}`} className="font-mono text-[10px] text-[#a39e96] hover:text-[#3d6b4f] transition-colors">
              ← {getCategoryLabel(catSlug, t)}
            </Link>
          )}
        </div>

        {/* MOBILE — compact stacked */}
        <div className="md:hidden p-3 space-y-2">
          <div>
            <label className="block text-[10px] text-[#a39e96] uppercase tracking-wider mb-1">{t.from}</label>
            <div className="flex gap-2">
              <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 min-w-0 bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-3 py-2.5 font-mono text-[18px] text-[#1a1814] outline-none focus:border-[#3d6b4f]/50 focus:ring-1 focus:ring-[#3d6b4f]/20" />
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="shrink-0 w-[120px] bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-3 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer">
                {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={swap}
              className="w-9 h-9 rounded-lg bg-[#f5f3f0] border border-[#ebe8e3] text-[#9a948a] flex items-center justify-center hover:bg-[#3d6b4f] hover:text-white hover:border-[#3d6b4f] transition-colors active:scale-95 text-sm"
              title={t.swap}>
              ⇄
            </button>
          </div>
          <div>
            <label className="block text-[10px] text-[#a39e96] uppercase tracking-wider mb-1">{t.to}</label>
            <div className="flex gap-2 items-center">
              <div className="flex-1 min-w-0 bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-3 py-2.5 font-mono text-[18px] text-[#3d6b4f] font-semibold">
                {result !== null ? formatNumber(result) : "—"}
              </div>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="shrink-0 w-[120px] bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-3 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer">
                {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
              </select>
            </div>
            {result !== null && (
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[11px] text-[#a39e96]">{inputVal} {fromSym} = {formatNumber(result)} {toSym}</span>
                <button onClick={copyResult}
                  className="text-[11px] text-[#a39e96] hover:text-[#3d6b4f] px-2 py-0.5 rounded transition-colors">
                  {copied ? uiText.copied : uiText.copy}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP — inline lightweight */}
        <div className="hidden md:block p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="sr-only">{t.from}</label>
            <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              className="w-24 bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-4 py-2.5 font-mono text-xl text-[#1a1814] outline-none focus:border-[#3d6b4f]/50 focus:ring-1 focus:ring-[#3d6b4f]/20" />
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-4 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer min-w-[140px]">
              {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
            </select>
            <button onClick={swap}
              className="w-9 h-9 rounded-lg bg-[#f5f3f0] border border-[#ebe8e3] text-[#9a948a] flex items-center justify-center hover:bg-[#3d6b4f] hover:text-white hover:border-[#3d6b4f] transition-colors shrink-0"
              title={t.swap}>
              ⇄
            </button>
            <span className="text-[#d4cfc8] text-sm">→</span>
            <div className="flex items-center gap-2 min-w-[140px]">
              <span className="font-mono text-lg font-semibold text-[#3d6b4f]">
                {result !== null ? formatNumber(result) : "—"}
              </span>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="flex-1 bg-[#faf9f7] border border-[#ebe8e3] rounded-lg px-3 py-2 text-sm font-medium text-[#1a1814] outline-none cursor-pointer min-w-0">
                {unitKeys.map((k) => <option key={k} value={k}>{getUnitLabel(k, locale)}</option>)}
              </select>
            </div>
            {result !== null && (
              <button onClick={copyResult}
                className="text-[11px] text-[#a39e96] hover:text-[#3d6b4f] px-2 py-1 rounded transition-colors shrink-0">
                {copied ? uiText.copied : uiText.copy}
              </button>
            )}
          </div>
          {result !== null && (
            <p className="text-[11px] text-[#a39e96] mt-2 ml-1">
              {inputVal} {fromSym} = {formatNumber(result)} {toSym}
            </p>
          )}
        </div>
      </div>

      {/* Popular conversions — lightweight chips */}
      {cat.popular.length > 0 && (
        <div className="mt-6">
          <p className="text-[10px] text-[#a39e96] uppercase tracking-wider mb-2">{t.popularConversions}</p>
          <div className="flex flex-wrap gap-2">
            {cat.popular.map((p) => {
              const r  = convert(p.val, p.from, p.to, catSlug);
              const fs = getSymbol(p.from, catSlug);
              const ts = getSymbol(p.to,   catSlug);
              return (
                <button key={`${p.from}-${p.to}`}
                  onClick={() => { setFrom(p.from); setTo(p.to); setInputVal(String(p.val)); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#faf9f7] border border-[#ebe8e3] text-[#6a6460] hover:border-[#3d6b4f] hover:text-[#3d6b4f] transition-colors">
                  {p.val} {fs} → {formatNumber(r)} {ts}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
