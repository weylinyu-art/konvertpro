"use client";
// components/ConverterWidget.tsx — Mobile-first + i18n

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, convert, formatNumber, getSymbol } from "@/lib/units";
import { getTranslations, getCategoryLabel, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/LocaleSwitcher";

const CATEGORY_DEFAULTS: Record<string, { from: string; to: string; val: string }> = {
  length:      { from: "mile",        to: "kilometer",  val: "1"   },
  weight:      { from: "pound",       to: "kilogram",   val: "150" },
  temperature: { from: "fahrenheit",  to: "celsius",    val: "72"  },
  volume:      { from: "gallon_us",   to: "liter",      val: "1"   },
  speed:       { from: "mph",         to: "kph",        val: "60"  },
  area:        { from: "acre",        to: "sq_meter",   val: "1"   },
  data:        { from: "gigabyte",    to: "megabyte",   val: "1"   },
  time:        { from: "hour",        to: "minute",     val: "1"   },
  energy:      { from: "kilocalorie", to: "kilojoule",  val: "100" },
  pressure:    { from: "psi",         to: "bar",        val: "1"   },
  angle:       { from: "degree",      to: "radian",     val: "180" },
  power:       { from: "horsepower",  to: "kilowatt",   val: "1"   },
};

interface Props {
  defaultCategory?: string;
  defaultFrom?: string;
  defaultTo?: string;
  locale?: Locale;
}

export default function ConverterWidget({ defaultCategory = "length", defaultFrom, defaultTo, locale: localeProp }: Props) {
  const { locale: hookLocale } = useLocale();
  const locale = localeProp ?? hookLocale;
  const t = getTranslations(locale);

  const [catSlug, setCatSlug] = useState(defaultCategory);
  const cat = CATEGORIES[catSlug];
  const defaults = CATEGORY_DEFAULTS[catSlug] ?? { from: Object.keys(cat.units)[0], to: Object.keys(cat.units)[1], val: "1" };

  const [from,     setFrom]     = useState(defaultFrom ?? defaults.from);
  const [to,       setTo]       = useState(defaultTo   ?? defaults.to);
  const [inputVal, setInputVal] = useState(defaultFrom ? "1" : defaults.val);

  const unitKeys = Object.keys(cat.units);
  const result = (() => { const n = parseFloat(inputVal); return isNaN(n) ? null : convert(n, from, to, catSlug); })();
  const fromSym = getSymbol(from, catSlug);
  const toSym   = getSymbol(to,   catSlug);
  const swap    = () => { setFrom(to); setTo(from); };

  const switchCat = (slug: string) => {
    setCatSlug(slug);
    const d = CATEGORY_DEFAULTS[slug] ?? { from: Object.keys(CATEGORIES[slug].units)[0], to: Object.keys(CATEGORIES[slug].units)[1], val: "1" };
    setFrom(d.from); setTo(d.to); setInputVal(d.val);
  };

  return (
    <div className="animate-slide-up">

      {/* Category tabs — homepage only */}
      {!defaultFrom && (
        <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center mb-5 md:mb-6">
          {Object.values(CATEGORIES).map((c) => (
            <button key={c.slug} onClick={() => switchCat(c.slug)}
              className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-[13px] font-medium border transition-all ${
                catSlug === c.slug
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white shadow-md"
                  : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
              }`}
            >
              <span className="text-sm">{c.icon}</span>
              <span className="hidden sm:inline">{getCategoryLabel(c.slug, t)}</span>
            </button>
          ))}
          <Link href="/ai"
            className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-[13px] font-medium border bg-[#edf4f0] border-[#3d6b4f]/40 text-[#3d6b4f] hover:bg-[#3d6b4f] hover:text-white transition-all"
          >
            🤖 <span className="hidden sm:inline">{t.aiTools}</span>
          </Link>
        </div>
      )}

      {/* Main card */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

        {/* Card header */}
        <div className="flex items-center justify-between px-4 md:px-7 py-3 md:py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">{cat.title}</span>
          {defaultFrom && (
            <Link href={`/${defaultCategory}`}
              className="font-mono text-[10px] text-[#9a948a] hover:text-[#3d6b4f] transition-colors flex items-center gap-1">
              ← {getCategoryLabel(defaultCategory, t)}
            </Link>
          )}
        </div>

        {/* MOBILE layout — stacked */}
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

        {/* DESKTOP layout — side by side */}
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
            className="mt-[52px] w-11 h-11 rounded-full bg-[#f2f0ed] border border-[#e4e0da] text-[#9a948a] text-lg flex items-center justify-center hover:bg-[#3d6b4f] hover:border-[#3d6b4f] hover:text-white transition-all hover:rotate-180 duration-300 flex-shrink-0">
            ⇄
          </button>
          <div>
            <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">{t.to}</label>
            <input type="number" readOnly value={result !== null ? formatNumber(result) : ""}
              className="w-full bg-[#edf4f0] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#3d6b4f] outline-none cursor-default" />
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none transition-all">
              {unitKeys.map((k) => <option key={k} value={k}>{cat.units[k].label}</option>)}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-[#f0ede8] border-t border-[#e4e0da] px-4 md:px-7 py-4 md:py-6">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2">{t.result}</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-serif text-[clamp(30px,8vw,52px)] text-[#3d6b4f] leading-none tracking-tight">
              {result !== null ? formatNumber(result) : "—"}
            </span>
            <span className="font-mono text-base md:text-lg text-[#9a948a]">{toSym}</span>
          </div>
          {result !== null && (
            <p className="font-mono text-xs text-[#9a948a] mt-2 bg-white border border-[#e4e0da] inline-block px-3 py-1.5 rounded-lg">
              {inputVal} {fromSym} = {formatNumber(result)} {toSym}
            </p>
          )}
        </div>
      </div>

      {/* Popular conversions */}
      {cat.popular.length > 0 && (
        <div className="mt-6 md:mt-8">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
            // {t.popularConversions}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {cat.popular.map((p) => {
              const r = convert(p.val, p.from, p.to, catSlug);
              const fs = getSymbol(p.from, catSlug);
              const ts = getSymbol(p.to, catSlug);
              return (
                <button key={`${p.from}-${p.to}`}
                  onClick={() => { setFrom(p.from); setTo(p.to); setInputVal(String(p.val)); }}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-3 md:p-4 text-left hover:border-[#3d6b4f] hover:bg-[#edf4f0] active:scale-95 transition-all shadow-sm">
                  <p className="font-mono text-xs text-[#1a1814]">{p.val} {fs} →</p>
                  <p className="text-xs text-[#9a948a] mt-0.5 group-hover:text-[#3d6b4f] truncate">{formatNumber(r)} {ts}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
