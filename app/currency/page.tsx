"use client";
// app/currency/page.tsx
// Real-time currency converter using frankfurter.app (ECB data, free, no key needed)

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",        EUR: "Euro",             GBP: "British Pound",
  CNY: "Chinese Yuan",     JPY: "Japanese Yen",     KRW: "South Korean Won",
  HKD: "Hong Kong Dollar", CAD: "Canadian Dollar",  AUD: "Australian Dollar",
  CHF: "Swiss Franc",      SGD: "Singapore Dollar", INR: "Indian Rupee",
  MXN: "Mexican Peso",     BRL: "Brazilian Real",   RUB: "Russian Ruble",
  ZAR: "South African Rand", SEK: "Swedish Krona",  NOK: "Norwegian Krone",
  DKK: "Danish Krone",     NZD: "New Zealand Dollar", THB: "Thai Baht",
  MYR: "Malaysian Ringgit", IDR: "Indonesian Rupiah", PHP: "Philippine Peso",
  TWD: "Taiwan Dollar",    PLN: "Polish Zloty",     TRY: "Turkish Lira",
  AED: "UAE Dirham",       SAR: "Saudi Riyal",      ILS: "Israeli Shekel",
  CZK: "Czech Koruna",     HUF: "Hungarian Forint",
};

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", CNY: "🇨🇳", JPY: "🇯🇵", KRW: "🇰🇷",
  HKD: "🇭🇰", CAD: "🇨🇦", AUD: "🇦🇺", CHF: "🇨🇭", SGD: "🇸🇬", INR: "🇮🇳",
  MXN: "🇲🇽", BRL: "🇧🇷", RUB: "🇷🇺", ZAR: "🇿🇦", SEK: "🇸🇪", NOK: "🇳🇴",
  DKK: "🇩🇰", NZD: "🇳🇿", THB: "🇹🇭", MYR: "🇲🇾", IDR: "🇮🇩", PHP: "🇵🇭",
  TWD: "🇹🇼", PLN: "🇵🇱", TRY: "🇹🇷", AED: "🇦🇪", SAR: "🇸🇦", ILS: "🇮🇱",
  CZK: "🇨🇿", HUF: "🇭🇺",
};

const POPULAR_PAIRS = [
  { from: "USD", to: "EUR" }, { from: "USD", to: "CNY" },
  { from: "EUR", to: "GBP" }, { from: "USD", to: "JPY" },
  { from: "GBP", to: "USD" }, { from: "USD", to: "KRW" },
  { from: "EUR", to: "USD" }, { from: "USD", to: "HKD" },
];

const CURRENCIES = Object.keys(CURRENCY_NAMES);

function formatCurrency(n: number, currency: string): string {
  if (!isFinite(n)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency,
      minimumFractionDigits: 2, maximumFractionDigits: 4,
    }).format(n);
  } catch {
    return n.toFixed(4);
  }
}

export default function CurrencyPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);

  const [from,     setFrom]     = useState("USD");
  const [to,       setTo]       = useState("CNY");
  const [inputVal, setInputVal] = useState("100");
  const [rate,     setRate]     = useState<number | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [updated,  setUpdated]  = useState<string | null>(null);

  const fetchRate = useCallback(async (fromCur: string, toCur: string) => {
    if (fromCur === toCur) { setRate(1); return; }
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`https://api.frankfurter.app/latest?from=${fromCur}&to=${toCur}`);
      const data = await res.json();
      setRate(data.rates[toCur]);
      setUpdated(data.date);
    } catch {
      setError("Unable to fetch rates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRate(from, to); }, [from, to, fetchRate]);

  const result  = rate !== null && !isNaN(parseFloat(inputVal))
    ? parseFloat(inputVal) * rate : null;
  const swap    = () => { setFrom(to); setTo(from); };

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-8">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-sans font-bold text-[22px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">Koverts</span>
            <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">← {t.home}</Link>
            {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
          </div>
        </header>

        {/* Hero */}
        <section className="py-10">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            💱 Currency Converter
          </div>
          <h1 className="text-[clamp(32px,5vw,52px)] font-bold tracking-tight leading-tight mb-2">
            Currency Converter
          </h1>
          <p className="text-[#9a948a] text-sm">
            Real-time exchange rates · {CURRENCIES.length} currencies · Powered by ECB data
          </p>
        </section>

        {/* Main converter card */}
        <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] mb-8">

          {/* Card header */}
          <div className="flex items-center justify-between px-4 md:px-7 py-3 border-b border-[#e4e0da]">
            <span className="font-mono text-[10px] text-[#9a948a] tracking-[0.1em] uppercase">
              💱 Currency Exchange
            </span>
            <div className="flex items-center gap-2">
              {loading && <span className="font-mono text-[10px] text-[#3d6b4f] animate-pulse">fetching rates...</span>}
              {updated && !loading && <span className="font-mono text-[10px] text-[#9a948a]">ECB · {updated}</span>}
              <button onClick={() => fetchRate(from, to)}
                className="font-mono text-[10px] text-[#9a948a] hover:text-[#3d6b4f] transition-colors px-2 py-1 rounded border border-[#e4e0da] hover:border-[#3d6b4f]">
                ↻ refresh
              </button>
            </div>
          </div>

          {/* MOBILE layout */}
          <div className="md:hidden p-4 space-y-3">
            <div>
              <label className="block font-mono text-[10px] text-[#9a948a] tracking-widest uppercase mb-1.5">{t.from}</label>
              <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-[22px] text-[#1a1814] outline-none focus:border-[#3d6b4f] transition-all" />
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="mt-2 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option>
                ))}
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
              <input type="number" readOnly
                value={result !== null ? result.toFixed(4) : ""}
                className="w-full bg-[#edf4f0] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-[22px] text-[#3d6b4f] outline-none cursor-default" />
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="mt-2 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-2.5 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none">
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* DESKTOP layout */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-4 p-7 items-start">
            <div>
              <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">{t.from}</label>
              <input type="number" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#1a1814] outline-none focus:border-[#3d6b4f] focus:ring-2 focus:ring-[#3d6b4f]/10 transition-all" />
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none transition-all">
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option>
                ))}
              </select>
            </div>
            <button onClick={swap}
              className="mt-[52px] w-11 h-11 rounded-full bg-[#f2f0ed] border border-[#e4e0da] text-[#9a948a] text-lg flex items-center justify-center hover:bg-[#3d6b4f] hover:border-[#3d6b4f] hover:text-white transition-all hover:rotate-180 duration-300 flex-shrink-0">
              ⇄
            </button>
            <div>
              <label className="block font-mono text-[11px] text-[#9a948a] tracking-widest uppercase mb-2.5">{t.to}</label>
              <input type="number" readOnly
                value={result !== null ? result.toFixed(4) : ""}
                className="w-full bg-[#edf4f0] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-[28px] text-[#3d6b4f] outline-none cursor-default" />
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="mt-2.5 w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-3 text-sm font-medium text-[#1a1814] outline-none cursor-pointer appearance-none transition-all">
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result bar */}
          <div className="bg-[#f0ede8] border-t border-[#e4e0da] px-4 md:px-7 py-4 md:py-6">
            <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2">{t.result}</p>
            {error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : loading ? (
              <p className="font-mono text-[#9a948a] animate-pulse">Loading rates...</p>
            ) : (
              <>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-sans text-[clamp(30px,8vw,52px)] font-bold text-[#3d6b4f] leading-none tracking-tight">
                    {result !== null ? formatCurrency(result, to) : "—"}
                  </span>
                </div>
                {rate !== null && (
                  <p className="font-mono text-xs text-[#9a948a] mt-2 bg-white border border-[#e4e0da] inline-block px-3 py-1.5 rounded-lg">
                    1 {from} = {rate.toFixed(6)} {to}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Popular pairs */}
        <section className="mb-10">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
            // {t.popularConversions}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {POPULAR_PAIRS.map((p) => (
              <button key={`${p.from}-${p.to}`}
                onClick={() => { setFrom(p.from); setTo(p.to); }}
                className={`group bg-white border rounded-xl p-3 md:p-4 text-left transition-all shadow-sm hover:-translate-y-0.5 ${
                  from === p.from && to === p.to
                    ? "border-[#3d6b4f] bg-[#edf4f0]"
                    : "border-[#e4e0da] hover:border-[#3d6b4f] hover:bg-[#edf4f0]"
                }`}>
                <p className="font-mono text-xs text-[#1a1814]">
                  {CURRENCY_FLAGS[p.from]} {p.from} → {CURRENCY_FLAGS[p.to]} {p.to}
                </p>
                <p className="text-xs text-[#9a948a] mt-0.5 truncate group-hover:text-[#3d6b4f]">
                  {CURRENCY_NAMES[p.from].split(" ")[0]} → {CURRENCY_NAMES[p.to].split(" ")[0]}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* All currencies reference table */}
        <section className="mb-16">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">
            // All currencies vs {from}
          </p>
          <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
                  <th className="text-left px-4 md:px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">Currency</th>
                  <th className="text-left px-4 md:px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">1 {from} =</th>
                </tr>
              </thead>
              <tbody>
                {CURRENCIES.filter((c) => c !== from).map((c) => (
                  <tr key={c}
                    onClick={() => { setTo(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="border-b border-[#f0ede8] hover:bg-[#faf8f5] cursor-pointer transition-colors">
                    <td className="px-4 md:px-6 py-3">
                      <span className="mr-2">{CURRENCY_FLAGS[c]}</span>
                      <span className="font-medium text-[#1a1814]">{c}</span>
                      <span className="text-[#9a948a] ml-2 text-xs hidden md:inline">{CURRENCY_NAMES[c]}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 font-mono text-[#3d6b4f] font-medium">
                      {loading ? (
                        <span className="text-[#9a948a] animate-pulse">...</span>
                      ) : c === to && rate !== null ? (
                        rate.toFixed(4)
                      ) : (
                        <span className="text-[#9a948a] text-xs">click to convert</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-16">
          <div className="bg-[#faf8f4] border border-[#e4e0da] rounded-2xl p-5 text-xs text-[#9a948a] leading-relaxed">
            <strong className="text-[#6a6460]">Disclaimer:</strong> Exchange rates are sourced from the European Central Bank via frankfurter.app and are updated daily. Rates are for informational purposes only and may differ from rates offered by banks or financial institutions. Not financial advice.
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← {t.allConverters}</Link>
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
        </footer>

      </div>
    </main>
  );
}
