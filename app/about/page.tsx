"use client";
// app/about/page.tsx

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { CATEGORIES } from "@/lib/units";
import { getTranslations, getCategoryLabel } from "@/lib/i18n";

const STATS = [
  { value: "1,200+", label: "Conversion pages" },
  { value: "16",     label: "Unit categories" },
  { value: "6",      label: "Languages" },
  { value: "0",      label: "Ads (for now)" },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Instant",
    desc: "Results appear as you type. No buttons to press, no page reloads. We believe tools should get out of your way.",
  },
  {
    icon: "🎯",
    title: "Accurate",
    desc: "Every conversion factor is sourced from official standards bodies — NIST, ISO, and international metrology organizations.",
  },
  {
    icon: "🌍",
    title: "Global",
    desc: "Available in 6 UN working languages with automatic browser detection. Whether you're in Shanghai, Madrid or Cairo, Koverts speaks your language.",
  },
  {
    icon: "🤖",
    title: "AI-Ready",
    desc: "Beyond unit conversion, we built tools for the AI era — token calculators, model size estimators, and API cost comparisons that developers actually need.",
  },
];

export default function AboutPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-8">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-sans text-[22px] font-bold tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
              Koverts
            </span>
            <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              ← Back
            </Link>
            {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
          </div>
        </header>

        {/* Hero */}
        <section className="pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-8">
            🌿 About Koverts
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-bold tracking-tight leading-[1.05] mb-6">
            Built for people who just<br />
            <span className="text-[#3d6b4f]">need the answer.</span>
          </h1>
          <p className="text-[#6a6460] text-lg leading-relaxed max-w-2xl">
            Koverts started with a simple frustration: every unit converter online was
            cluttered with ads, required sign-ups, or took three clicks to get a result.
            We built the tool we wanted to use ourselves.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-[#e4e0da] rounded-2xl p-6 text-center shadow-sm">
              <p className="text-[clamp(28px,4vw,40px)] font-bold text-[#3d6b4f] tracking-tight">{s.value}</p>
              <p className="text-xs text-[#9a948a] font-mono mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Story */}
        <section className="mb-16">
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 md:p-10 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-6">Our story</p>
            <div className="space-y-4 text-[#4a4540] leading-relaxed">
              <p>
                The idea was simple: a conversion tool that loads instantly, works on any device,
                and doesn't treat users as advertising inventory. No popups. No "create an account
                to save your conversions." Just the answer.
              </p>
              <p>
                We started with the basics — length, weight, temperature. Then we listened to what
                people actually searched for and kept adding: cooking measurements, fuel economy,
                shoe sizes. Today Koverts covers 16 categories with over 1,200 conversion pages.
              </p>
              <p>
                The AI tools section came naturally. As developers ourselves, we found ourselves
                constantly calculating token counts, estimating GPU memory requirements, and
                comparing API costs across providers. We built the tools we needed, and made
                them free for everyone.
              </p>
              <p>
                Koverts is available in all 6 UN working languages — English, Chinese, Spanish,
                French, Russian and Arabic — with automatic detection based on your browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-6">
            // What we stand for
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm hover:border-[#3d6b4f]/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="font-semibold text-[#1a1814]">{v.title}</h3>
                </div>
                <p className="text-sm text-[#6a6460] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy commitment */}
        <section className="mb-16">
          <div className="bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl p-8">
            <div className="flex gap-4">
              <span className="text-3xl flex-shrink-0">🔒</span>
              <div>
                <h2 className="font-bold text-[#1a1814] mb-2">Privacy by default</h2>
                <p className="text-sm text-[#4a4540] leading-relaxed">
                  Koverts does not collect personal data, require accounts, or track individual users.
                  The values you enter into our converters are processed entirely in your browser —
                  nothing is sent to our servers. We use minimal, privacy-respecting analytics
                  to understand which tools are most useful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">Contact</p>
            <p className="text-sm text-[#4a4540] leading-relaxed mb-4">
              Have a suggestion for a new converter? Found a calculation error? We'd love to hear from you.
            </p>
            <a href="mailto:hello@koverts.com"
              className="inline-flex items-center gap-2 bg-[#3d6b4f] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#2d5a3f] transition-colors">
              ✉️ hello@koverts.com
            </a>
          </div>
        </section>

        {/* CTA — back to tools */}
        <section className="mb-20">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // Start converting
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(CATEGORIES).slice(0, 8).map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm text-center">
                <span className="text-xl block mb-1">{cat.icon}</span>
                <p className="text-xs font-medium text-[#1a1814] group-hover:text-[#3d6b4f]">{getCategoryLabel(cat.slug, t)}</p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← Koverts</Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
        </footer>

      </div>
    </main>
  );
}
