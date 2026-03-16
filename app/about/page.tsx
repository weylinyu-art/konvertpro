"use client";
// app/about/page.tsx

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { CATEGORIES } from "@/lib/units";
import { getTranslations, getCategoryLabel } from "@/lib/i18n";

export default function AboutPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const localeText = <T,>(m: { en: T; zh: T; es: T; fr: T; ru: T; ar: T }) => m[locale];
  const STATS = [
    { value: "1,200+", label: localeText({ en: "Conversion pages", zh: "换算页面", es: "Páginas de conversión", fr: "Pages de conversion", ru: "Страниц конвертации", ar: "صفحات التحويل" }) },
    { value: "16", label: localeText({ en: "Unit categories", zh: "单位分类", es: "Categorías de unidades", fr: "Catégories d'unités", ru: "Категорий единиц", ar: "فئات الوحدات" }) },
    { value: "6", label: localeText({ en: "Languages", zh: "支持语言", es: "Idiomas", fr: "Langues", ru: "Языков", ar: "اللغات" }) },
    { value: "0", label: localeText({ en: "Ads (for now)", zh: "广告（当前）", es: "Anuncios (por ahora)", fr: "Publicités (pour l'instant)", ru: "Реклама (пока нет)", ar: "إعلانات (حاليًا)" }) },
  ];
  const VALUES = [
    {
      icon: "⚡",
      title: localeText({ en: "Instant", zh: "即时", es: "Instantáneo", fr: "Instantané", ru: "Мгновенно", ar: "فوري" }),
      desc: localeText({
        en: "Results appear as you type. No buttons to press, no page reloads. We believe tools should get out of your way.",
        zh: "输入即出结果，无需反复点击按钮，也不需要刷新页面。我们希望工具本身尽量“无感”。",
        es: "Los resultados aparecen mientras escribes. Sin botones ni recargas de página.",
        fr: "Les résultats apparaissent pendant la saisie, sans bouton ni rechargement.",
        ru: "Результаты появляются сразу при вводе — без кнопок и перезагрузок.",
        ar: "تظهر النتائج أثناء الكتابة دون أزرار إضافية أو إعادة تحميل الصفحة.",
      }),
    },
    {
      icon: "🎯",
      title: localeText({ en: "Accurate", zh: "准确", es: "Preciso", fr: "Précis", ru: "Точно", ar: "دقيق" }),
      desc: localeText({
        en: "Every conversion factor is sourced from official standards bodies — NIST, ISO, and international metrology organizations.",
        zh: "核心换算因子来自权威标准体系与计量规范，保证日常与专业场景下都可用。",
        es: "Los factores de conversión se basan en estándares oficiales y de metrología.",
        fr: "Les facteurs de conversion proviennent de normes officielles de métrologie.",
        ru: "Коэффициенты основаны на официальных стандартах и метрологии.",
        ar: "تعتمد عوامل التحويل على معايير رسمية وهيئات قياس موثوقة.",
      }),
    },
    {
      icon: "🌍",
      title: localeText({ en: "Global", zh: "全球可用", es: "Global", fr: "Global", ru: "Глобально", ar: "عالمي" }),
      desc: localeText({
        en: "Available in 6 UN working languages with automatic browser detection.",
        zh: "支持 6 种联合国工作语言并自动识别浏览器语言。无论你在哪个国家，都能顺畅使用。",
        es: "Disponible en 6 idiomas oficiales de la ONU con detección automática del navegador.",
        fr: "Disponible en 6 langues de travail de l'ONU avec détection automatique du navigateur.",
        ru: "Поддерживает 6 рабочих языков ООН и автоматическое определение языка браузера.",
        ar: "متاح بـ 6 لغات عمل للأمم المتحدة مع اكتشاف تلقائي للغة المتصفح.",
      }),
    },
    {
      icon: "🤖",
      title: localeText({ en: "AI-Ready", zh: "面向 AI 时代", es: "Listo para IA", fr: "Prêt pour l'IA", ru: "Готово для ИИ", ar: "جاهز للذكاء الاصطناعي" }),
      desc: localeText({
        en: "Beyond unit conversion, we built tools for the AI era — token calculators, model size estimators, and API cost comparisons.",
        zh: "除了单位换算，我们还提供 Token 计算、模型显存估算、API 成本测算等开发者常用工具。",
        es: "Además de conversiones, ofrecemos herramientas de IA: tokens, tamaño de modelo y coste de API.",
        fr: "Au-delà des conversions, nous proposons des outils IA : tokens, taille de modèle et coûts API.",
        ru: "Помимо конвертации, есть AI-инструменты: токены, размер модели и стоимость API.",
        ar: "إضافة إلى التحويل، نوفر أدوات ذكاء اصطناعي مثل حساب الرموز وتقدير حجم النموذج وتكلفة API.",
      }),
    },
  ];

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
              ← {localeText({ en: "Back", zh: "返回", es: "Volver", fr: "Retour", ru: "Назад", ar: "رجوع" })}
            </Link>
            {mounted && <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />}
          </div>
        </header>

        {/* Hero */}
        <section className="pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-8">
            🌿 {localeText({ en: "About Koverts", zh: "关于 Koverts", es: "Acerca de Koverts", fr: "À propos de Koverts", ru: "О Koverts", ar: "حول Koverts" })}
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-bold tracking-tight leading-[1.05] mb-6">
            {localeText({
              en: "Built for people who just need the answer.",
              zh: "为“只想快速得到答案”的人而做",
              es: "Hecho para quienes solo necesitan la respuesta.",
              fr: "Conçu pour ceux qui veulent juste la réponse.",
              ru: "Создано для тех, кому нужен только ответ.",
              ar: "مصمم لمن يريد الإجابة مباشرة.",
            })}
          </h1>
          <p className="text-[#6a6460] text-lg leading-relaxed max-w-2xl">
            {localeText({
              en: "Koverts started with a simple frustration: many converters were slow, ad-heavy, and hard to use. So we built the tool we wanted to use ourselves.",
              zh: "Koverts 起源于一个简单痛点：很多在线换算网站广告多、流程长、还要注册。我们只想做一个打开就能用、结果可靠、体验干净的换算工具。",
              es: "Koverts nació de una frustración simple: muchos conversores eran lentos y llenos de anuncios. Construimos la herramienta que queríamos usar.",
              fr: "Koverts est né d'une frustration simple : trop de convertisseurs étaient lents et encombrés de publicités. Nous avons créé l'outil que nous voulions utiliser.",
              ru: "Koverts появился из простой проблемы: многие конвертеры были медленными и перегруженными рекламой. Мы сделали инструмент, которым хотели пользоваться сами.",
              ar: "بدأ Koverts من مشكلة بسيطة: كثير من أدوات التحويل كانت بطيئة ومليئة بالإعلانات. لذلك بنينا الأداة التي نريد استخدامها نحن.",
            })}
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
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-6">{localeText({ en: "Our story", zh: "我们的故事", es: "Nuestra historia", fr: "Notre histoire", ru: "Наша история", ar: "قصتنا" })}</p>
            <div className="space-y-4 text-[#4a4540] leading-relaxed">
              <p>{localeText({ en: "Our goal is straightforward: fast loading, clean interface, and no distractions.", zh: "我们的目标很直接：加载要快、设备要兼容、体验要纯净。不弹窗，不诱导注册，不打断操作。你来就是为了答案，我们就把答案给你。", es: "Nuestro objetivo es simple: carga rápida, interfaz limpia y sin distracciones.", fr: "Notre objectif est simple : chargement rapide, interface claire et sans distraction.", ru: "Наша цель проста: быстрая загрузка, чистый интерфейс и никаких отвлекающих факторов.", ar: "هدفنا بسيط: تحميل سريع وواجهة نظيفة دون إزعاج." })}</p>
              <p>{localeText({ en: "We started with core categories and expanded based on real search demand. Today we cover 16 categories and 1,200+ pages.", zh: "最初我们先做长度、重量、温度等基础换算，然后基于真实搜索需求持续扩展，增加了烹饪、油耗、鞋码等高频场景。现在已覆盖 16 个分类、1200+ 页面。", es: "Comenzamos con categorías básicas y ampliamos según la demanda real. Hoy cubrimos 16 categorías y más de 1.200 páginas.", fr: "Nous avons commencé par les catégories de base puis élargi selon la demande réelle. Aujourd'hui : 16 catégories et plus de 1 200 pages.", ru: "Мы начали с базовых категорий и расширялись по реальному спросу. Сейчас: 16 категорий и более 1200 страниц.", ar: "بدأنا بالفئات الأساسية وتوسعنا حسب الطلب الفعلي. اليوم لدينا 16 فئة وأكثر من 1200 صفحة." })}</p>
              <p>{localeText({ en: "Our AI tools were built from real developer needs: token counting, VRAM estimation, and API cost comparison.", zh: "AI 工具模块也源于真实开发需求：我们自己经常要算 Token、估显存、比 API 成本，于是把这些工具一起做进来并免费开放。", es: "Nuestras herramientas de IA nacieron de necesidades reales: tokens, VRAM y costes de API.", fr: "Nos outils IA répondent à des besoins réels : tokens, VRAM et coûts API.", ru: "AI-инструменты появились из практических задач: токены, VRAM и стоимость API.", ar: "أدوات الذكاء الاصطناعي لدينا جاءت من احتياجات حقيقية: الرموز وذاكرة VRAM وتكلفة API." })}</p>
              <p>{localeText({ en: "Koverts supports 6 UN working languages and auto-detects your browser language.", zh: "Koverts 目前支持 6 种联合国工作语言（中文、英文、西班牙语、法语、俄语、阿拉伯语），并会基于浏览器自动识别。", es: "Koverts admite 6 idiomas de trabajo de la ONU y detecta automáticamente el idioma del navegador.", fr: "Koverts prend en charge 6 langues de travail de l'ONU et détecte automatiquement la langue du navigateur.", ru: "Koverts поддерживает 6 рабочих языков ООН и автоматически определяет язык браузера.", ar: "يدعم Koverts ست لغات عمل للأمم المتحدة ويكتشف لغة المتصفح تلقائيًا." })}</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-6">
            // {localeText({ en: "What we stand for", zh: "我们的原则", es: "Nuestros principios", fr: "Nos principes", ru: "Наши принципы", ar: "مبادئنا" })}
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
                <h2 className="font-bold text-[#1a1814] mb-2">{localeText({ en: "Privacy by default", zh: "默认隐私优先", es: "Privacidad por defecto", fr: "Confidentialité par défaut", ru: "Конфиденциальность по умолчанию", ar: "الخصوصية أولًا" })}</h2>
                <p className="text-sm text-[#4a4540] leading-relaxed">
                  {localeText({
                    en: "Koverts does not collect personal data, require accounts, or track individual users. Converter inputs are processed in your browser.",
                    zh: "Koverts 不收集个人信息，不强制注册，也不做个人级追踪。你输入的换算值仅在浏览器中计算，不会上传到我们的服务器。我们只使用最小化、隐私友好的统计来优化工具。",
                    es: "Koverts no recopila datos personales ni exige cuentas. Los cálculos se realizan en tu navegador.",
                    fr: "Koverts ne collecte pas de données personnelles et n'exige pas de compte. Les calculs se font dans votre navigateur.",
                    ru: "Koverts не собирает персональные данные и не требует аккаунт. Расчеты выполняются в браузере.",
                    ar: "لا يجمع Koverts بيانات شخصية ولا يفرض إنشاء حساب. تتم الحسابات داخل متصفحك.",
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">{localeText({ en: "Contact", zh: "联系", es: "Contacto", fr: "Contact", ru: "Контакты", ar: "اتصل بنا" })}</p>
            <p className="text-sm text-[#4a4540] leading-relaxed mb-4">
              {localeText({
                en: "Have a suggestion for a new converter? Found a calculation error? We'd love to hear from you.",
                zh: "有新功能建议，或发现计算问题？欢迎随时联系，我们会认真处理每一条反馈。",
                es: "¿Tienes sugerencias o encontraste un error? Nos encantará escucharte.",
                fr: "Une suggestion ou une erreur de calcul ? Nous serions ravis d'avoir votre retour.",
                ru: "Есть предложение или нашли ошибку? Будем рады обратной связи.",
                ar: "هل لديك اقتراح أو وجدت خطأ؟ يسعدنا سماع ملاحظاتك.",
              })}
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
            // {localeText({ en: "Start converting", zh: "开始使用", es: "Empieza a convertir", fr: "Commencer à convertir", ru: "Начать конвертацию", ar: "ابدأ التحويل" })}
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
