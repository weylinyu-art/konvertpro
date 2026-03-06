// app/ai/[tool]/page.tsx
// Full AEO implementation:
// - FAQPage JSON-LD schema
// - SoftwareApplication schema
// - AI-readable answer blocks
// - Structured FAQ with rich answers

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";
import { getAiToolSeoContent } from "@/lib/ai-seo-content";
import { AI_TOOL_FAQS, faqSchema, softwareAppSchema } from "@/lib/aeo";
import JsonLd from "@/components/JsonLd";
import {
  TokenCalculator,
  ModelSizeEstimator,
  ApiCostEstimator,
  ContextWindow,
  ComputeConverter,
} from "@/components/ai/AllTools";

interface Props { params: { tool: string } }

const BASE_URL = "https://konvertpro-lyoo.vercel.app";

export async function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  const seo  = getAiToolSeoContent(params.tool);
  if (!tool) return {};
  return {
    title: seo?.headline ?? tool.title,
    description: tool.metaDescription,
    keywords: seo?.keywords ?? [],
    openGraph: {
      title: seo?.headline ?? tool.title,
      description: tool.metaDescription,
      type: "website",
      url: `${BASE_URL}/ai/${params.tool}`,
    },
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
  const faqs          = AI_TOOL_FAQS[params.tool] ?? [];
  const ToolComponent = TOOL_COMPONENTS[params.tool];
  const pageUrl       = `${BASE_URL}/ai/${params.tool}`;

  return (
    <>
      {/* ── Structured Data (AEO) ── */}
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd data={softwareAppSchema({
        name: tool.title,
        description: tool.metaDescription,
        url: pageUrl,
      })} />

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
              {tool.icon} AI Tool · Free · No signup
            </div>
            <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight leading-tight mb-3">
              {seo?.headline ?? tool.title}
            </h1>
            <p className="text-[#9a948a] text-base max-w-xl leading-relaxed">
              {seo?.subheadline ?? tool.description}
            </p>
          </section>

          {/* Interactive tool */}
          {ToolComponent && <ToolComponent />}

          {/* SEO + AEO content */}
          {seo && (
            <div className="mt-14 space-y-6">

              {/* Intro — AI-readable summary */}
              <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
                <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">
                  About this tool
                </p>
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

            </div>
          )}

          {/* ── FAQ Section (AEO核心) ── */}
          {faqs.length > 0 && (
            <section className="mt-6 mb-6">
              <div className="bg-white border border-[#e4e0da] rounded-2xl p-8 shadow-sm">
                <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2">
                  Frequently Asked Questions
                </p>
                <p className="text-xs text-[#c5bdb4] font-mono mb-8">
                  // answers optimized for AI search engines
                </p>
                <div className="space-y-0">
                  {faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group border-b border-[#f0ede8] last:border-0"
                      open={i === 0}
                    >
                      <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
                        <h3 className="font-semibold text-sm text-[#1a1814] pr-8 leading-snug">
                          {faq.q}
                        </h3>
                        <span className="text-[#9a948a] flex-shrink-0 text-lg group-open:rotate-45 transition-transform duration-200">
                          +
                        </span>
                      </summary>
                      <div className="pb-5">
                        <p className="text-sm text-[#6a6460] leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related AI tools */}
          <section className="mt-4 mb-16">
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
    </>
  );
}
