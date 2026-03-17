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

      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div>
          <label className="block text-xs text-[#7c756c] mb-1">{t.from}</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-3 text-lg outline-none"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none"
          >
            {unitKeys.map((k) => (
              <option key={k} value={k}>
                {getUnitLabel(k, locale)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={swap}
          title={t.swap}
          className="h-11 w-11 mb-1 rounded-xl border border-[#e4e0da] bg-[#f0eeeb] text-[#6f6a61] hover:bg-[#e7e3df] transition-colors"
        >
          ⇄
        </button>

        <div>
          <label className="block text-xs text-[#7c756c] mb-1">{t.result}</label>
          <input
            readOnly
            value={result === null ? "" : formatNumber(result)}
            className="w-full h-12 rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-3 text-lg outline-none"
          />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none"
          >
            {unitKeys.map((k) => (
              <option key={k} value={k}>
                {getUnitLabel(k, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-[#f4f2ef] px-3 py-2">
        <p className="text-sm text-[#1a1814]">
          {result === null
            ? "—"
            : `${inputValue || "0"} ${getSymbol(from, categorySlug)} = ${formatNumber(result)} ${getSymbol(to, categorySlug)}`}
        </p>
        <button
          onClick={copyLine}
          className="rounded-lg bg-[#5a9cec] px-3 py-1.5 text-sm text-white hover:bg-[#4a8fe4] transition-colors"
        >
          {copied ? copyText.ok : copyText.copy}
        </button>
      </div>
    </section>
  );
}
