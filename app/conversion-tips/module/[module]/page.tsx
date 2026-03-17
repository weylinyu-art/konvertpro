"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";
import { getDetailedModuleArticles, getTipModuleByKey } from "@/lib/conversion-tips-data";

interface Props {
  params: { module: string };
}

const MODULE_THEME: Record<string, { icon: string; tone: string }> = {
  "fun-facts": { icon: "🧭", tone: "from-[#eef6f2] to-[#f8f6f2]" },
  "daily-guides": { icon: "🧳", tone: "from-[#edf4f8] to-[#f8f6f2]" },
  professional: { icon: "🛠️", tone: "from-[#f3f1fb] to-[#f8f6f2]" },
  "tricks-tools": { icon: "⚙️", tone: "from-[#f5f3ee] to-[#f8f6f2]" },
};

export default function ConversionTipsModulePage({ params }: Props) {
  const module = getTipModuleByKey(params.module);

  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const localeText = <T,>(m: { en: T; zh: T; es?: T; fr?: T; ru?: T; ar?: T }) =>
    m[locale as keyof typeof m] ?? m.en;
  if (!module) {
    return (
      <main className="min-h-[60vh] grid place-items-center px-6">
        <div className="text-center">
          <p className="text-[#6a6460] mb-3">{localeText({ en: "Module not found", zh: "未找到对应模块" })}</p>
          <Link href="/conversion-tips" className="text-sm text-[#3d6b4f] underline">
            {localeText({ en: "Back to Conversion Tips", zh: "返回 Tips 首页" })}
          </Link>
        </div>
      </main>
    );
  }
  const theme = MODULE_THEME[module.key] ?? MODULE_THEME["fun-facts"];
  const moduleArticles = getDetailedModuleArticles(module.key);

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <header className="flex items-center justify-between pt-8">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-sans text-[22px] font-bold tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
              Koverts
            </span>
            <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/conversion-tips" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              ← {localeText({ en: "Back to Tips", zh: "返回 Tips", es: "Volver a Tips", fr: "Retour aux astuces", ru: "Назад к советам", ar: "العودة إلى النصائح" })}
            </Link>
            {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
          </div>
        </header>

        <section className={`mt-10 mb-8 rounded-3xl border border-[#e4e0da] bg-gradient-to-r ${theme.tone} p-6 md:p-7`}>
          <p className="text-xs font-mono text-[#3d6b4f] tracking-[0.1em] uppercase mb-3">
            {theme.icon} {localeText({ en: "Module", zh: "专题模块", es: "Modulo", fr: "Module", ru: "Модуль", ar: "وحدة" })}
          </p>
          <h1 className="text-[clamp(28px,4.2vw,44px)] font-bold tracking-tight leading-[1.12] text-[#1a1814] mb-3">
            {localeText(module.title)}
          </h1>
          <p className="text-sm md:text-base text-[#5d5750] leading-relaxed max-w-3xl">
            {localeText(module.intro)}
          </p>
          <div className="mt-4 inline-flex items-center rounded-full border border-[#3d6b4f]/20 bg-white/70 px-3 py-1 text-xs text-[#3d6b4f]">
            {moduleArticles.length} {localeText({ en: "articles", zh: "篇文章", es: "articulos", fr: "articles", ru: "статей", ar: "مقالات" })}
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleArticles.map((article, i) => (
              <article key={i} className="group bg-white border border-[#e4e0da] rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h2 className="text-base md:text-lg font-semibold text-[#1a1814] mb-2 leading-snug group-hover:text-[#3d6b4f] transition-colors">
                  <Link href={`/conversion-tips/${article.slug}`}>{localeText(article.title)}</Link>
                </h2>
                <p className="text-sm text-[#6a6460] leading-relaxed mb-4">{localeText(article.summary)}</p>
                <Link href={`/conversion-tips/${article.slug}`} className="text-xs text-[#3d6b4f] hover:text-[#31563f] underline">
                  {localeText({ en: "Read article", zh: "查看全文", es: "Leer articulo", fr: "Lire l'article", ru: "Читать статью", ar: "قراءة المقال" })}
                </Link>
              </article>
            ))}
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
