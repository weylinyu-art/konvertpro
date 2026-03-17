"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";

type Tip = {
  title: { en: string; zh: string; es: string; fr: string; ru: string; ar: string };
  body: { en: string; zh: string; es: string; fr: string; ru: string; ar: string };
};

const TIPS: Tip[] = [
  {
    title: {
      en: "Use a stable reference unit first",
      zh: "先换算到“基准单位”更稳妥",
      es: "Convierte primero a una unidad de referencia",
      fr: "Passez d'abord par une unite de reference",
      ru: "Сначала переводите в базовую единицу",
      ar: "حوّل أولًا إلى وحدة مرجعية ثابتة",
    },
    body: {
      en: "For complex chains, convert to a base unit (meter, kilogram, liter) before converting again to reduce mistakes.",
      zh: "如果是多步换算，先转成米、千克、升等基准单位，再转目标单位，能明显降低出错率。",
      es: "En conversiones en cadena, usa primero una unidad base para reducir errores.",
      fr: "Pour les conversions en chaine, passez d'abord par une unite de base pour eviter les erreurs.",
      ru: "При сложных цепочках сначала переводите в базовую единицу, так меньше ошибок.",
      ar: "في التحويلات المتسلسلة، التحويل إلى وحدة أساسية أولًا يقلل الأخطاء.",
    },
  },
  {
    title: {
      en: "Pay attention to US vs UK measurement systems",
      zh: "注意区分美制与英制",
      es: "Diferencia entre sistema US y UK",
      fr: "Distinguez systeme US et UK",
      ru: "Различайте американскую и британскую системы",
      ar: "انتبه للفرق بين النظام الأمريكي والبريطاني",
    },
    body: {
      en: "Units like gallon and pint can differ by region. Confirm the system before comparing results.",
      zh: "加仑、品脱等单位在不同体系下数值不同，跨地区数据对比前要先确认单位体系。",
      es: "Unidades como gallon o pinta varian segun la region. Verifica el sistema antes de comparar.",
      fr: "Des unites comme gallon ou pinte varient selon les pays. Verifiez le systeme utilise.",
      ru: "Галлон и пинта различаются по системе. Перед сравнением уточняйте стандарт.",
      ar: "وحدات مثل الغالون والبنت تختلف حسب النظام. تحقق من النظام قبل المقارنة.",
    },
  },
  {
    title: {
      en: "Temperature conversion is not linear scaling only",
      zh: "温度换算不是单纯比例换算",
      es: "La temperatura no se convierte solo por proporcion",
      fr: "La temperature n'est pas une simple proportion",
      ru: "Температура переводится не только по коэффициенту",
      ar: "تحويل الحرارة ليس مجرد نسبة ثابتة",
    },
    body: {
      en: "Celsius/Fahrenheit includes an offset, not just multiplication. Always use the correct formula.",
      zh: "摄氏和华氏之间有偏移量，不只是乘系数。务必使用标准公式。",
      es: "Celsius/Fahrenheit requiere desplazamiento, no solo multiplicacion.",
      fr: "Celsius/Fahrenheit implique un decalage, pas seulement un multiplicateur.",
      ru: "Для Цельсия и Фаренгейта нужен сдвиг, а не только умножение.",
      ar: "بين سلسيوس وفهرنهايت يوجد إزاحة ثابتة، وليس ضربًا فقط.",
    },
  },
  {
    title: {
      en: "Control decimal precision by scenario",
      zh: "按场景控制小数位",
      es: "Ajusta los decimales segun el escenario",
      fr: "Ajustez la precision selon le contexte",
      ru: "Выбирайте точность под задачу",
      ar: "اضبط عدد المنازل العشرية حسب الاستخدام",
    },
    body: {
      en: "Cooking can use fewer decimals, while engineering may need more precision. Avoid over-rounding too early.",
      zh: "烹饪场景可少保留小数，工程场景应提高精度；不要在中间步骤过早四舍五入。",
      es: "En cocina bastan pocos decimales; en ingenieria se requiere mayor precision.",
      fr: "En cuisine, peu de decimales suffisent; en ingenierie, plus de precision est necessaire.",
      ru: "Для кухни достаточно меньшей точности, для инженерии нужна более высокая.",
      ar: "في الطبخ تكفي دقة أقل، بينما في الهندسة تحتاج دقة أعلى.",
    },
  },
  {
    title: {
      en: "Use common benchmark values for sanity checks",
      zh: "用常见基准值做校验",
      es: "Usa valores de referencia para validar",
      fr: "Utilisez des valeurs repere pour verifier",
      ru: "Проверяйте результат по эталонным значениям",
      ar: "استخدم قيما مرجعية للتحقق السريع",
    },
    body: {
      en: "For example, 1 inch = 2.54 cm and 1 mile = 1.609 km. Quick checks catch input mistakes early.",
      zh: "例如 1 英寸=2.54 厘米、1 英里≈1.609 公里。先做心算校验可快速发现输入错误。",
      es: "Por ejemplo, 1 pulgada=2.54 cm y 1 milla=1.609 km para detectar errores rapido.",
      fr: "Par exemple 1 pouce=2,54 cm et 1 mile=1,609 km pour verifier rapidement.",
      ru: "Например, 1 дюйм=2,54 см и 1 миля=1,609 км — это помогает быстро проверять.",
      ar: "مثلًا 1 بوصة = 2.54 سم و1 ميل ≈ 1.609 كم، للتحقق السريع من النتائج.",
    },
  },
];

export default function ConversionTipsPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const localeText = <T,>(m: { en: T; zh: T; es: T; fr: T; ru: T; ar: T }) => m[locale];

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
              es: "Guia rapida para conversiones diarias, util para estudio y trabajo.",
              fr: "Guide rapide pour les conversions du quotidien, utile en etude et en travail.",
              ru: "Краткий гид для частых задач конвертации в учебе и работе.",
              ar: "دليل سريع لمهام التحويل اليومية، مناسب للدراسة والعمل.",
            })}
          </p>
        </section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIPS.map((tip, i) => (
            <article key={i} className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-[#1a1814] mb-2">{localeText(tip.title)}</h2>
              <p className="text-sm text-[#6a6460] leading-relaxed">{localeText(tip.body)}</p>
            </article>
          ))}
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← {t.allConverters}</Link>
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
        </footer>
      </div>
    </main>
  );
}

