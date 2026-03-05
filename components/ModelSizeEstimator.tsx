"use client";
// components/ai/ModelSizeEstimator.tsx
import { useState } from "react";
import { PRECISION_BYTES, GPU_REFERENCE } from "@/lib/ai-units";

const PRESET_MODELS = [
  { name: "LLaMA 3 8B",     params: 8   },
  { name: "Mistral 7B",     params: 7   },
  { name: "LLaMA 3 70B",    params: 70  },
  { name: "LLaMA 3 405B",   params: 405 },
  { name: "GPT-3 (175B)",   params: 175 },
  { name: "Custom",         params: 0   },
];

export default function ModelSizeEstimator() {
  const [params,    setParams]    = useState(7);
  const [precision, setPrecision] = useState("BF16 / FP16");
  const [custom,    setCustom]    = useState("");
  const [isCustom,  setIsCustom]  = useState(false);

  const effectiveParams = isCustom ? parseFloat(custom) || 0 : params;
  const bytesPerParam   = PRECISION_BYTES[precision];
  const rawGB           = (effectiveParams * 1e9 * bytesPerParam) / 1e9;
  // add ~20% overhead for KV cache, activations
  const totalGB         = rawGB * 1.2;

  const gpuCount = (gpuTflops: number) =>
    Math.ceil(totalGB / 80); // rough: A100 80GB

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Preset selector */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <label className="block font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
          Select Model (or enter custom)
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_MODELS.map((m) => (
            <button
              key={m.name}
              onClick={() => {
                if (m.name === "Custom") { setIsCustom(true); }
                else { setIsCustom(false); setParams(m.params); }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                (!isCustom && params === m.params && m.name !== "Custom") ||
                (isCustom && m.name === "Custom")
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
        {isCustom && (
          <div className="mt-4 flex items-center gap-3">
            <input
              type="number"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="e.g. 13"
              className="w-36 bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-lg outline-none focus:border-[#3d6b4f]"
            />
            <span className="text-sm text-[#9a948a]">billion parameters</span>
          </div>
        )}
      </div>

      {/* Precision selector */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <label className="block font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-3">
          Precision / Quantization
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRECISION_BYTES).map((p) => (
            <button
              key={p}
              onClick={() => setPrecision(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                precision === p
                  ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                  : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="bg-[#edf4f0] border border-[#3d6b4f]/20 rounded-2xl p-8 text-center shadow-sm">
        <p className="font-mono text-[11px] text-[#3d6b4f] tracking-[0.1em] uppercase mb-3">Estimated GPU Memory</p>
        <p className="font-serif text-[64px] text-[#3d6b4f] leading-none tracking-tight">
          {totalGB < 1 ? totalGB.toFixed(2) : Math.round(totalGB)}
          <span className="text-2xl ml-2 text-[#9a948a] font-sans">GB</span>
        </p>
        <p className="text-sm text-[#6a8a72] mt-2">
          {rawGB.toFixed(1)} GB weights + ~{(rawGB * 0.2).toFixed(1)} GB overhead
        </p>
      </div>

      {/* GPU reference */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">GPU Reference</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e4e0da] bg-[#f7f5f2]">
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">GPU</th>
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">VRAM</th>
              <th className="text-left px-6 py-3 font-mono text-xs text-[#9a948a]">Fits model?</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "NVIDIA RTX 4090",     vram: 24  },
              { name: "NVIDIA A100 (40GB)",  vram: 40  },
              { name: "NVIDIA A100 (80GB)",  vram: 80  },
              { name: "NVIDIA H100 (80GB)",  vram: 80  },
              { name: "2× A100 (80GB)",      vram: 160 },
              { name: "4× A100 (80GB)",      vram: 320 },
            ].map((gpu) => {
              const fits = gpu.vram >= totalGB;
              return (
                <tr key={gpu.name} className="border-b border-[#f0ede8]">
                  <td className="px-6 py-3 text-[#1a1814]">{gpu.name}</td>
                  <td className="px-6 py-3 font-mono text-[#9a948a]">{gpu.vram} GB</td>
                  <td className="px-6 py-3">
                    <span className={`font-mono text-xs px-2 py-1 rounded-full ${
                      fits ? "bg-[#edf4f0] text-[#3d6b4f]" : "bg-[#fdf0f0] text-[#c0392b]"
                    }`}>
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
