// lib/aeo.ts
// AEO (Answer Engine Optimization) helpers
// Generates JSON-LD structured data for FAQ, HowTo, and Dataset schemas
// These help AI search engines (Perplexity, ChatGPT Search, Google AI Overviews) cite your pages

export interface FaqItem {
  q: string;
  a: string;
}

// ── JSON-LD: FAQPage schema ───────────────────────────────────────────────────
export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };
}

// ── JSON-LD: HowTo schema (for conversion pages) ──────────────────────────────
export function howToSchema({
  name, description, steps, url,
}: { name: string; description: string; steps: string[]; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "text": s,
    })),
    "url": url,
  };
}

// ── JSON-LD: Dataset schema (for conversion tables) ───────────────────────────
export function datasetSchema({
  name, description, url,
}: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": name,
    "description": description,
    "url": url,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": { "@type": "Organization", "name": "Konvert" },
  };
}

// ── JSON-LD: SoftwareApplication schema (for tool pages) ─────────────────────
export function softwareAppSchema({
  name, description, url,
}: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };
}

// ── Conversion page FAQs (generated dynamically) ─────────────────────────────
export function getConversionFaqs(
  fromLabel: string, toLabel: string,
  fromSym: string, toSym: string,
  formula: string, example: string,
  category: string,
): FaqItem[] {
  return [
    {
      q: `How do I convert ${fromLabel} to ${toLabel}?`,
      a: `To convert ${fromLabel} to ${toLabel}, ${formula}. For example, ${example}.`,
    },
    {
      q: `What is the formula for ${fromSym} to ${toSym}?`,
      a: `The formula is: ${toSym} = ${fromSym} × ${formula.replace("multiply by ", "")}. This gives you the exact ${toLabel} value for any ${fromLabel} input.`,
    },
    {
      q: `How many ${toLabel} are in one ${fromLabel}?`,
      a: `One ${fromLabel} equals ${example.split(" = ")[1] ?? "—"}. Use our calculator above to convert any value instantly.`,
    },
    {
      q: `Is there a quick way to estimate ${fromSym} to ${toSym}?`,
      a: `For a rough mental estimate, ${formula}. This approximation works well for everyday use, though the exact conversion factor gives more precise results.`,
    },
    {
      q: `What is ${fromLabel} used for?`,
      a: `${fromLabel} (${fromSym}) is a unit of ${category} measurement commonly used in everyday contexts. Use the converter above for exact ${fromSym} to ${toSym} conversions.`,
    },
  ];
}

// ── AI tool FAQs (static, high-value for AEO) ────────────────────────────────
export const AI_TOOL_FAQS: Record<string, FaqItem[]> = {
  "token-calculator": [
    { q: "What is a token in AI?", a: "A token is the basic unit of text that large language models (LLMs) process. In English, 1 token equals approximately 4 characters or 3/4 of a word. Common words like 'the' are a single token, while longer or uncommon words may be split into multiple tokens." },
    { q: "How many tokens is 1000 words?", a: "Approximately 1,000 words in English equals 1,300–1,400 tokens. The exact count depends on word length and the model's tokenizer. Use our token calculator above to get precise counts for your text." },
    { q: "How do I calculate tokens for GPT-4?", a: "GPT-4 uses the tiktoken tokenizer. As a rule of thumb, 1 token ≈ 4 characters or 0.75 words. Our token calculator estimates this for GPT-4, Claude, Gemini, and other popular models." },
    { q: "Why do tokens cost money in LLM APIs?", a: "LLM APIs like OpenAI and Anthropic charge per token because tokens represent the compute required to process your request. Both input tokens (your prompt) and output tokens (the model's response) are billed, with output tokens typically costing 3–4× more." },
    { q: "How many tokens fit in GPT-4's context window?", a: "GPT-4o supports up to 128,000 tokens in a single request, which is approximately 300 pages of text or 96,000 words. Claude 3.5 Sonnet supports 200,000 tokens, and Gemini 1.5 Pro supports up to 1,000,000 tokens." },
    { q: "Do Chinese characters use more tokens than English?", a: "Yes. Chinese, Japanese, and Korean (CJK) characters typically require 1.5–2 tokens per character, compared to English where 1 token covers ~4 characters. This means processing CJK text with LLMs costs significantly more per word." },
  ],
  "model-size": [
    { q: "How much GPU memory does LLaMA 3 8B need?", a: "LLaMA 3 8B requires approximately 16 GB of GPU memory in FP16 precision (including overhead). With 4-bit quantization (INT4 or GGUF Q4), memory drops to around 5–6 GB, making it runnable on consumer GPUs like the RTX 3060." },
    { q: "How do I calculate GPU memory for an LLM?", a: "Multiply the number of parameters by bytes per parameter: FP32 uses 4 bytes, FP16/BF16 uses 2 bytes, INT8 uses 1 byte, INT4 uses 0.5 bytes. Then add ~20% for KV cache and activations. Example: 7B parameters × 2 bytes (FP16) = 14 GB + 20% overhead = ~17 GB total." },
    { q: "Can I run a 70B model on a single GPU?", a: "A 70B model in FP16 requires ~140 GB of VRAM — more than any single consumer GPU. However, with 4-bit quantization, memory drops to ~35–40 GB, which fits on a single NVIDIA A100 80GB or two RTX 4090s combined." },
    { q: "What is model quantization?", a: "Quantization reduces the numerical precision of model weights, shrinking memory requirements at a small quality cost. Common formats include INT8 (2× smaller than FP16), INT4 (4× smaller), and GGUF Q4_K_M (a popular format for llama.cpp). Most 4-bit quantized models retain 95%+ of the original quality." },
    { q: "What GPU do I need to run LLMs locally?", a: "For 7B models in 4-bit quantization, an 8–12 GB VRAM GPU like the RTX 3060 or 4060 is sufficient. For 13B models, 16–24 GB (RTX 3090, 4090). For 70B models, either multiple consumer GPUs or a professional A100/H100 is required." },
  ],
  "api-cost": [
    { q: "Which LLM API is the cheapest in 2025?", a: "For low-cost high-volume use, Gemini 1.5 Flash ($0.075/1M input tokens) and GPT-4o Mini ($0.15/1M input tokens) are among the cheapest commercial options. Open-source models like LLaMA 3 can be self-hosted for zero API cost, with only infrastructure expenses." },
    { q: "How much does GPT-4 cost per month?", a: "Monthly GPT-4o costs depend heavily on usage. At 1,000 requests/month with 1,000 input and 500 output tokens each, GPT-4o costs approximately $3.75/month. At 100,000 requests with the same token counts, that becomes $375/month. Use our API cost calculator for your specific usage pattern." },
    { q: "How do I reduce LLM API costs?", a: "Key strategies to cut LLM API costs: (1) Use smaller models like GPT-4o Mini or Claude Haiku where quality allows. (2) Cache repeated prompts. (3) Shorten system prompts. (4) Use batch APIs for 50% discount on non-urgent tasks. (5) Self-host open-source models for very high volume." },
    { q: "Is Claude cheaper than GPT-4?", a: "Claude 3.5 Sonnet ($3/1M input, $15/1M output) and GPT-4o ($2.50/1M input, $10/1M output) are similarly priced. Claude 3 Haiku ($0.25/1M input) is significantly cheaper than GPT-4o Mini ($0.15/1M input). The best choice depends on your specific use case and required output quality." },
    { q: "What is batch API pricing?", a: "OpenAI, Anthropic, and Google offer batch processing APIs at roughly 50% off standard prices, in exchange for longer turnaround times (up to 24 hours). This is ideal for non-real-time workloads like data analysis, content generation, or document processing." },
  ],
  "context-window": [
    { q: "What is a context window in AI?", a: "A context window is the maximum amount of text an AI model can process in a single request. It includes your prompt, conversation history, documents you've attached, and the model's response. Context windows are measured in tokens — approximately 4 characters or 0.75 words per token in English." },
    { q: "Which AI has the largest context window?", a: "As of 2025, Google Gemini 1.5 Pro and Flash offer the largest context window at 1,000,000 tokens (approximately 750,000 words or 2,500 pages). Anthropic's Claude models offer 200,000 tokens, while OpenAI's GPT-4o supports 128,000 tokens." },
    { q: "How many pages can Claude read at once?", a: "Claude 3.5 Sonnet has a 200,000 token context window, which can hold approximately 150,000 words or 600 pages of English text. For Chinese or Japanese text, the page count is lower due to higher tokens-per-character ratios." },
    { q: "What happens when you exceed the context window limit?", a: "When you exceed an LLM's context window, one of two things happens: (1) the API returns an error requiring you to shorten your input, or (2) older parts of the conversation are silently truncated. Production systems typically handle this with summarization, sliding window approaches, or RAG (retrieval-augmented generation)." },
    { q: "What is RAG and how does it relate to context windows?", a: "RAG (Retrieval-Augmented Generation) is a technique where only the most relevant chunks of a large document are retrieved and placed into the context window, rather than the entire document. This allows LLMs to effectively 'read' documents much larger than their context limit, while also reducing cost." },
  ],
  "compute-units": [
    { q: "What is a TFLOP in AI?", a: "A TFLOP (TeraFLOP) equals one trillion floating-point operations per second. It's the standard unit for measuring AI hardware performance. For example, the NVIDIA H100 GPU delivers 204 TFLOPS in FP16, while the RTX 4090 delivers 82.6 TFLOPS." },
    { q: "How much compute is needed to train an LLM?", a: "Training compute scales roughly with model size and training data. GPT-3 (175B parameters) required an estimated 3.14 × 10²³ FLOPs. Larger frontier models like GPT-4 are estimated to require 10²⁴–10²⁵ FLOPs. At H100 efficiency, that's tens of thousands of GPU-years." },
    { q: "What is the difference between FP16 and FP32 performance?", a: "FP16 (16-bit floating point) allows GPUs to perform roughly 2–4× more operations per second than FP32 (32-bit) because each number uses half the memory bandwidth. AI training and inference has largely shifted to FP16 and BF16 to exploit this performance advantage." },
    { q: "How does H100 compare to A100?", a: "The NVIDIA H100 SXM delivers approximately 204 TFLOPS in FP16, versus 77.97 TFLOPS for the A100 — about 2.6× more raw compute. The H100 also has faster memory bandwidth (3.35 TB/s vs 2 TB/s) and NVLink interconnect improvements that benefit large model training." },
    { q: "What is a petaFLOP-day?", a: "A petaFLOP-day is a unit of total compute equal to 10¹⁵ floating-point operations sustained for 24 hours, or 8.64 × 10¹⁹ total FLOPs. It's commonly used to measure AI training runs. GPT-3 required approximately 3,640 petaFLOP-days to train." },
  ],
};
