// app/ai/[tool]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import TokenCalculator    from "@/components/TokenCalculator";
import ModelSizeEstimator from "@/components/ModelSizeEstimator";
import ApiCostEstimator   from "@/components/ApiCostEstimator";
import ContextWindow      from "@/components/ContextWindow";
import ComputeConverter   from "@/components/ComputeConverter";
import { LocaleText, TransKey } from "@/components/LocaleText";
import { BASE_URL, buildPageAlternates } from "@/lib/seo";

interface Props { params: { tool: string } }

const TOOL_I18N = {
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

export async function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  if (!tool) return {};
  const pagePath = `/ai/${tool.slug}`;
  const pageUrl = `${BASE_URL}${pagePath}/`;
  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: buildPageAlternates(pagePath),
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url: pageUrl,
      type: "website",
    },
  };
}

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "token-calculator":  TokenCalculator,
  "model-size":        ModelSizeEstimator,
  "api-cost":          ApiCostEstimator,
  "context-window":    ContextWindow,
  "compute-units":     ComputeConverter,
};

export default function AiToolPage({ params }: Props) {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  if (!tool) notFound();

  const ToolComponent = TOOL_COMPONENTS[params.tool];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.description,
    "url": `${BASE_URL}/ai/${tool.slug}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "provider": { "@type": "Organization", "name": "Koverts", "url": BASE_URL },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",      "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "AI Tools",  "item": `${BASE_URL}/ai` },
      { "@type": "ListItem", "position": 3, "name": tool.title,  "item": `${BASE_URL}/ai/${tool.slug}` },
    ],
  };

  return (
    <main className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-4xl mx-auto px-6">

        <header className="flex items-center justify-between pt-6 md:pt-8">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <Link href="/" className="flex items-baseline gap-1.5 flex-shrink-0 group">
              <span className="font-sans font-bold text-[20px] md:text-[24px] tracking-tight text-[#1a1814] group-hover:text-[#3d6b4f] transition-colors">
                Koverts
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f] mb-0.5" />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f] transition-colors flex-shrink-0">
              <TransKey k="aiTools" fallback="AI Tools" />
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[100px] md:max-w-[200px]">
              {tool.title}
            </span>
          </div>
        </header>

        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {tool.icon} <LocaleText en="AI Tool" zh="AI 工具" es="Herramienta IA" fr="Outil IA" ru="AI-инструмент" ar="أداة ذكاء اصطناعي" />
          </div>
          <h1 className="font-sans font-bold text-[clamp(32px,5vw,52px)] tracking-tight leading-tight mb-3">
            <LocaleText
              en={tool.title}
              zh={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.zh?.title ?? tool.title}
              es={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.es?.title ?? tool.title}
              fr={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.fr?.title ?? tool.title}
              ru={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.ru?.title ?? tool.title}
              ar={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.ar?.title ?? tool.title}
            />
          </h1>
          <p className="text-[#9a948a] text-sm max-w-lg leading-relaxed">
            <LocaleText
              en={tool.description}
              zh={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.zh?.desc ?? tool.description}
              es={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.es?.desc ?? tool.description}
              fr={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.fr?.desc ?? tool.description}
              ru={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.ru?.desc ?? tool.description}
              ar={TOOL_I18N[tool.slug as keyof typeof TOOL_I18N]?.ar?.desc ?? tool.description}
            />
          </p>
        </section>

        <ToolComponent />

        <footer className="border-t border-[#e4e0da] py-8 mt-16 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← <TransKey k="aiTools" fallback="AI Tools" /></Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
        </footer>
      </div>
    </main>
  );
}
