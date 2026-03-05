// app/ai/[tool]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import { getAiToolSeoContent } from "@/lib/ai-seo-content";
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
  const seo  = getAiToolSeoContent(params.tool);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.metaDescription,
    keywords: seo?.keywords ?? [],
  };
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

  const seo           = getAiToolSeoContent(params.tool);
  const ToolComponent = TOOL_COMPONENTS[params.tool];

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
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

        {/* Hero */}
        <section className="py-12">
          <div className="inline-flex items-center gap-2 bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-full px-4 py-1.5 text-xs font-mono text-[#3d6b4f] tracking-wider mb-6">
            {tool.icon} AI Tool · Free
          </div>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight leading-tight mb-3">
            {seo ? seo.headline : tool.title}
          </h1>
          <p className="text-[#9a948a] text-base max-w-xl leading-relaxed">
            {seo ? seo.subheadline : tool.description}
          </p>
        </section>

        {/* Interactive tool */}
        {ToolComponent && <ToolComponent />}

        {/* SEO content */}
        {seo && (
          <div className="mt-14 space-y-6">

            {/* Intro */}
            <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
              <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">About this tool</p>
              <p className="text-sm text-[#4a4540] leading-relaxed">{seo.intro}</p>
            </div>

            {/* Quick fact */}
            <div className="bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl p-6 flex gap-4">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <p className="font-mono text-[11px] text-[#3d6b4f] tracking-[0.1em] uppercase mb-2">Quick Fact</p>
                <p className="text-sm text-[#2a4a35] leading-relaxed">{seo.quickFact}</p>
              </div>
            </div>

            {/* Use cases */}
            <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
              <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-6">Common Use Cases</p>
              <div className="grid md:grid-cols-2 gap-4">
                {seo.useCases.map((uc) => (
                  <div key={uc.title} className="bg-[#f7f5f2] rounded-xl p-5">
                    <p className="font-semibold text-sm text-[#1a1814] mb-1">→ {uc.title}</p>
                    <p className="text-xs text-[#9a948a] leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
              <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-6">
                Frequently Asked Questions
              </p>
              <div className="space-y-5">
                {seo.faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-[#f0ede8] pb-5 last:border-0 last:pb-0">
                    <p className="font-semibold text-sm text-[#1a1814] mb-2">{faq.q}</p>
                    <p className="text-sm text-[#6a6460] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Related AI tools */}
        <section className="mt-10 mb-16">
          <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">
            // Other AI tools
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {AI_TOOLS.filter((t) => t.slug !== params.tool).map((t) => (
              <Link key={t.slug} href={`/ai/${t.slug}`}
                className="group bg-white border border-[#e4e0da] rounded-xl p-4 hover:border-[#3d6b4f] hover:bg-[#edf4f0] transition-all shadow-sm flex items-center gap-3">
                <span className="text-xl">{t.icon}</span>
                <div>
                  <p className="font-medium text-sm text-[#1a1814] group-hover:text-[#3d6b4f]">{t.title}</p>
                  <p className="text-xs text-[#9a948a]">{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between flex-wrap gap-4 mb-4">
          <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← AI Tools</Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Konvert</span>
        </footer>

      </div>
    </main>
  );
}
