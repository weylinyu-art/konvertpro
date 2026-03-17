"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";
import { TIP_MODULES, getDetailedModuleArticles } from "@/lib/conversion-tips-data";

const MODULE_THEME: Record<string, { icon: string; tone: string }> = {
  "fun-facts": { icon: "🧭", tone: "from-[#eef6f2] to-[#f8f6f2]" },
  "daily-guides": { icon: "🧳", tone: "from-[#edf4f8] to-[#f8f6f2]" },
  professional: { icon: "🛠️", tone: "from-[#f3f1fb] to-[#f8f6f2]" },
  "tricks-tools": { icon: "⚙️", tone: "from-[#f5f3ee] to-[#f8f6f2]" },
};

export default function ConversionTipsPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const localeText = <T,>(m: { en: T; zh: T; es?: T; fr?: T; ru?: T; ar?: T }) =>
    m[locale as keyof typeof m] ?? m.en;

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
            <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors">
              ← {localeText({ en: "Back", zh: "返回", es: "Volver", fr: "Retour", ru: "Назад", ar: "رجوع" })}
            </Link>
            {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
          </div>
        </header>

        <section className="pt-14 pb-8">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-7">
            📘 {localeText({ en: "Conversion Tips", zh: "换算小常识", es: "Consejos de conversion", fr: "Astuces de conversion", ru: "Советы по конвертации", ar: "نصائح التحويل" })}
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-[1.08] mb-4">
            {localeText({
              en: "Unit Conversion Basics & Practical Tips",
              zh: "单位转换基础与实用技巧",
              es: "Conceptos y consejos practicos de conversion",
              fr: "Bases et astuces pratiques de conversion",
              ru: "База и практические советы по конвертации",
              ar: "أساسيات التحويل ونصائح عملية",
            })}
          </h1>
          <p className="text-[#6a6460] text-base leading-relaxed max-w-2xl">
            {localeText({
              en: "A quick guide for everyday conversion tasks. Useful for students, engineers, operations teams, and global product teams.",
              zh: "面向日常高频换算场景的速查指南，适合学生、工程人员、运营团队和跨区域业务团队。",
            })}
          </p>
        </section>

        {TIP_MODULES.map((module, idx) => {
          const moduleArticles = getDetailedModuleArticles(module.key);
          if (moduleArticles.length === 0) return null;
          const preview = moduleArticles.slice(0, 4);
          const featured = preview[0];
          const rest = preview.slice(1);
          const theme = MODULE_THEME[module.key] ?? MODULE_THEME["fun-facts"];
          return (
            <section key={idx} className="mb-12">
              <div className="rounded-3xl border border-[#e4e0da] bg-white shadow-sm overflow-hidden">
                <div className={`bg-gradient-to-r ${theme.tone} px-6 pt-6 pb-5 border-b border-[#ece7e1]`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#dfe8e3] px-3 py-1 text-xs font-mono text-[#3d6b4f] mb-3">
                        <span>{theme.icon}</span>
                        <span>{localeText({ en: "Module", zh: "专题模块", es: "Modulo", fr: "Module", ru: "Модуль", ar: "وحدة" })}</span>
                      </div>
                      <h2 className="text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-[#1a1814] mb-2">
                        {localeText(module.title)}
                      </h2>
                      <p className="text-[#5f5951] text-sm md:text-base leading-relaxed max-w-2xl">
                        {localeText(module.intro)}
                      </p>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-2">
                      <span className="text-xs rounded-full px-3 py-1 border border-[#3d6b4f]/20 bg-white/70 text-[#3d6b4f]">
                        {moduleArticles.length} {localeText({ en: "articles", zh: "篇文章", es: "articulos", fr: "articles", ru: "статей", ar: "مقالات" })}
                      </span>
                      <Link
                        href={`/conversion-tips/module/${module.key}`}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#3d6b4f] text-white hover:bg-[#31563f] transition-colors"
                      >
                        {localeText({ en: "View all", zh: "查看全部", es: "Ver todo", fr: "Tout voir", ru: "Смотреть все", ar: "عرض الكل" })} →
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  {featured ? (
                    <article className="group bg-[#faf8f5] border border-[#ece7e1] rounded-2xl p-5 md:p-6 mb-4">
                      <h3 className="text-lg md:text-xl font-semibold text-[#1a1814] mb-2 leading-snug group-hover:text-[#3d6b4f] transition-colors">
                        <Link href={`/conversion-tips/${featured.slug}`}>{localeText(featured.title)}</Link>
                      </h3>
                      <p className="text-sm md:text-base text-[#6a6460] leading-relaxed mb-3">{localeText(featured.summary)}</p>
                      <Link href={`/conversion-tips/${featured.slug}`} className="text-xs text-[#3d6b4f] hover:text-[#31563f] underline">
                        {localeText({ en: "Read article", zh: "查看全文", es: "Leer articulo", fr: "Lire l'article", ru: "Читать статью", ar: "قراءة المقال" })}
                      </Link>
                    </article>
                  ) : null}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rest.map((tip, i) => (
                      <article key={i} className="group bg-white border border-[#ece7e1] rounded-2xl p-4">
                        <h3 className="text-[15px] font-semibold text-[#1a1814] mb-2 leading-snug group-hover:text-[#3d6b4f] transition-colors">
                          <Link href={`/conversion-tips/${tip.slug}`}>{localeText(tip.title)}</Link>
                        </h3>
                        <p className="text-sm text-[#6a6460] leading-relaxed mb-3">{localeText(tip.summary)}</p>
                        <Link href={`/conversion-tips/${tip.slug}`} className="text-xs text-[#3d6b4f] hover:text-[#31563f] underline">
                          {localeText({ en: "Read article", zh: "查看全文", es: "Leer articulo", fr: "Lire l'article", ru: "Читать статью", ar: "قراءة المقال" })}
                        </Link>
                      </article>
                    ))}
                  </div>

                  <div className="md:hidden mt-4 flex items-center justify-between">
                    <span className="text-xs text-[#8f8880]">
                      {moduleArticles.length} {localeText({ en: "articles", zh: "篇文章", es: "articulos", fr: "articles", ru: "статей", ar: "مقالات" })}
                    </span>
                    <Link
                      href={`/conversion-tips/module/${module.key}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#3d6b4f] text-white hover:bg-[#31563f] transition-colors"
                    >
                      {localeText({ en: "View all", zh: "查看全部", es: "Ver todo", fr: "Tout voir", ru: "Смотреть все", ar: "عرض الكل" })} →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="mb-16 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2 text-[#1a1814]">
            {localeText({
              en: "Useful next steps",
              zh: "下一步建议",
              es: "Siguientes pasos utiles",
              fr: "Prochaines etapes utiles",
              ru: "Полезные следующие шаги",
              ar: "خطوات مفيدة تالية",
            })}
          </h2>
          <p className="text-sm text-[#4a4540] mb-4">
            {localeText({
              en: "Go from theory to action with quick tools and FAQs.",
              zh: "看完小常识后，可以直接进入工具页实操，效率更高。",
              es: "Pasa de la teoria a la practica con las herramientas y FAQ.",
              fr: "Passez de la theorie a la pratique via les outils et la FAQ.",
              ru: "Переходите от теории к практике через инструменты и FAQ.",
              ar: "انتقل من المعرفة إلى التطبيق عبر الأدوات وصفحة الأسئلة الشائعة.",
            })}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-sm px-4 py-2 rounded-xl bg-white border border-[#d7e4dc] hover:border-[#3d6b4f]">
              {localeText({ en: "Open Converter", zh: "打开换算器", es: "Abrir convertidor", fr: "Ouvrir le convertisseur", ru: "Открыть конвертер", ar: "فتح المحول" })}
            </Link>
            <Link href="/faq" className="text-sm px-4 py-2 rounded-xl bg-white border border-[#d7e4dc] hover:border-[#3d6b4f]">
              {localeText({ en: "Read FAQ", zh: "查看 FAQ", es: "Ver FAQ", fr: "Voir la FAQ", ru: "Открыть FAQ", ar: "عرض الأسئلة الشائعة" })}
            </Link>
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

