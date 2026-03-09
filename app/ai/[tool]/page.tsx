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

  const BASE_URL = "https://koverts.com";
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
              AI Tools
            </Link>
            <span className="text-[#c5bdb4] text-xs flex-shrink-0">/</span>
            <span className="font-mono text-xs text-[#3d6b4f] truncate max-w-[100px] md:max-w-[200px]">
              {tool.title}
            </span>
          </div>
        </header>

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
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Koverts</span>
        </footer>
      </div>
    </main>
  );
}
