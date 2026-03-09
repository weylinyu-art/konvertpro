"use client";
// app/ai/page.tsx
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";

export default function AiPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
              <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
                Koverts
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f]">{t.aiTools}</span>
          </div>
          {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
        </header>

        <section className="py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] animate-pulse" />
            Built for LLM developers & AI enthusiasts
          </div>
          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-[1.05] tracking-tight mb-4">
            AI & LLM <em className="italic text-[#3d6b4f]">Calculators</em>
          </h1>
          <p className="text-[#9a948a] text-base font-light max-w-md mx-auto leading-relaxed">
            Token counts, model memory, API costs, context windows — everything you need when working with large language models.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {AI_TOOLS.map((tool) => (
            <Link key={tool.slug} href={`/ai/${tool.slug}`}
              className="group bg-white border border-[#e4e0da] rounded-2xl p-7 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{tool.icon}</span>
                <div>
                  <h2 className="font-semibold text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors mb-1">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-[#9a948a] leading-relaxed">{tool.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 font-mono text-xs text-[#3d6b4f] opacity-0 group-hover:opacity-100 transition-opacity">
                Open tool →
              </div>
            </Link>
          ))}
        </div>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← {t.allConverters}</Link>
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
        </footer>
      </div>
    </main>
  );
}
