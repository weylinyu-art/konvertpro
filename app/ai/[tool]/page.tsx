// app/ai/[tool]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AI_TOOLS } from "@/lib/ai-units";

interface Props { params: { tool: string } }

export async function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  if (!tool) return {};
  return { title: tool.title, description: tool.metaDescription };
}

export default function AiToolPage({ params }: Props) {
  const tool = AI_TOOLS.find((t) => t.slug === params.tool);
  if (!tool) notFound();

  return (
    <main className="relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <header className="flex items-center justify-between pt-8">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-[28px] tracking-tight">Konvert</span>
            <span className="w-2 h-2 rounded-full bg-[#3d6b4f] mb-1" />
          </Link>
          <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← AI Tools</Link>
        </header>

        <section className="py-16 text-center">
          <div className="text-5xl mb-6">{tool.icon}</div>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight mb-4">{tool.title}</h1>
          <p className="text-[#9a948a] text-sm max-w-lg mx-auto leading-relaxed mb-8">{tool.description}</p>
          <div className="inline-block bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl px-8 py-4 font-mono text-sm text-[#3d6b4f]">
            🚧 Interactive tool coming soon
          </div>
        </section>

        <footer className="border-t border-[#e4e0da] py-8 flex items-center justify-between mt-8 mb-4">
          <Link href="/ai" className="font-mono text-xs text-[#9a948a] hover:text-[#3d6b4f]">← AI Tools</Link>
          <span className="font-mono text-xs text-[#9a948a]">© 2025 Konvert</span>
        </footer>
      </div>
    </main>
  );
}
