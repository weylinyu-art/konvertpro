// app/ai/[tool]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import {
  TokenCalculator,
  ModelSizeEstimator,
  ApiCostEstimator,
  ContextWindow,
  ComputeConverter,
} from "@/components/ai/AllTools";

interface Props { params: { tool: string } }

export async function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  if (!tool) return {};
  return { title: tool.title, description: tool.metaDescription };
}

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "token-calculator": TokenCalculator,
  "model-size":       ModelSizeEstimator,
  "api-cost":         ApiCostEstimator,
  "context-window":   ContextWindow,
  "compute-units":    ComputeConverter,
};

export default function AiToolPage({ params }: Props) {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  if (!tool) notFound();

  const ToolComponent = TOOL_COMPONENTS[params.tool];

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <header className="flex items-center justify-between pt-8">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-[28px] tracking-tight">Konvert</span>
            <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
          </Link>
          <nav className="font-mono text-xs text-[#9a948a] flex gap-2">
            <Link href="/ai" className="hover:text-[#3d6b4f]">AI Tools</Link>
            <span>/</span>
            <span>{tool.title}</span>
          </nav>
        </header>

        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {tool.icon} AI Tool
          </div>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight leading-tight mb-3">
            {tool.title}
          </h1>
          <p className="text-[#9a948a] text-sm max-w-lg leading-relaxed">{tool.description}</p>
        </section>

        {ToolComponent && <ToolComponent />}

        <footer className="border-t border-[#e4e0da] py-8 mt-16 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← AI Tools</Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Konvert</span>
        </footer>
      </div>
    </main>
  );
}
