"use client";
// components/ai/ComputeConverter.tsx
import { useState } from "react";
import { COMPUTE_UNITS, GPU_REFERENCE } from "@/lib/ai-units";

export default function ComputeConverter() {
  const [value, setValue]     = useState("1");
  const [from,  setFrom]      = useState("TFLOPS");

  const units = Object.keys(COMPUTE_UNITS);
  const baseVal = (parseFloat(value) || 0) * COMPUTE_UNITS[from];

  const fmt = (n: number) => {
    if (n === 0) return "0";
    if (n >= 1e15) return (n / 1e15).toPrecision(4) + "P";
    if (n >= 1e12) return (n / 1e12).toPrecision(4) + "T";
    if (n >= 1e9)  return (n / 1e9).toPrecision(4)  + "G";
    if (n >= 1e6)  return (n / 1e6).toPrecision(4)  + "M";
    if (n >= 1e3)  return (n / 1e3).toPrecision(4)  + "K";
    return n.toPrecision(4);
  };

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Input */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-4">Enter Value</p>
        <div className="flex gap-4 items-center flex-wrap">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-40 bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-5 py-4 font-mono text-2xl text-[#1a1814] outline-none focus:border-[#3d6b4f]"
          />
          <div className="flex flex-wrap gap-2">
            {units.map((u) => (
              <button
                key={u}
                onClick={() => setFrom(u)}
                className={`px-4 py-2 rounded-full text-sm font-mono font-medium border transition-all ${
                  from === u
                    ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                    : "bg-[#f2f0ed] border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversions */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4e0da]">
          <span className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase">All Units</span>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {units.map((u) => {
              const result = baseVal / COMPUTE_UNITS[u];
              return (
                <tr key={u} className={`border-b border-[#f0ede8] ${u === from ? "bg-[#edf4f0]" : "hover:bg-[#faf8f5]"}`}>
                  <td className={`px-6 py-4 font-mono font-semibold ${u === from ? "text-[#3d6b4f]" : "text-[#9a948a]"}`}>{u}</td>
                  <td className="px-6 py-4 text-right font-mono text-[#1a1814]">{fmt(result)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* GPU Reference */}
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
                  <td className="px-6 py-4 text-right font-mono text-[#3d6b4f] font-semibold">
                    {ratio !== "—" ? `${ratio}×` : "—"}
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
