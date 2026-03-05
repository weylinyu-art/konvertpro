"use client";
// components/ai/AllTools.tsx
// All 5 AI tool components in one file — easier to upload

import { useState } from "react";
import {
  TOKEN_RATIOS,
  PRECISION_BYTES,
  GPU_REFERENCE,
  API_PRICING,
  CONTEXT_WINDOWS,
  COMPUTE_UNITS,
} from "@/lib/ai-units";

// ─────────────────────────────────────────────────────────────
// 1. TOKEN CALCULATOR
// ─────────────────────────────────────────────────────────────
export function TokenCalculator() {
  const [text,  setText]  = useState("The quick brown fox jumps over the lazy dog.");
  const [model, setModel] = useState("GPT-4 / GPT-3.5");

  const ratio  = TOKEN_RATIOS[model as keyof typeof TOKEN_RATIOS];
  const chars  = text.length;
  const words  = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const tokens = Math.ceil(chars / ratio.charsPerToken);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Model selector */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <label className="block font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">Model / Tokenizer</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(TOKEN_RATIOS).map((m) => (
            <button key={m} onClick={() => setModel(m)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                model === m
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}>{m}</button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">Enter your text</span>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6}
          placeholder="Paste your prompt or text here..."
          className="w-full px-6 py-5 text-sm text-[#1a1814] bg-[#faf8f5] outline-none resize-none leading-relaxed placeholder:text-[#c5bdb4]" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tokens",     value: tokens.toLocaleString(), highlight: true  },
          { label: "Words",      value: words.toLocaleString(),  highlight: false },
          { label: "Characters", value: chars.toLocaleString(),  highlight: false },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-6 border text-center shadow-sm ${s.highlight ? "bg-[#edf4f0] border-[#3d6b4f]/20" : "bg-white border-[#e4e0da]"}`}>
            <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-2">{s.label}</p>
            <p className={`font-serif text-3xl tracking-tight ${s.highlight ? "text-[#3d6b4f]" : "text-[#1a1814]"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cost hint */}
      <div className="bg-[#faf8f4] border border-[#e4e0da] rounded-2xl p-6 flex gap-4">
        <span className="text-xl">💰</span>
        <p className="text-sm text-[#4a4540] leading-relaxed">
          <strong className="text-[#1a1814]">{tokens.toLocaleString()} tokens</strong> — at GPT-4o pricing ($2.50/1M input tokens), this costs approximately{" "}
          <strong className="text-[#3d6b4f]">${(tokens * 2.50 / 1_000_000).toFixed(6)}</strong>.
        </p>
      </div>

      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">How tokenization works</p>
        <p className="text-sm text-[#4a4540] leading-relaxed">
          LLMs process <strong>tokens</strong>, not words. A token is roughly 4 characters or ¾ of a word in English.
          Chinese/Japanese/Korean characters typically use 1.5–2 tokens each, making CJK text more expensive to process.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. MODEL SIZE ESTIMATOR
// ─────────────────────────────────────────────────────────────
const PRESET_MODELS = [
  { name: "Mistral 7B",   params: 7   },
  { name: "LLaMA 3 8B",   params: 8   },
  { name: "LLaMA 3 70B",  params: 70  },
  { name: "LLaMA 3 405B", params: 405 },
  { name: "GPT-3 (175B)", params: 175 },
  { name: "Custom",       params: -1  },
];

export function ModelSizeEstimator() {
  const [params,    setParams]    = useState(7);
  const [precision, setPrecision] = useState("BF16 / FP16");
  const [custom,    setCustom]    = useState("");
  const [isCustom,  setIsCustom]  = useState(false);

  const effectiveParams = isCustom ? (parseFloat(custom) || 0) : params;
  const rawGB   = (effectiveParams * 1e9 * PRECISION_BYTES[precision]) / 1e9;
  const totalGB = rawGB * 1.2;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <label className="block font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">Select Model</label>
        <div className="flex flex-wrap gap-2">
          {PRESET_MODELS.map((m) => (
            <button key={m.name}
              onClick={() => { if (m.name === "Custom") { setIsCustom(true); } else { setIsCustom(false); setParams(m.params); } }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                (!isCustom && params === m.params && m.name !== "Custom") || (isCustom && m.name === "Custom")
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}>{m.name}</button>
          ))}
        </div>
        {isCustom && (
          <div className="mt-4 flex items-center gap-3">
            <input type="number" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 13"
              className="w-32 bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-lg outline-none focus:border-[#3d6b4f]" />
            <span className="text-sm text-[#9a948a]">billion parameters</span>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <label className="block font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">Precision / Quantization</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRECISION_BYTES).map((p) => (
            <button key={p} onClick={() => setPrecision(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                precision === p
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl p-8 text-center shadow-sm">
        <p className="font-mono text-[11px] text-[#3d6b4f] tracking-[0.1em] uppercase mb-3">Estimated GPU Memory</p>
        <p className="font-serif text-[64px] text-[#3d6b4f] leading-none tracking-tight">
          {totalGB < 1 ? totalGB.toFixed(2) : Math.round(totalGB)}
          <span className="text-2xl ml-2 text-[#9a948a] font-sans">GB</span>
        </p>
        <p className="text-sm text-[#6a8a72] mt-2">{rawGB.toFixed(1)} GB weights + ~{(rawGB * 0.2).toFixed(1)} GB overhead</p>
      </div>

      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">GPU Reference</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">GPU</th>
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">VRAM</th>
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">Fits?</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "NVIDIA RTX 4090",    vram: 24  },
              { name: "NVIDIA A100 (40GB)", vram: 40  },
              { name: "NVIDIA A100 (80GB)", vram: 80  },
              { name: "NVIDIA H100 (80GB)", vram: 80  },
              { name: "2× A100 (80GB)",     vram: 160 },
              { name: "4× A100 (80GB)",     vram: 320 },
            ].map((gpu) => {
              const fits = gpu.vram >= totalGB;
              return (
                <tr key={gpu.name} className="border-b border-[#f0ede8]">
                  <td className="px-6 py-3 text-[#1a1814]">{gpu.name}</td>
                  <td className="px-6 py-3 font-mono text-[#9a948a]">{gpu.vram} GB</td>
                  <td className="px-6 py-3">
                    <span className={`font-mono text-xs px-2 py-1 rounded-full ${fits ? "bg-[#edf4f0] text-[#3d6b4f]" : "bg-[#fdf0f0] text-[#c0392b]"}`}>
                      {fits ? "✓ Yes" : "✗ No"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. API COST ESTIMATOR
// ─────────────────────────────────────────────────────────────
export function ApiCostEstimator() {
  const [inputTokens,  setInputTokens]  = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requests,     setRequests]     = useState(1000);
  const [provider,     setProvider]     = useState("All");

  const providers = ["All", ...Array.from(new Set(API_PRICING.map((m) => m.provider)))];
  const filtered  = provider === "All" ? API_PRICING : API_PRICING.filter((m) => m.provider === provider);

  const calcCost = (model: typeof API_PRICING[0]) =>
    (inputTokens  / 1_000_000) * model.inputPer1M  * requests +
    (outputTokens / 1_000_000) * model.outputPer1M * requests;

  const fmt = (cost: number) => {
    if (cost === 0)   return "Free*";
    if (cost < 0.01)  return `$${cost.toFixed(6)}`;
    if (cost < 1)     return `$${cost.toFixed(4)}`;
    return `$${cost.toFixed(2)}`;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">Configure Usage</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: "Input tokens / request",  value: inputTokens,  setter: setInputTokens  },
            { label: "Output tokens / request", value: outputTokens, setter: setOutputTokens },
            { label: "Requests per month",      value: requests,     setter: setRequests     },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs text-[#9a948a] mb-2">{f.label}</label>
              <input type="number" value={f.value} onChange={(e) => f.setter(Number(e.target.value))}
                className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-lg text-[#1a1814] outline-none focus:border-[#3d6b4f]" />
            </div>
          ))}
        </div>
        <p className="text-xs text-[#9a948a] mt-4">
          Total: <strong className="text-[#1a1814]">{((inputTokens + outputTokens) * requests / 1_000_000).toFixed(2)}M tokens/month</strong>
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {providers.map((p) => (
          <button key={p} onClick={() => setProvider(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              provider === p
                ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
            }`}>{p}</button>
        ))}
      </div>

      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">Model</th>
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">Input /1M</th>
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">Output /1M</th>
              <th className="text-right px-6 py-3 font-mono text-xs text-[#9a948a]">Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            {filtered.sort((a, b) => calcCost(a) - calcCost(b)).map((m) => (
              <tr key={`${m.provider}-${m.model}`} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1a1814]">{m.model}</p>
                  <p className="text-xs text-[#9a948a]">{m.provider}</p>
                </td>
                <td className="px-6 py-4 font-mono text-[#9a948a]">{m.inputPer1M === 0 ? "—" : `$${m.inputPer1M}`}</td>
                <td className="px-6 py-4 font-mono text-[#9a948a]">{m.outputPer1M === 0 ? "—" : `$${m.outputPer1M}`}</td>
                <td className="px-6 py-4 text-right font-mono font-semibold text-base text-[#3d6b4f]">{fmt(calcCost(m))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#9a948a]">* Self-hosted models have infrastructure costs. Prices may change.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. CONTEXT WINDOW CALCULATOR
// ─────────────────────────────────────────────────────────────
const CONTENT_TYPES = [
  { label: "English text",       charsPerToken: 4   },
  { label: "Chinese / Japanese", charsPerToken: 1.5 },
  { label: "Source code",        charsPerToken: 3.5 },
  { label: "JSON / structured",  charsPerToken: 3   },
];

export function ContextWindow() {
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">Content Type</p>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPES.map((ct) => (
            <button key={ct.label} onClick={() => setContentType(ct)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                contentType.label === ct.label
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}>{ct.label}</button>
          ))}
        </div>
      </div>

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
            {CONTEXT_WINDOWS.sort((a, b) => b.contextTokens - a.contextTokens).map((m) => {
              const words = Math.round(m.contextTokens * contentType.charsPerToken / 5);
              const pages = Math.round(words / 250);
              return (
                <tr key={`${m.provider}-${m.model}`} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1a1814]">{m.model}</p>
                    <p className="text-xs text-[#9a948a]">{m.provider}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[#9a948a]">{(m.contextTokens/1000).toFixed(0)}K</td>
                  <td className="px-6 py-4 text-right font-mono text-[#1a1814]">{words >= 1000 ? `${(words/1000).toFixed(0)}K` : words}</td>
                  <td className="px-6 py-4 text-right font-mono font-semibold text-[#3d6b4f]">{pages >= 1000 ? `${(pages/1000).toFixed(1)}K` : pages}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#9a948a]">A page is estimated at ~250 words. Very long contexts may reduce model quality.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. COMPUTE UNITS CONVERTER
// ─────────────────────────────────────────────────────────────
export function ComputeConverter() {
  const [value, setValue] = useState("1");
  const [from,  setFrom]  = useState("TFLOPS");

  const units   = Object.keys(COMPUTE_UNITS);
  const baseVal = (parseFloat(value) || 0) * COMPUTE_UNITS[from];

  const fmt = (n: number) => {
    if (n === 0)     return "0";
    if (n >= 1e15)   return (n / 1e15).toPrecision(4) + "P";
    if (n >= 1e12)   return (n / 1e12).toPrecision(4) + "T";
    if (n >= 1e9)    return (n / 1e9).toPrecision(4)  + "G";
    if (n >= 1e6)    return (n / 1e6).toPrecision(4)  + "M";
    if (n >= 1e3)    return (n / 1e3).toPrecision(4)  + "K";
    return n.toPrecision(4);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">Enter Value</p>
        <div className="flex gap-4 items-center flex-wrap">
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
            className="w-36 bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-2xl text-[#1a1814] outline-none focus:border-[#3d6b4f]" />
          <div className="flex flex-wrap gap-2">
            {units.map((u) => (
              <button key={u} onClick={() => setFrom(u)}
                className={`px-4 py-2 rounded-full text-sm font-mono font-medium border transition-all ${
                  from === u
                    ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                    : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
                }`}>{u}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">All Units</span>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {units.map((u) => (
              <tr key={u} className={`border-b border-[#f0ede8] ${u === from ? "bg-[#edf4f0]" : "hover:bg-[#faf8f5]"}`}>
                <td className={`px-6 py-4 font-mono font-semibold ${u === from ? "text-[#3d6b4f]" : "text-[#9a948a]"}`}>{u}</td>
                <td className="px-6 py-4 text-right font-mono text-[#1a1814]">{fmt(baseVal / COMPUTE_UNITS[u])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">GPU Reference (FP16)</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">GPU</th>
              <th className="text-right px-6 py-3 font-mono text-xs text-[#9a948a]">TFLOPS</th>
              <th className="text-right px-6 py-3 font-mono text-xs text-[#9a948a]">vs your value</th>
            </tr>
          </thead>
          <tbody>
            {GPU_REFERENCE.map((gpu) => {
              const baseTflops = baseVal / COMPUTE_UNITS["TFLOPS"];
              const ratio = baseTflops > 0 ? (baseTflops / gpu.tflops).toFixed(1) : "—";
              return (
                <tr key={gpu.name} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                  <td className="px-6 py-4 text-[#1a1814]">{gpu.name}</td>
                  <td className="px-6 py-4 text-right font-mono text-[#9a948a]">{gpu.tflops}</td>
                  <td className="px-6 py-4 text-right font-mono font-semibold text-[#3d6b4f]">{ratio !== "—" ? `${ratio}×` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

