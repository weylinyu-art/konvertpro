// lib/ai-units.ts
// AI/LLM specific conversion tools — tokens, compute, model size, cost estimation

export interface AiTool {
  slug: string;
  icon: string;
  title: string;
  description: string;
  metaDescription: string;
}

export const AI_TOOLS: AiTool[] = [
  {
    slug: "token-calculator",
    icon: "🔤",
    title: "Token Calculator",
    description: "Estimate token count from text length for any LLM model.",
    metaDescription: "Convert words, characters and sentences to tokens for GPT-4, Claude, Gemini and other LLMs. Free token calculator.",
  },
  {
    slug: "model-size",
    icon: "🧠",
    title: "Model Size Estimator",
    description: "Calculate how much GPU memory a model needs based on parameter count.",
    metaDescription: "Calculate GPU memory required to run LLMs. Enter parameter count (7B, 70B, etc.) and get memory requirements in GB.",
  },
  {
    slug: "api-cost",
    icon: "💰",
    title: "API Cost Estimator",
    description: "Estimate LLM API costs based on token usage across major providers.",
    metaDescription: "Estimate OpenAI, Anthropic Claude, and Google Gemini API costs. Calculate price per 1M tokens for your use case.",
  },
  {
    slug: "context-window",
    icon: "📄",
    title: "Context Window Calculator",
    description: "See how much text fits inside an LLM's context window.",
    metaDescription: "Calculate how many pages, words or characters fit inside GPT-4, Claude or Gemini context windows.",
  },
  {
    slug: "compute-units",
    icon: "⚡",
    title: "Compute Units Converter",
    description: "Convert between FLOPS, TFLOPS, PFLOPS and GPU-hours.",
    metaDescription: "Convert AI compute units: FLOPS to TFLOPS, PFLOPS, GPU-hours. Essential for AI infrastructure planning.",
  },
];

// ── Token ratios by model family ──────────────────────────────────────────────
export const TOKEN_RATIOS = {
  "GPT-4 / GPT-3.5":   { charsPerToken: 4,   wordsPerToken: 0.75 },
  "Claude (Anthropic)": { charsPerToken: 3.8, wordsPerToken: 0.73 },
  "Gemini (Google)":    { charsPerToken: 4,   wordsPerToken: 0.75 },
  "LLaMA / Mistral":    { charsPerToken: 3.5, wordsPerToken: 0.70 },
  "Chinese LLMs":       { charsPerToken: 1.5, wordsPerToken: 0.50 }, // CJK chars = more tokens
};

// ── Model size memory requirements ───────────────────────────────────────────
// bytes per parameter by precision
export const PRECISION_BYTES: Record<string, number> = {
  "FP32 (32-bit)":  4,
  "BF16 / FP16":    2,
  "INT8 (8-bit)":   1,
  "INT4 (4-bit)":   0.5,
  "GGUF Q4_K_M":    0.45,  // popular llama.cpp quantization
};

// ── API pricing (per 1M tokens, USD) — update periodically ───────────────────
export interface ModelPricing {
  provider: string;
  model: string;
  inputPer1M: number;
  outputPer1M: number;
}

export const API_PRICING: ModelPricing[] = [
  { provider: "OpenAI",     model: "GPT-4o",            inputPer1M: 2.50,  outputPer1M: 10.00 },
  { provider: "OpenAI",     model: "GPT-4o mini",       inputPer1M: 0.15,  outputPer1M: 0.60  },
  { provider: "OpenAI",     model: "GPT-4 Turbo",       inputPer1M: 10.00, outputPer1M: 30.00 },
  { provider: "Anthropic",  model: "Claude 3.5 Sonnet", inputPer1M: 3.00,  outputPer1M: 15.00 },
  { provider: "Anthropic",  model: "Claude 3 Haiku",    inputPer1M: 0.25,  outputPer1M: 1.25  },
  { provider: "Anthropic",  model: "Claude 3 Opus",     inputPer1M: 15.00, outputPer1M: 75.00 },
  { provider: "Google",     model: "Gemini 1.5 Pro",    inputPer1M: 1.25,  outputPer1M: 5.00  },
  { provider: "Google",     model: "Gemini 1.5 Flash",  inputPer1M: 0.075, outputPer1M: 0.30  },
  { provider: "Meta",       model: "LLaMA 3 (self-host)",inputPer1M: 0,    outputPer1M: 0     },
];

// ── Context windows ───────────────────────────────────────────────────────────
export interface ModelContext {
  provider: string;
  model: string;
  contextTokens: number;
}

export const CONTEXT_WINDOWS: ModelContext[] = [
  { provider: "Anthropic", model: "Claude 3.5 Sonnet", contextTokens: 200000 },
  { provider: "Anthropic", model: "Claude 3 Opus",     contextTokens: 200000 },
  { provider: "Google",    model: "Gemini 1.5 Pro",    contextTokens: 1000000 },
  { provider: "Google",    model: "Gemini 1.5 Flash",  contextTokens: 1000000 },
  { provider: "OpenAI",    model: "GPT-4o",            contextTokens: 128000 },
  { provider: "OpenAI",    model: "GPT-4 Turbo",       contextTokens: 128000 },
  { provider: "OpenAI",    model: "GPT-3.5 Turbo",     contextTokens: 16385  },
  { provider: "Meta",      model: "LLaMA 3 70B",       contextTokens: 8192   },
  { provider: "Mistral",   model: "Mistral Large",     contextTokens: 32000  },
];

// ── Compute units ─────────────────────────────────────────────────────────────
export const COMPUTE_UNITS: Record<string, number> = {
  "FLOPS":   1,
  "KFLOPS":  1e3,
  "MFLOPS":  1e6,
  "GFLOPS":  1e9,
  "TFLOPS":  1e12,
  "PFLOPS":  1e15,
  "EFLOPS":  1e18,
};

// Well-known GPU TFLOPS (FP16) for reference
export const GPU_REFERENCE = [
  { name: "NVIDIA RTX 4090",    tflops: 82.6  },
  { name: "NVIDIA A100 (80GB)", tflops: 77.97 },
  { name: "NVIDIA H100",        tflops: 204   },
  { name: "NVIDIA RTX 3090",    tflops: 35.6  },
  { name: "Apple M3 Max",       tflops: 14.2  },
];
