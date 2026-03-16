"use client";
// app/ai/page.tsx
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import { useLocale } from "@/components/LocaleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "@/lib/i18n";

const AI_I18N = {
  "token-calculator": {
    zh: { title: "Token 计算器", desc: "快速估算文本 token 数，支持常见 LLM 场景。" },
    es: { title: "Calculadora de tokens", desc: "Estimación rápida de tokens para texto y LLM." },
    fr: { title: "Calculateur de tokens", desc: "Estimation rapide du nombre de tokens pour les LLM." },
    ru: { title: "Калькулятор токенов", desc: "Быстрая оценка количества токенов для LLM." },
    ar: { title: "حاسبة الرموز", desc: "تقدير سريع لعدد الرموز لنصوص نماذج اللغة." },
  },
  "model-size": {
    zh: { title: "模型显存估算", desc: "按参数量与精度估算模型运行所需显存。" },
    es: { title: "Estimador de memoria del modelo", desc: "Calcula la memoria necesaria por parámetros y precisión." },
    fr: { title: "Estimateur de mémoire modèle", desc: "Estime la mémoire requise selon paramètres et précision." },
    ru: { title: "Оценка памяти модели", desc: "Оценка потребления памяти по параметрам и точности." },
    ar: { title: "تقدير ذاكرة النموذج", desc: "تقدير الذاكرة المطلوبة حسب عدد المعاملات والدقة." },
  },
  "api-cost": {
    zh: { title: "API 成本计算", desc: "按 token 与调用量估算不同模型 API 成本。" },
    es: { title: "Calculadora de coste API", desc: "Estima costes API por tokens y volumen de llamadas." },
    fr: { title: "Calculateur de coût API", desc: "Estimez les coûts API selon tokens et volume." },
    ru: { title: "Калькулятор стоимости API", desc: "Оценка стоимости API по токенам и объему." },
    ar: { title: "حاسبة تكلفة API", desc: "تقدير تكلفة API بناءً على الرموز وحجم الاستدعاءات." },
  },
  "context-window": {
    zh: { title: "上下文窗口", desc: "对比不同模型上下文窗口容量与可处理文本规模。" },
    es: { title: "Ventana de contexto", desc: "Compara tamaños de contexto y capacidad de texto por modelo." },
    fr: { title: "Fenêtre de contexte", desc: "Compare les tailles de contexte et la capacité de texte." },
    ru: { title: "Контекстное окно", desc: "Сравнение размеров контекста и объема текста." },
    ar: { title: "نافذة السياق", desc: "مقارنة أحجام نافذة السياق وسعة النص في النماذج." },
  },
  "compute-units": {
    zh: { title: "算力单位换算", desc: "FLOPS、TFLOPS、PFLOPS 等算力单位快速换算。" },
    es: { title: "Conversor de unidades de cómputo", desc: "Convierte FLOPS, TFLOPS, PFLOPS y más." },
    fr: { title: "Convertisseur d'unités de calcul", desc: "Conversion rapide FLOPS, TFLOPS, PFLOPS, etc." },
    ru: { title: "Конвертер вычислительных единиц", desc: "Быстрое преобразование FLOPS, TFLOPS, PFLOPS и др." },
    ar: { title: "محول وحدات القدرة الحاسوبية", desc: "تحويل سريع بين FLOPS وTFLOPS وPFLOPS وغيرها." },
  },
} as const;

export default function AiPage() {
  const { locale, setLocale, mounted } = useLocale();
  const t = getTranslations(locale);
  const localeText = <T,>(m: { en: T; zh: T; es: T; fr: T; ru: T; ar: T }) => m[locale];

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
            {localeText({
              en: "Built for LLM developers & AI enthusiasts",
              zh: "为 LLM 开发者与 AI 从业者打造",
              es: "Creado para desarrolladores LLM y entusiastas de la IA",
              fr: "Conçu pour les développeurs LLM et les passionnés d'IA",
              ru: "Создано для разработчиков LLM и энтузиастов ИИ",
              ar: "مصمم لمطوري نماذج اللغة وعشاق الذكاء الاصطناعي",
            })}
          </div>
          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-[1.05] tracking-tight mb-4">
            {locale === "zh" ? (
              <>AI 与 LLM <em className="italic text-[#3d6b4f]">工具集</em></>
            ) : locale === "es" ? (
              <>Calculadoras <em className="italic text-[#3d6b4f]">IA y LLM</em></>
            ) : locale === "fr" ? (
              <>Outils <em className="italic text-[#3d6b4f]">IA & LLM</em></>
            ) : locale === "ru" ? (
              <>Калькуляторы <em className="italic text-[#3d6b4f]">AI и LLM</em></>
            ) : locale === "ar" ? (
              <>أدوات <em className="italic text-[#3d6b4f]">الذكاء الاصطناعي وLLM</em></>
            ) : (
              <>AI & LLM <em className="italic text-[#3d6b4f]">Calculators</em></>
            )}
          </h1>
          <p className="text-[#9a948a] text-base font-light max-w-md mx-auto leading-relaxed">
            {localeText({
              en: "Token counts, model memory, API costs, context windows — everything you need when working with large language models.",
              zh: "Token 计数、模型显存、API 成本、上下文窗口等，覆盖大模型开发常用计算场景。",
              es: "Conteo de tokens, memoria de modelos, costes de API y ventanas de contexto: todo lo que necesitas para trabajar con LLM.",
              fr: "Comptage de tokens, mémoire modèle, coûts API, fenêtre de contexte : tout ce qu'il faut pour travailler avec les LLM.",
              ru: "Подсчет токенов, память модели, стоимость API и контекстное окно — все, что нужно для работы с LLM.",
              ar: "حساب الرموز، ذاكرة النموذج، تكاليف API، ونوافذ السياق — كل ما تحتاجه للعمل مع نماذج اللغة الكبيرة.",
            })}
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
                    {AI_I18N[tool.slug as keyof typeof AI_I18N]?.[locale as "zh" | "es" | "fr" | "ru" | "ar"]?.title ?? tool.title}
                  </h2>
                  <p className="text-sm text-[#9a948a] leading-relaxed">
                    {AI_I18N[tool.slug as keyof typeof AI_I18N]?.[locale as "zh" | "es" | "fr" | "ru" | "ar"]?.desc ?? tool.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 font-mono text-xs text-[#3d6b4f] opacity-0 group-hover:opacity-100 transition-opacity">
                {localeText({
                  en: "Open tool",
                  zh: "打开工具",
                  es: "Abrir herramienta",
                  fr: "Ouvrir l'outil",
                  ru: "Открыть инструмент",
                  ar: "فتح الأداة",
                })} →
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
