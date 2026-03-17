"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { TOKEN_RATIOS, API_PRICING, CONTEXT_WINDOWS } from "@/lib/ai-units";

function formatNum(n: number, digits = 0) {
  return Number.isFinite(n)
    ? n.toLocaleString("en", { maximumFractionDigits: digits })
    : "—";
}

export default function HomeAiSpotlight() {
  const { locale } = useLocale();
  const localeText = <T,>(m: { en: T; zh: T; es: T; fr: T; ru: T; ar: T }) => m[locale];

  const tokenModels = useMemo(() => Object.entries(TOKEN_RATIOS), []);
  const apiModels = useMemo(() => API_PRICING.filter((m) => m.inputPer1M > 0).slice(0, 6), []);
  const contextModels = useMemo(() => CONTEXT_WINDOWS.slice(0, 6), []);

  const [charCount, setCharCount] = useState("1200");
  const [tokenModel, setTokenModel] = useState(tokenModels[0]?.[0] ?? "GPT-4 / GPT-3.5");

  const [apiTokens, setApiTokens] = useState("50000");
  const [apiModel, setApiModel] = useState(apiModels[0]?.model ?? "GPT-4o");

  const [contextTokens, setContextTokens] = useState("12000");
  const [contextModel, setContextModel] = useState(contextModels[0]?.model ?? "Claude 3.5 Sonnet");

  const tokenResult = useMemo(() => {
    const chars = parseFloat(charCount);
    const ratio = TOKEN_RATIOS[tokenModel as keyof typeof TOKEN_RATIOS]?.charsPerToken ?? 4;
    if (Number.isNaN(chars) || chars < 0) return null;
    return chars / ratio;
  }, [charCount, tokenModel]);

  const apiResult = useMemo(() => {
    const tokens = parseFloat(apiTokens);
    const selected = apiModels.find((m) => m.model === apiModel);
    if (!selected || Number.isNaN(tokens) || tokens < 0) return null;
    return (tokens / 1_000_000) * selected.inputPer1M;
  }, [apiTokens, apiModel, apiModels]);

  const contextResult = useMemo(() => {
    const tokens = parseFloat(contextTokens);
    const selected = contextModels.find((m) => m.model === contextModel);
    if (!selected || Number.isNaN(tokens) || tokens < 0) return null;
    return (tokens / selected.contextTokens) * 100;
  }, [contextTokens, contextModel, contextModels]);

  return (
    <section className="mt-14 mb-12">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-sans font-bold text-xl md:text-2xl text-[#1a1814]">
            {localeText({
              en: "AI quick tools",
              zh: "AI 快捷工具",
              es: "Herramientas IA rapidas",
              fr: "Outils IA rapides",
              ru: "Быстрые AI-инструменты",
              ar: "أدوات ذكاء اصطناعي سريعة",
            })}
          </h2>
        </div>
        <Link
          href="/ai"
          className="text-xs font-mono text-[#3d6b4f] hover:underline"
        >
          {localeText({
            en: "All AI →",
            zh: "全部 AI →",
            es: "Todo IA →",
            fr: "Tout IA →",
            ru: "Все AI →",
            ar: "كل أدوات AI →",
          })}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <article className="bg-white border border-[#e4e0da] rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-[#1a1814] mb-2">
            🔤 {localeText({ en: "Token Calculator", zh: "Token 估算", es: "Tokens", fr: "Tokens", ru: "Токены", ar: "الرموز" })}
          </p>
          <label className="text-xs text-[#8c867d] block mb-1">
            {localeText({ en: "Characters", zh: "字符数", es: "Caracteres", fr: "Caracteres", ru: "Символы", ar: "عدد الأحرف" })}
          </label>
          <input
            type="number"
            value={charCount}
            onChange={(e) => setCharCount(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none mb-2"
          />
          <select
            value={tokenModel}
            onChange={(e) => setTokenModel(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none"
          >
            {tokenModels.map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <p className="mt-3 text-sm text-[#1a1814]">
            {localeText({ en: "Estimated tokens", zh: "估算 Token", es: "Tokens estimados", fr: "Tokens estimés", ru: "Оценка токенов", ar: "تقدير الرموز" })}:{" "}
            <span className="font-semibold text-[#3d6b4f]">{tokenResult === null ? "—" : formatNum(tokenResult)}</span>
          </p>
          <Link href="/ai/token-calculator" className="mt-3 inline-block text-xs text-[#3d6b4f] hover:underline">
            {localeText({ en: "Open tool", zh: "打开工具", es: "Abrir", fr: "Ouvrir", ru: "Открыть", ar: "فتح" })} →
          </Link>
        </article>

        <article className="bg-white border border-[#e4e0da] rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-[#1a1814] mb-2">
            💰 {localeText({ en: "API Cost", zh: "API 成本", es: "Coste API", fr: "Coût API", ru: "Стоимость API", ar: "تكلفة API" })}
          </p>
          <label className="text-xs text-[#8c867d] block mb-1">
            {localeText({ en: "Input tokens", zh: "输入 Token", es: "Tokens de entrada", fr: "Tokens d'entrée", ru: "Входные токены", ar: "رموز الإدخال" })}
          </label>
          <input
            type="number"
            value={apiTokens}
            onChange={(e) => setApiTokens(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none mb-2"
          />
          <select
            value={apiModel}
            onChange={(e) => setApiModel(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none"
          >
            {apiModels.map((m) => (
              <option key={`${m.provider}-${m.model}`} value={m.model}>
                {m.provider} - {m.model}
              </option>
            ))}
          </select>
          <p className="mt-3 text-sm text-[#1a1814]">
            {localeText({ en: "Estimated input cost", zh: "预估输入成本", es: "Coste estimado", fr: "Coût estimé", ru: "Оценка стоимости", ar: "التكلفة التقديرية" })}:{" "}
            <span className="font-semibold text-[#3d6b4f]">{apiResult === null ? "—" : `$${formatNum(apiResult, 4)}`}</span>
          </p>
          <Link href="/ai/api-cost" className="mt-3 inline-block text-xs text-[#3d6b4f] hover:underline">
            {localeText({ en: "Open tool", zh: "打开工具", es: "Abrir", fr: "Ouvrir", ru: "Открыть", ar: "فتح" })} →
          </Link>
        </article>

        <article className="bg-white border border-[#e4e0da] rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-[#1a1814] mb-2">
            📄 {localeText({ en: "Context Window", zh: "上下文窗口", es: "Contexto", fr: "Contexte", ru: "Контекст", ar: "نافذة السياق" })}
          </p>
          <label className="text-xs text-[#8c867d] block mb-1">
            {localeText({ en: "Prompt tokens", zh: "提示词 Token", es: "Tokens prompt", fr: "Tokens prompt", ru: "Токены промпта", ar: "رموز الطلب" })}
          </label>
          <input
            type="number"
            value={contextTokens}
            onChange={(e) => setContextTokens(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none mb-2"
          />
          <select
            value={contextModel}
            onChange={(e) => setContextModel(e.target.value)}
            className="w-full h-10 rounded-lg border border-[#e4e0da] bg-[#f7f5f2] px-3 text-sm outline-none"
          >
            {contextModels.map((m) => (
              <option key={`${m.provider}-${m.model}`} value={m.model}>
                {m.provider} - {m.model}
              </option>
            ))}
          </select>
          <p className="mt-3 text-sm text-[#1a1814]">
            {localeText({ en: "Window usage", zh: "窗口占用", es: "Uso de ventana", fr: "Utilisation", ru: "Заполнение", ar: "نسبة الاستخدام" })}:{" "}
            <span className="font-semibold text-[#3d6b4f]">{contextResult === null ? "—" : `${formatNum(contextResult, 1)}%`}</span>
          </p>
          <Link href="/ai/context-window" className="mt-3 inline-block text-xs text-[#3d6b4f] hover:underline">
            {localeText({ en: "Open tool", zh: "打开工具", es: "Abrir", fr: "Ouvrir", ru: "Открыть", ar: "فتح" })} →
          </Link>
        </article>
      </div>
    </section>
  );
}
