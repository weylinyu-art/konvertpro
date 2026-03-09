"use client";
// app/currency/page.tsx
// Real-time currency converter using frankfurter.app (ECB data, free, no key needed)

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";
import { currencyFaqSchema } from "./metadata";

const CURRENCY_NAMES: Record<string, string> = {
  // Major reserve currencies
  USD: "US Dollar",          EUR: "Euro",               GBP: "British Pound",
  JPY: "Japanese Yen",       CHF: "Swiss Franc",        CNY: "Chinese Yuan",
  // Asia-Pacific
  HKD: "Hong Kong Dollar",   AUD: "Australian Dollar",  SGD: "Singapore Dollar",
  NZD: "New Zealand Dollar", KRW: "South Korean Won",   TWD: "Taiwan Dollar",
  INR: "Indian Rupee",       THB: "Thai Baht",          MYR: "Malaysian Ringgit",
  IDR: "Indonesian Rupiah",  PHP: "Philippine Peso",    VND: "Vietnamese Dong",
  PKR: "Pakistani Rupee",    BDT: "Bangladeshi Taka",
  // Americas
  CAD: "Canadian Dollar",    MXN: "Mexican Peso",       BRL: "Brazilian Real",
  ARS: "Argentine Peso",     CLP: "Chilean Peso",       COP: "Colombian Peso",
  PEN: "Peruvian Sol",
  // Europe
  SEK: "Swedish Krona",      NOK: "Norwegian Krone",    DKK: "Danish Krone",
  PLN: "Polish Zloty",       CZK: "Czech Koruna",       HUF: "Hungarian Forint",
  RON: "Romanian Leu",       HRK: "Croatian Kuna",      BGN: "Bulgarian Lev",
  // Middle East & Africa
  AED: "UAE Dirham",         SAR: "Saudi Riyal",        QAR: "Qatari Riyal",
  KWD: "Kuwaiti Dinar",      BHD: "Bahraini Dinar",     OMR: "Omani Rial",
  ILS: "Israeli Shekel",     EGP: "Egyptian Pound",     NGN: "Nigerian Naira",
  ZAR: "South African Rand", KES: "Kenyan Shilling",
  // CIS
  RUB: "Russian Ruble",      UAH: "Ukrainian Hryvnia",  KZT: "Kazakhstani Tenge",
  // Other
  TRY: "Turkish Lira",
};

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", CHF: "🇨🇭", CNY: "🇨🇳",
  HKD: "🇭🇰", AUD: "🇦🇺", SGD: "🇸🇬", NZD: "🇳🇿", KRW: "🇰🇷", TWD: "🇹🇼",
  INR: "🇮🇳", THB: "🇹🇭", MYR: "🇲🇾", IDR: "🇮🇩", PHP: "🇵🇭", VND: "🇻🇳",
  PKR: "🇵🇰", BDT: "🇧🇩",
  CAD: "🇨🇦", MXN: "🇲🇽", BRL: "🇧🇷", ARS: "🇦🇷", CLP: "🇨🇱", COP: "🇨🇴",
  PEN: "🇵🇪",
  SEK: "🇸🇪", NOK: "🇳🇴", DKK: "🇩🇰", PLN: "🇵🇱", CZK: "🇨🇿", HUF: "🇭🇺",
  RON: "🇷🇴", HRK: "🇭🇷", BGN: "🇧🇬",
  AED: "🇦🇪", SAR: "🇸🇦", QAR: "🇶🇦", KWD: "🇰🇼", BHD: "🇧🇭", OMR: "🇴🇲",
  ILS: "🇮🇱", EGP: "🇪🇬", NGN: "🇳🇬", ZAR: "🇿🇦", KES: "🇰🇪",
  RUB: "🇷🇺", UAH: "🇺🇦", KZT: "🇰🇿",
  TRY: "🇹🇷",
};

const POPULAR_PAIRS = [
  { from: "USD", to: "CNY" }, { from: "USD", to: "EUR" },
  { from: "USD", to: "JPY" }, { from: "EUR", to: "GBP" },
  { from: "USD", to: "INR" }, { from: "USD", to: "KRW" },
  { from: "USD", to: "HKD" }, { from: "USD", to: "AED" },
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
  const [allRates, setAllRates] = useState<Record<string, number> | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [updated,  setUpdated]  = useState<string | null>(null);

  // Derive rate locally — no extra fetch when switching currencies
  const rate = (() => {
    if (!allRates) return null;
    if (from === to) return 1;
    const fromUSD = from === "USD" ? 1 : allRates[from];
    const toUSD   = to   === "USD" ? 1 : allRates[to];
    if (!fromUSD || !toUSD) return null;
    return toUSD / fromUSD;
  })();

  // Fetch ALL rates once per day (base USD), cache in localStorage
  const fetchAllRates = useCallback(async () => {
    const CACHE_KEY = "koverts_rates_v1";
    const TTL_MS    = 24 * 60 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { rates, date, ts } = JSON.parse(cached);
        if (Date.now() - ts < TTL_MS) {
          setAllRates(rates);
          setUpdated(date);
          return;
        }
      }
    } catch {}
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("https://api.frankfurter.app/latest?from=USD");
      const data = await res.json();
      const rates = { ...data.rates, USD: 1 };
      setAllRates(rates);
      setUpdated(data.date);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ rates, date: data.date, ts: Date.now() }));
      } catch {}
    } catch {
      setError("Unable to fetch rates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllRates(); }, [fetchAllRates]);

  const result  = rate !== null && !isNaN(parseFloat(inputVal))
    ? parseFloat(inputVal) * rate : null;
  const swap    = () => { setFrom(to); setTo(from); };

  return (
    <main className="relative z-10">
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(currencyFaqSchema) }}
      />
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
            💱 {t.currency}
          </div>
          <h1 className="text-[clamp(32px,5vw,52px)] font-bold tracking-tight leading-tight mb-2">
            {t.currency}
          </h1>
          <p className="text-[#9a948a] text-sm">
            {t.heroBadge} · {CURRENCIES.length} {t.units} · ECB
          </p>
        </section>

        {/* Main converter card */}
        <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] mb-8">

          {/* Card header */}
          <div className="flex items-center justify-between px-4 md:px-7 py-3 border-b border-[#e4e0da]">
            <span className="font-mono text-[10px] text-[#9a948a] tracking-[0.1em] uppercase">
              💱 {t.currency}
            </span>
            <div className="flex items-center gap-2">
              {loading && <span className="font-mono text-[10px] text-[#3d6b4f] animate-pulse">fetching rates...</span>}
              {updated && !loading && <span className="font-mono text-[10px] text-[#9a948a]">ECB · {updated}</span>}
              <button onClick={() => { localStorage.removeItem('koverts_rates_v1'); fetchAllRates(); }}
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
                  (allRates && (allRates[c] || c === "USD")) ? <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option> : null
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
                  (allRates && (allRates[c] || c === "USD")) ? <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option> : null
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
                  (allRates && (allRates[c] || c === "USD")) ? <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option> : null
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
                  (allRates && (allRates[c] || c === "USD")) ? <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}</option> : null
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
                  <th className="text-left px-4 md:px-6 py-3 font-mono text-xs text-[#9a948a] tracking-wider">{t.currency}</th>
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

        {/* FAQ Section */}
        <section className="mb-10">
          <p className="font-mono text-[10px] md:text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">
            // Frequently Asked Questions
          </p>
          <div className="space-y-2">
            {currencyFaqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">{faq.name}</span>
                  <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  <p className="pt-3">{faq.acceptedAnswer.text}</p>
                </div>
              </details>
            ))}
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
