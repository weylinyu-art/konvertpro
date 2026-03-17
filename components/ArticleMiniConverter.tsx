"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, convert, formatNumber, getSymbol } from "@/lib/units";
import { useLocale } from "@/components/LocaleProvider";
import { getCategoryLabel, getTranslations, getUnitLabel } from "@/lib/i18n";

interface Props {
  defaultCategory: string;
  defaultFrom?: string;
  defaultTo?: string;
  defaultValue?: number;
}

const CATEGORY_ORDER = [
  "length",
  "weight",
  "temperature",
  "volume",
  "speed",
  "area",
  "time",
  "data",
  "cooking",
  "energy",
  "pressure",
  "power",
  "fuel",
  "angle",
  "shoe",
  "numbase",
];

function getSafeCategory(slug: string): string {
  return CATEGORIES[slug] ? slug : "length";
}

export default function ArticleMiniConverter({
  defaultCategory,
  defaultFrom,
  defaultTo,
  defaultValue = 1,
}: Props) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const copyText = {
    en: { copy: "Copy", ok: "OK" },
    zh: { copy: "复制", ok: "已复制" },
    es: { copy: "Copiar", ok: "Listo" },
    fr: { copy: "Copier", ok: "OK" },
    ru: { copy: "Копировать", ok: "Готово" },
    ar: { copy: "نسخ", ok: "تم" },
  }[locale];

  const orderedCategories = useMemo(
    () => [
      ...CATEGORY_ORDER.filter((slug) => CATEGORIES[slug]),
      ...Object.keys(CATEGORIES).filter((slug) => !CATEGORY_ORDER.includes(slug)),
    ],
    []
  );

  const initialCategory = getSafeCategory(defaultCategory);
  const initialUnits = Object.keys(CATEGORIES[initialCategory].units);

  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [inputValue, setInputValue] = useState(String(defaultValue));
  const [copied, setCopied] = useState(false);
  const [from, setFrom] = useState(
    defaultFrom && CATEGORIES[initialCategory].units[defaultFrom] ? defaultFrom : initialUnits[0]
  );
  const [to, setTo] = useState(
    defaultTo && CATEGORIES[initialCategory].units[defaultTo]
      ? defaultTo
      : initialUnits[Math.min(1, initialUnits.length - 1)]
  );

  const category = CATEGORIES[categorySlug];
  const unitKeys = Object.keys(category.units);

  const result = useMemo(() => {
    const n = parseFloat(inputValue);
    if (Number.isNaN(n)) return null;
    return convert(n, from, to, categorySlug);
  }, [inputValue, from, to, categorySlug]);

  const setCategory = (slug: string) => {
    const safeSlug = getSafeCategory(slug);
    const nextCategory = CATEGORIES[safeSlug];
    const keys = Object.keys(nextCategory.units);
    setCategorySlug(safeSlug);
    setFrom(keys[0]);
    setTo(keys[Math.min(1, keys.length - 1)]);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const copyLine = async () => {
    if (result === null) return;
    const n = parseFloat(inputValue);
    if (Number.isNaN(n)) return;
    const text = `${formatNumber(n)} ${getSymbol(from, categorySlug)} = ${formatNumber(result)} ${getSymbol(to, categorySlug)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="my-8 bg-white border border-[#e4e0da] rounded-2xl p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-xs text-[#9a948a] font-mono tracking-wide uppercase">
          {t.howToConvert}
        </p>
        <select
          value={categorySlug}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 min-w-[130px] rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm text-[#1a1814] outline-none"
        >
          {orderedCategories.map((slug) => (
            <option key={slug} value={slug}>
              {getCategoryLabel(slug, t)}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden space-y-3">
        <div>
          <label className="block text-xs text-[#7c756c] mb-1">{t.from}</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 min-w-0 h-11 rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 font-mono text-base outline-none focus:border-[#3d6b4f]/50"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="shrink-0 w-[110px] h-11 rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 text-sm outline-none"
            >
              {unitKeys.map((k) => (
                <option key={k} value={k}>{getUnitLabel(k, locale)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={swap} title={t.swap}
            className="w-9 h-9 rounded-lg bg-[#f5f3f0] border border-[#e4e0da] text-[#9a948a] flex items-center justify-center hover:bg-[#3d6b4f] hover:text-white transition-colors">
            ⇄
          </button>
        </div>
        <div>
          <label className="block text-xs text-[#7c756c] mb-1">{t.result}</label>
          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={result === null ? "" : formatNumber(result)}
              className="flex-1 min-w-0 h-11 rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 font-mono text-base text-[#3d6b4f] font-semibold outline-none"
            />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="shrink-0 w-[110px] h-11 rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 text-sm outline-none"
            >
              {unitKeys.map((k) => (
                <option key={k} value={k}>{getUnitLabel(k, locale)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop: 3-column layout */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div>
          <label className="block text-xs text-[#7c756c] mb-1">{t.from}</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-11 rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 font-mono text-lg outline-none focus:border-[#3d6b4f]/50"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 h-10 w-full rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 text-sm outline-none"
          >
            {unitKeys.map((k) => (
              <option key={k} value={k}>{getUnitLabel(k, locale)}</option>
            ))}
          </select>
        </div>
        <button
          onClick={swap}
          title={t.swap}
          className="h-10 w-10 mb-1 rounded-lg border border-[#e4e0da] bg-[#f5f3f0] text-[#9a948a] hover:bg-[#3d6b4f] hover:text-white hover:border-[#3d6b4f] transition-colors shrink-0"
        >
          ⇄
        </button>
        <div>
          <label className="block text-xs text-[#7c756c] mb-1">{t.result}</label>
          <input
            readOnly
            value={result === null ? "" : formatNumber(result)}
            className="w-full h-11 rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 font-mono text-lg text-[#3d6b4f] font-semibold outline-none"
          />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 h-10 w-full rounded-lg border border-[#e4e0da] bg-[#faf9f7] px-3 text-sm outline-none"
          >
            {unitKeys.map((k) => (
              <option key={k} value={k}>{getUnitLabel(k, locale)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-[#faf9f7] border border-[#ebe8e3] px-3 py-2">
        <p className="text-sm text-[#1a1814]">
          {result === null
            ? "—"
            : `${inputValue || "0"} ${getSymbol(from, categorySlug)} = ${formatNumber(result)} ${getSymbol(to, categorySlug)}`}
        </p>
        <button
          onClick={copyLine}
          className="rounded-lg border border-[#3d6b4f] bg-[#3d6b4f] px-3 py-1.5 text-sm text-white hover:bg-[#345d47] transition-colors"
        >
          {copied ? copyText.ok : copyText.copy}
        </button>
      </div>
    </section>
  );
}
