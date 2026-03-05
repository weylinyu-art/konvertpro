"use client";
// components/ai/ApiCostEstimator.tsx
import { useState } from "react";
import { API_PRICING } from "@/lib/ai-units";

export default function ApiCostEstimator() {
  const [inputTokens,  setInputTokens]  = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requests,     setRequests]     = useState(1000);
  const [provider,     setProvider]     = useState("All");

  const providers = ["All", ...Array.from(new Set(API_PRICING.map((m) => m.provider)))];

  const filtered = provider === "All"
    ? API_PRICING
    : API_PRICING.filter((m) => m.provider === provider);

  const calcCost = (model: typeof API_PRICING[0]) => {
    const inputCost  = (inputTokens  / 1_000_000) * model.inputPer1M  * requests;
    const outputCost = (outputTokens / 1_000_000) * model.outputPer1M * requests;
    return inputCost + outputCost;
  };

  const formatCost = (cost: number) => {
    if (cost === 0) return "Free*";
    if (cost < 0.01) return `$${cost.toFixed(6)}`;
    if (cost < 1)    return `$${cost.toFixed(4)}`;
    return `$${cost.toFixed(2)}`;
  };

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Inputs */}
      <div className="bg-white border border-[#e4e0da] rounded-2xl p-6 shadow-sm">
        <p className="font-mono text-[11px] text-[#9a948a] tracking-[0.1em] uppercase mb-5">Configure Usage</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: "Input tokens / request",  value: inputTokens,  setter: setInputTokens  },
            { label: "Output tokens / request", value: outputTokens, setter: setOutputTokens },
            { label: "Requests per month",       value: requests,     setter: setRequests     },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs text-[#9a948a] mb-2">{field.label}</label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.setter(Number(e.target.value))}
                className="w-full bg-[#f2f0ed] border border-[#e4e0da] rounded-xl px-4 py-3 font-mono text-lg text-[#1a1814] outline-none focus:border-[#3d6b4f]"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-[#9a948a] mt-4">
          Total: <strong className="text-[#1a1814]">{((inputTokens + outputTokens) * requests / 1_000_000).toFixed(2)}M tokens/month</strong>
        </p>
      </div>

      {/* Provider filter */}
      <div className="flex gap-2 flex-wrap">
        {providers.map((p) => (
          <button
            key={p}
            onClick={() => setProvider(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              provider === p
                ? "bg-[#3d6b4f] border-[#3d6b4f] text-white"
                : "bg-white border-[#e4e0da] text-[#9a948a] hover:border-[#3d6b4f] hover:text-[#3d6b4f]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Results table */}
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
            {filtered
              .sort((a, b) => calcCost(a) - calcCost(b))
              .map((m) => {
                const cost = calcCost(m);
                return (
                  <tr key={`${m.provider}-${m.model}`} className="border-b border-[#f0ede8] hover:bg-[#faf8f5]">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#1a1814]">{m.model}</p>
                      <p className="text-xs text-[#9a948a]">{m.provider}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-[#9a948a]">
                      {m.inputPer1M === 0 ? "—" : `$${m.inputPer1M}`}
                    </td>
                    <td className="px-6 py-4 font-mono text-[#9a948a]">
                      {m.outputPer1M === 0 ? "—" : `$${m.outputPer1M}`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-mono font-semibold text-base ${
                        cost === 0 ? "text-[#3d6b4f]" : cost < 1 ? "text-[#3d6b4f]" : "text-[#1a1814]"
                      }`}>
                        {formatCost(cost)}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#9a948a]">* Self-hosted models have infrastructure costs. Prices sourced from provider websites and may change.</p>
    </div>
  );
}
