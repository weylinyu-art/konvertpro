"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";

type QA = {
  q: { en: string; zh: string; es: string; fr: string; ru: string; ar: string };
  a: { en: string; zh: string; es: string; fr: string; ru: string; ar: string };
};

const FAQS: QA[] = [
  {
    q: {
      en: "What can I convert on Koverts?",
      zh: "Koverts 可以换算哪些内容？",
      es: "¿Qué puedo convertir en Koverts?",
      fr: "Que puis-je convertir sur Koverts ?",
      ru: "Что можно конвертировать в Koverts?",
      ar: "ماذا يمكنني تحويله في Koverts؟",
    },
    a: {
      en: "You can convert length, weight, temperature, volume, speed, area, data, time, energy, pressure, angle, power, fuel efficiency, cooking units, shoe size, number base, and currency.",
      zh: "支持长度、重量、温度、体积、速度、面积、数据、时间、能量、压强、角度、功率、油耗、烹饪、鞋码、进制与汇率换算。",
      es: "Puedes convertir longitud, peso, temperatura, volumen, velocidad, área, datos, tiempo, energía, presión, ángulo, potencia, combustible, cocina, talla, base numérica y divisas.",
      fr: "Vous pouvez convertir longueur, poids, température, volume, vitesse, surface, données, temps, énergie, pression, angle, puissance, carburant, cuisine, pointure, base numérique et devises.",
      ru: "Поддерживаются длина, вес, температура, объем, скорость, площадь, данные, время, энергия, давление, углы, мощность, расход топлива, кулинарные единицы, размеры обуви, системы счисления и валюты.",
      ar: "يمكنك تحويل الطول والوزن والحرارة والحجم والسرعة والمساحة والبيانات والوقت والطاقة والضغط والزوايا والقدرة وكفاءة الوقود ووحدات الطبخ ومقاسات الأحذية وأنظمة الأعداد والعملات.",
    },
  },
  {
    q: {
      en: "Are results instant?",
      zh: "结果是实时的吗？",
      es: "¿Los resultados son instantáneos?",
      fr: "Les résultats sont-ils instantanés ?",
      ru: "Результаты мгновенные?",
      ar: "هل النتائج فورية؟",
    },
    a: {
      en: "Yes. The result updates immediately after you enter a value or change units.",
      zh: "是的。输入数值或切换单位后会立即更新结果。",
      es: "Sí. El resultado se actualiza al instante al cambiar valor o unidades.",
      fr: "Oui. Le résultat est mis à jour immédiatement après la saisie ou le changement d'unité.",
      ru: "Да. Результат обновляется сразу после ввода значения или смены единиц.",
      ar: "نعم. يتم تحديث النتيجة فور إدخال القيمة أو تغيير الوحدة.",
    },
  },
  {
    q: {
      en: "Do I need an account?",
      zh: "需要注册账号吗？",
      es: "¿Necesito registrarme?",
      fr: "Dois-je créer un compte ?",
      ru: "Нужна ли регистрация?",
      ar: "هل أحتاج إلى حساب؟",
    },
    a: {
      en: "No. Koverts is free and does not require signup.",
      zh: "不需要。Koverts 免费且无需注册。",
      es: "No. Koverts es gratis y no requiere registro.",
      fr: "Non. Koverts est gratuit et sans inscription.",
      ru: "Нет. Koverts бесплатен и не требует регистрации.",
      ar: "لا. Koverts مجاني ولا يتطلب التسجيل.",
    },
  },
  {
    q: {
      en: "Where do currency rates come from?",
      zh: "汇率数据来源于哪里？",
      es: "¿De dónde provienen los tipos de cambio?",
      fr: "D'où viennent les taux de change ?",
      ru: "Откуда берутся курсы валют?",
      ar: "ما مصدر أسعار الصرف؟",
    },
    a: {
      en: "Currency data comes from the European Central Bank (via Frankfurter API) and is updated daily on business days.",
      zh: "汇率来自欧洲央行（通过 Frankfurter API），通常在工作日按日更新。",
      es: "Los tipos de cambio provienen del BCE (vía Frankfurter API) y se actualizan diariamente en días hábiles.",
      fr: "Les taux proviennent de la BCE (via l'API Frankfurter) et sont mis à jour quotidiennement les jours ouvrés.",
      ru: "Курсы валют поступают от ЕЦБ (через Frankfurter API) и обновляются ежедневно в рабочие дни.",
      ar: "تأتي أسعار الصرف من البنك المركزي الأوروبي (عبر Frankfurter API) ويتم تحديثها يوميًا في أيام العمل.",
    },
  },
  {
    q: {
      en: "Can I use Koverts on mobile?",
      zh: "移动端能正常使用吗？",
      es: "¿Funciona en móvil?",
      fr: "Puis-je l'utiliser sur mobile ?",
      ru: "Работает ли сервис на мобильных?",
      ar: "هل يعمل على الجوال؟",
    },
    a: {
      en: "Yes. Koverts is responsive and optimized for both mobile and desktop.",
      zh: "可以。Koverts 已针对移动端和桌面端做了适配优化。",
      es: "Sí. Koverts está optimizado para móvil y escritorio.",
      fr: "Oui. Koverts est optimisé pour mobile et desktop.",
      ru: "Да. Koverts адаптирован для мобильных и десктопов.",
      ar: "نعم. تم تحسين Koverts للجوال وسطح المكتب.",
    },
  },
  {
    q: {
      en: "Does Koverts support multiple languages?",
      zh: "支持多语言吗？",
      es: "¿Soporta varios idiomas?",
      fr: "Prend-il en charge plusieurs langues ?",
      ru: "Поддерживаются ли разные языки?",
      ar: "هل يدعم عدة لغات؟",
    },
    a: {
      en: "Yes. Koverts currently supports English, Chinese, Spanish, French, Russian, and Arabic.",
      zh: "支持。当前提供英语、中文、西班牙语、法语、俄语和阿拉伯语。",
      es: "Sí. Actualmente soporta inglés, chino, español, francés, ruso y árabe.",
      fr: "Oui. Koverts prend en charge l'anglais, le chinois, l'espagnol, le français, le russe et l'arabe.",
      ru: "Да. Сейчас поддерживаются английский, китайский, испанский, французский, русский и арабский.",
      ar: "نعم. يدعم Koverts حاليًا الإنجليزية والصينية والإسبانية والفرنسية والروسية والعربية.",
    },
  },
  {
    q: {
      en: "How accurate are conversion factors?",
      zh: "换算系数准确吗？",
      es: "¿Qué tan precisos son los factores de conversión?",
      fr: "Quelle est la précision des facteurs de conversion ?",
      ru: "Насколько точны коэффициенты конвертации?",
      ar: "ما دقة عوامل التحويل؟",
    },
    a: {
      en: "Conversion factors are based on standard references and are suitable for common learning and work scenarios.",
      zh: "换算系数基于标准参考，适用于常见学习和工作场景。",
      es: "Los factores de conversión se basan en referencias estándar y son adecuados para uso diario.",
      fr: "Les facteurs sont basés sur des références standard et conviennent aux usages courants.",
      ru: "Коэффициенты основаны на стандартных справочных данных и подходят для типовых задач.",
      ar: "تعتمد عوامل التحويل على مراجع قياسية وهي مناسبة للاستخدامات اليومية.",
    },
  },
  {
    q: {
      en: "Can I deep-link specific conversion pages?",
      zh: "可以直接分享某个换算页面吗？",
      es: "¿Puedo compartir una página de conversión específica?",
      fr: "Puis-je partager une page de conversion précise ?",
      ru: "Можно ли делиться конкретной страницей конвертации?",
      ar: "هل يمكن مشاركة صفحة تحويل محددة؟",
    },
    a: {
      en: "Yes. Every conversion page has a unique URL and can be shared directly.",
      zh: "可以。每个换算页面都有独立链接，可直接分享。",
      es: "Sí. Cada página de conversión tiene una URL única para compartir.",
      fr: "Oui. Chaque page de conversion dispose d'une URL unique partageable.",
      ru: "Да. У каждой страницы конвертации есть уникальная ссылка для прямого шаринга.",
      ar: "نعم. لكل صفحة تحويل رابط مستقل يمكن مشاركته مباشرة.",
    },
  },
];

export default function FaqPage() {
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
            ❓ {localeText({ en: "FAQ", zh: "常见问题", es: "FAQ", fr: "FAQ", ru: "FAQ", ar: "الأسئلة الشائعة" })}
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-[1.08] mb-4">
            {localeText({
              en: "Frequently Asked Questions",
              zh: "常见问题汇总",
              es: "Preguntas frecuentes",
              fr: "Questions frequentes",
              ru: "Часто задаваемые вопросы",
              ar: "الأسئلة الشائعة",
            })}
          </h1>
          <p className="text-[#6a6460] text-base leading-relaxed max-w-2xl">
            {localeText({
              en: "Find quick answers about conversion coverage, data sources, language support, sharing, and usage.",
              zh: "这里集中回答关于支持范围、数据来源、多语言、分享方式与使用体验的高频问题。",
              es: "Encuentra respuestas rapidas sobre cobertura, fuentes de datos, idiomas, compartir y uso.",
              fr: "Retrouvez des reponses rapides sur la couverture, les sources, les langues, le partage et l'utilisation.",
              ru: "Здесь собраны быстрые ответы по охвату, источникам данных, языкам, шарингу и использованию.",
              ar: "اعثر على إجابات سريعة حول نطاق التحويل ومصادر البيانات ودعم اللغات والمشاركة وطريقة الاستخدام.",
            })}
          </p>
        </section>

        <section className="mb-16">
          <div className="space-y-2">
            {FAQS.map((item, i) => (
              <details key={i} className="group bg-white border border-[#e4e0da] rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#faf8f5] transition-colors">
                  <span className="font-medium text-sm text-[#1a1814] pr-4">{localeText(item.q)}</span>
                  <span className="text-[#9a948a] flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-5 pb-4 pt-3 text-sm text-[#6a6460] leading-relaxed border-t border-[#f0ede8]">
                  {localeText(item.a)}
                </div>
              </details>
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

