"use client";
// components/ai/ContextWindow.tsx
import { useState } from "react";
import { CONTEXT_WINDOWS } from "@/lib/ai-units";

const CONTENT_TYPES = [
  { label: "English text",       charsPerToken: 4,   example: "articles, emails, code" },
  { label: "Chinese / Japanese", charsPerToken: 1.5, example: "CJK characters" },
  { label: "Source code",        charsPerToken: 3.5, example: "Python, JS, TypeScript" },
  { label: "JSON / structured",  charsPerToken: 3,   example: "API responses, configs" },
];

export default function ContextWindow() {
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Content type */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">Content Type</p>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct.label}
              onClick={() => setContentType(ct)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                contentType.label === ct.label
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#9a948a] mt-3">e.g. {contentType.example}</p>
      </div>

      {/* Model comparison table */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">Context Window Comparison</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">Model</th>
              <th className="text-right px-6 py-3 font-mono text-xs text-[#9a948a]">Tokens</th>
              <th className="text-right px-6 py-3 font-mono text-xs text-[#9a948a]">≈ Words</th>
              <th className="text-right px-6 py-3 font-mono text-xs text-[#9a948a]">≈ Pages</th>
            </tr>
          </thead>
          <tbody>
            {CONTEXT_WINDOWS
              .sort((a, b) => b.contextTokens - a.contextTokens)
              .map((m) => {
                const chars = m.contextTokens * contentType.charsPerToken;
                const words = Math.round(chars / 5);
                const pages = Math.round(words / 250);
                return (
                  <tr key={`${m.provider}-${m.model}`} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#1a1814]">{m.model}</p>
                      <p className="text-xs text-[#9a948a]">{m.provider}</p>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[#9a948a]">
                      {(m.contextTokens / 1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[#1a1814]">
                      {words >= 1000 ? `${(words/1000).toFixed(0)}K` : words}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono font-semibold text-[#3d6b4f]">
                        {pages >= 1000 ? `${(pages/1000).toFixed(1)}K` : pages}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="bg-[#faf8f4] border border-[#e4e0da] rounded-2xl p-6 text-sm text-[#4a4540] leading-relaxed">
        <strong className="text-[#1a1814]">Note:</strong> These are theoretical maximums. In practice, very long contexts may reduce model quality as attention is spread thinner. A page is estimated at ~250 words.
      </div>
    </div>
  );
}
