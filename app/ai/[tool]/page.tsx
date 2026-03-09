"use client";
// app/ai/[tool]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import SiteHeader from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import { getTranslations } from "@/lib/i18n";
import TokenCalculator    from "@/components/ai/TokenCalculator";
import ModelSizeEstimator from "@/components/ai/ModelSizeEstimator";
import ApiCostEstimator   from "@/components/ai/ApiCostEstimator";
import ContextWindow      from "@/components/ai/ContextWindow";
import ComputeConverter   from "@/components/ai/ComputeConverter";

interface Props { params: { tool: string } }

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

  const { locale } = useLocale();
  const t = getTranslations(locale);
  const ToolComponent = TOOL_COMPONENTS[params.tool];

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        <SiteHeader crumbs={[
          { label: "AI Tools", href: "/ai" },
          { label: tool.title },
        ]} />

        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {tool.icon} AI Tool
          </div>
          <h1 className="font-sans font-bold text-[clamp(32px,5vw,52px)] tracking-tight leading-tight mb-3">
            {tool.title}
          </h1>
          <p className="text-[#9a948a] text-sm max-w-lg leading-relaxed">{tool.description}</p>
        </section>

        <ToolComponent />

        <footer className="border-t border-[#e4e0da] py-8 mt-16 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← AI Tools</Link>
          <span className="font-mono text-xs text-[#9a948a]">{t.copyright}</span>
        </footer>
      </div>
    </main>
  );
}
