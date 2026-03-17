"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";
import { TIP_MODULES, getArticleSlug } from "@/lib/conversion-tips-data";

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

        {TIP_MODULES.map((module, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a1814] mb-3">{localeText(module.title)}</h2>
            <p className="text-[#6a6460] text-sm md:text-base leading-relaxed mb-4">{localeText(module.intro)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.articles.map((tip, i) => (
                <article key={i} className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-[#1a1814] mb-2">
                    <Link href={`/conversion-tips/${getArticleSlug(module.key, i)}`} className="hover:text-[#3d6b4f] transition-colors">
                      {localeText(tip.title)}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#6a6460] leading-relaxed mb-3">{localeText(tip.summary)}</p>
                  <Link href={`/conversion-tips/${getArticleSlug(module.key, i)}`} className="text-xs text-[#3d6b4f] hover:text-[#31563f] underline">
                    {localeText({ en: "Read article", zh: "查看全文" })}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

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

