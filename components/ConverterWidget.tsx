"use client";
// components/ConverterWidget.tsx

import { useState } from "react";
import { CATEGORIES, convert, formatNumber, getSymbol } from "@/lib/units";
import Link from "next/link";

// ── Default "from/to" for each category based on most common searches ──
const CATEGORY_DEFAULTS: Record<string, { from: string; to: string; val: string }> = {
  length:      { from: "mile",       to: "kilometer",  val: "1"   },
  weight:      { from: "pound",      to: "kilogram",   val: "150" },  // typical body weight
  temperature: { from: "fahrenheit", to: "celsius",    val: "72"  },  // room temperature
  volume:      { from: "gallon_us",  to: "liter",      val: "1"   },
  speed:       { from: "mph",        to: "kph",        val: "60"  },  // typical speed limit
  area:        { from: "acre",       to: "sq_meter",   val: "1"   },
  data:        { from: "gigabyte",   to: "megabyte",   val: "1"   },
};

interface Props {
  defaultCategory?: string;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function ConverterWidget({
  defaultCategory = "length",
  defaultFrom,
  defaultTo,
}: Props) {
  const [catSlug, setCatSlug] = useState(defaultCategory);
  const cat = CATEGORIES[catSlug];

  const defaults = CATEGORY_DEFAULTS[catSlug] ?? { from: Object.keys(cat.units)[0], to: Object.keys(cat.units)[1], val: "1" };

  const [from,     setFrom]     = useState(defaultFrom ?? defaults.from);
  const [to,       setTo]       = useState(defaultTo   ?? defaults.to);
  const [inputVal, setInputVal] = useState(defaultFrom ? "1" : defaults.val);

  const unitKeys = Object.keys(cat.units);

  const result = (() => {
    const n = parseFloat(inputVal);
    if (isNaN(n)) return null;
    return convert(n, from, to, catSlug);
  })();

  const fromSym = getSymbol(from, catSlug);
  const toSym   = getSymbol(to,   catSlug);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const switchCat = (slug: string) => {
    setCatSlug(slug);
    const d = CATEGORY_DEFAULTS[slug] ?? { from: Object.keys(CATEGORIES[slug].units)[0], to: Object.keys(CATEGORIES[slug].units)[1], val: "1" };
    setFrom(d.from);
    setTo(d.to);
    setInputVal(d.val);
  };

  return (
    <div className="animate-slide-up">
      {/* Category tabs — only on homepage */}
      {!defaultFrom && (
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          <Link
  href="/ai"
  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium border bg-[#edf4f0] border-[#3d6b4f]/40 text-[#3d6b4f] hover:bg-[#3d6b4f] hover:text-white transition-all"
>
  🤖 AI Tools
</Link>{Object.values(CATEGORIES).map((c) => (
            <button
              key={c.slug}
              onClick={() => switchCat(c.slug)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                catSlug === c.slug
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white shadow-md shadow-[#3d6b4f]/20"
                  : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f] hover:bg-[#edf4f0]"
              }`}
            >
              <span className="text-sm">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Main card */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

        {/* Card header */}
        <div className="flex items-center justify-between px-7 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">
            {cat.title}
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 p-7 items-start">

          {/* From */}
          <div>
            <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">From</label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#1a1814] outline-none focus:border-[#3d6b4f] focus:ring-2 focus:ring-[#3d6b4f]/10 transition-all"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none focus:border-[#3d6b4f] cursor-pointer appearance-none transition-all"
            >
              {unitKeys.map((k) => (
                <option key={k} value={k}>{cat.units[k].label}</option>
              ))}
            </select>
          </div>

          {/* Swap */}
          <button
            onClick={swap}
            className="mt-[52px] w-11 h-11 rounded-full bg-[#f2f0ed] border border-[#e4e0da] text-[#9a948a] text-lg flex items-center justify-center hover:bg-[#3d6b4f] hover:border-[#3d6b4f] hover:text-white transition-all hover:rotate-180 duration-300 flex-shrink-0"
            title="Swap units"
          >
            ⇄
          </button>

          {/* To */}
          <div>
            <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">To</label>
            <input
              type="number"
              readOnly
              value={result !== null ? formatNumber(result) : ""}
              className="w-full bg-[#edf4f0] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#3d6b4f] outline-none cursor-default"
            />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none focus:border-[#3d6b4f] cursor-pointer appearance-none transition-all"
            >
              {unitKeys.map((k) => (
                <option key={k} value={k}>{cat.units[k].label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result bar */}
        <div className="bg-[#f0ede8] border-t border-[#e4e0da] px-7 py-6">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">Result</p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-serif text-[clamp(36px,6vw,52px)] text-[#3d6b4f] leading-none tracking-tight">
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

      {/* Quick references */}
      {cat.popular.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">
            // Popular conversions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cat.popular.map((p) => {
              const r  = convert(p.val, p.from, p.to, catSlug);
              const fs = getSymbol(p.from, catSlug);
              const ts = getSymbol(p.to,   catSlug);
              return (
                <button
                  key={`${p.from}-${p.to}`}
                  onClick={() => { setFrom(p.from); setTo(p.to); setInputVal(String(p.val)); }}
                  className="group bg-white border border-[#e4e0da] rounded-xl p-4 text-left hover:border-[#3d6b4f] hover:bg-[#edf4f0] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
                >
                  <p className="font-mono text-sm text-[#1a1814]">{p.val} {fs} →</p>
                  <p className="text-xs text-[#9a948a] mt-0.5 group-hover:text-[#3d6b4f]">
                    {formatNumber(r)} {ts}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
