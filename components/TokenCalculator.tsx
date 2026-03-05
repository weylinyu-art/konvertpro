"use client";
// components/ai/TokenCalculator.tsx
import { useState } from "react";
import { TOKEN_RATIOS } from "@/lib/ai-units";

export default function TokenCalculator() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [model, setModel] = useState("GPT-4 / GPT-3.5");

  const ratio = TOKEN_RATIOS[model as keyof typeof TOKEN_RATIOS];
  const chars  = text.length;
  const words  = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const tokens = Math.ceil(chars / ratio.charsPerToken);
  const cost1M = tokens / 1_000_000;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Model selector */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <label className="block font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
          Model / Tokenizer
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(TOKEN_RATIOS).map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                model === m
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">
            Enter your text
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Paste your prompt or text here..."
          className="w-full px-6 py-5 text-sm text-[#1a1814] bg-[#faf8f5] outline-none resize-none font-sans leading-relaxed placeholder:text-[#c5bdb4]"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tokens",     value: tokens.toLocaleString(),  highlight: true  },
          { label: "Words",      value: words.toLocaleString(),   highlight: false },
          { label: "Characters", value: chars.toLocaleString(),   highlight: false },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-6 border ${
              stat.highlight
                ? "bg-[#edf4f0] border-[#3d6b4f]/20"
                : "bg-white border-[#e4e0da]"
            } shadow-sm text-center`}
          >
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2">{stat.label}</p>
            <p className={`font-serif text-3xl tracking-tight ${stat.highlight ? "text-[#3d6b4f]" : "text-[#1a1814]"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Cost hint */}
      <div className="bg-[#faf8f4] border border-[#e4e0da] rounded-2xl p-6 flex gap-4">
        <span className="text-xl">💰</span>
        <div className="text-sm text-[#4a4540] leading-relaxed">
          <strong className="text-[#1a1814]">{tokens.toLocaleString()} tokens</strong> is roughly{" "}
          <strong className="text-[#3d6b4f]">{(cost1M * 1000).toFixed(4)}× of 1M tokens</strong>.
          At GPT-4o pricing ($2.50/1M input tokens), this prompt costs approximately{" "}
          <strong className="text-[#1a1814]">${(tokens * 2.50 / 1_000_000).toFixed(6)}</strong>.
        </div>
      </div>

      {/* Info */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">How tokenization works</p>
        <p className="text-sm text-[#4a4540] leading-relaxed mb-3">
          LLMs don't process words — they process <strong>tokens</strong>. A token is roughly 4 characters or ¾ of a word in English. Common words like "the" are single tokens; less common words may be split into multiple tokens.
        </p>
        <p className="text-sm text-[#4a4540] leading-relaxed">
          Chinese, Japanese and Korean characters typically use 1.5–2 tokens per character, making CJK text more expensive to process than equivalent English text.
        </p>
      </div>
    </div>
  );
}
