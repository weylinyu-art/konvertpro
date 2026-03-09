"use client";
// components/ConverterWidget.tsx

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol } from "@/lib/units";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations, getCategoryLabel } from "@/lib/i18n";

// Ordered by global search volume / popularity (2025–2026)
const CATEGORY_ORDER = [
  "length", "weight", "temperature", "volume", "cooking",
  "speed", "area", "time", "data", "shoe",
  "energy", "pressure", "power", "angle", "numbase",
];

interface Props {
  defaultCategory?: string;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function ConverterWidget({ defaultCategory = "length", defaultFrom, defaultTo }: Props) {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const [catSlug, setCatSlug] = useState(defaultCategory);
  const cat = CATEGORIES[catSlug];
  const unitKeys = Object.keys(cat.units);

  const [from,     setFrom]     = useState(defaultFrom ?? unitKeys[0]);
  const [to,       setTo]       = useState(defaultTo   ?? unitKeys[1]);
  const [inputVal, setInputVal] = useState("1");

  const result = (() => {
    const n = parseFloat(inputVal);
    if (isNaN(n)) return null;
    return convert(n, from, to, catSlug);
  })();

  const fromSym = getSymbol(from, catSlug);
  const toSym   = getSymbol(to,   catSlug);

  const swap = () => { setFrom(to); setTo(from); };

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

  return (
    <div className="animate-slide-up">

      {/* Category tabs */}
      {!defaultFrom && (
        <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center mb-6">
          {orderedCats.map((c) => (
            <button key={c.slug} onClick={() => switchCat(c.slug)}
              className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-[13px] font-medium border transition-all ${
                catSlug === c.slug
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white shadow-md shadow-[#3d6b4f]/20"
                  : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
              }`}>
              <span className="text-sm">{c.icon}</span>
              <span className="hidden sm:inline">{getCategoryLabel(c.slug, t)}</span>
            </button>
          ))}

          {/* Currency */}
          <Link href="/currency"
            className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-[13px] font-medium border bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0] transition-all">
            <span className="text-sm">💱</span>
            <span className="hidden sm:inline">Currency</span>
          </Link>

          {/* AI Tools */}
          <Link href="/ai"
            className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-[13px] font-medium border bg-[#edf4f0] border-[#3d6b4f]/40 text-[#3d6b4f] hover:bg-[#3d6b4f] hover:text-white transition-all">
            <span className="text-sm">🤖</span>
            <span className="hidden sm:inline">{t.aiTools}</span>
          </Link>
        </div>
      )}

      {/* Main card */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

        {/* Card header */}
        <div className="flex items-center justify-between px-4 md:px-7 py-3 md:py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">
            {cat.icon} {cat.title}
          </span>
          {defaultFrom && (
            <Link href={`/${catSlug}`} className="font-mono text-[10px] text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              ← {getCategoryLabel(catSlug, t)}
            </Link>
          )}
        </div>

        {/* MOBILE — stacked */}
        <div className="md:hidden p-4 space-y-3">
          <div>
            <label className="block font-mono text-[10px] text-[#9a948a] tracking-widest uppercase mb-1.5">{t.from}</label>
            <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-[22px] text-[#1a1814] outline-none focus:border-[#3d6b4f] transition-all" />
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="mt-2 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
              {unitKeys.map((k) => <option key={k} value={k}>{cat.units[k].label}</option>)}
            </select>
          </div>
          <div className="flex justify-center">
            <button onClick={swap}
              className="w-10 h-10 rounded-full bg-[#f2f0ed] border border-[#e4e0da] text-[#9a948a] flex items-center justify-center hover:bg-[#3d6b4f] hover:text-white transition-all active:scale-95 text-lg">
              ↕
            </button>
          </div>
          <div>
            <label className="block font-mono text-[10px] text-[#9a948a] tracking-widest uppercase mb-1.5">{t.to}</label>
            <input type="number" readOnly value={result !== null ? formatNumber(result) : ""}
              className="w-full bg-[#edf4f0] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-[22px] text-[#3d6b4f] outline-none cursor-default" />
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="mt-2 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
              {unitKeys.map((k) => <option key={k} value={k}>{cat.units[k].label}</option>)}
            </select>
          </div>
        </div>

        {/* DESKTOP — side by side */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 p-7 items-start">
          <div>
            <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">{t.from}</label>
            <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#1a1814] outline-none focus:border-[#3d6b4f] focus:ring-2 focus:ring-[#3d6b4f]/10 transition-all" />
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none transition-all">
              {unitKeys.map((k) => <option key={k} value={k}>{cat.units[k].label}</option>)}
            </select>
          </div>
          <button onClick={swap}
            className="mt-[52px] w-11 h-11 rounded-full bg-[#f2f0ed] border border-[#e4e0da] text-[#9a948a] text-lg flex items-center justify-center hover:bg-[#3d6b4f] hover:border-[#3d6b4f] hover:text-white transition-all hover:rotate-180 duration-300 flex-shrink-0"
            title={t.swap}>
            ⇄
          </button>
          <div>
            <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">{t.to}</label>
            <input type="number" readOnly value={result !== null ? formatNumber(result) : ""}
              className="w-full bg-[#edf4f0] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#3d6b4f] outline-none cursor-default transition-all" />
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none transition-all">
              {unitKeys.map((k) => <option key={k} value={k}>{cat.units[k].label}</option>)}
            </select>
          </div>
        </div>

        {/* Result bar */}
        <div className="bg-[#f0ede8] border-t border-[#e4e0da] px-4 md:px-7 py-4 md:py-6">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2 md:mb-3">{t.result}</p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-sans text-[clamp(30px,6vw,52px)] font-bold text-[#3d6b4f] leading-none tracking-tight">
              {result !== null ? formatNumber(result) : "—"}
            </span>
            <span className="font-mono text-lg text-[#9a948a]">{toSym}</span>
          </div>
          {result !== null && (
            <p className="font-mono text-xs text-[#9a948a] mt-3 bg-white border border-[#e4e0da] inline-block px-3 py-1.5 rounded-lg">
              {inputVal} {fromSym} = {formatNumber(result)} {toSym}
            </p>
          )}
        </div>
      </div>

      {/* Popular conversions */}
      {cat.popular.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">
            // {t.popularConversions}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cat.popular.map((p) => {
              const r  = convert(p.val, p.from, p.to, catSlug);
              const fs = getSymbol(p.from, catSlug);
              const ts = getSymbol(p.to,   catSlug);
              return (
                <button key={`${p.from}-${p.to}`}
                  onClick={() => { setFrom(p.from); setTo(p.to); setInputVal(String(p.val)); }}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-4 text-left hover:border-[#3d6b4f] hover:bg-[#edf4f0] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md">
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
