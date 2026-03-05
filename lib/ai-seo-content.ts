// lib/ai-seo-content.ts
// SEO content for each AI tool page

export interface AiToolSeoContent {
  headline: string;
  subheadline: string;
  intro: string;
  useCases: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  quickFact: string;
  keywords: string[];
}

const content: Record<string, AiToolSeoContent> = {

  "token-calculator": {
    headline: "How Many Tokens Is My Text?",
    subheadline: "Instantly estimate token count for GPT-4, Claude, Gemini and more.",
    intro: "Every time you send a message to an LLM, your text is broken into tokens before the model processes it. Tokens are not the same as words — a single word can be 1–3 tokens, and punctuation counts too. Understanding token count helps you control API costs, stay within context limits, and write more efficient prompts.",
    useCases: [
      { title: "Prompt Engineering", desc: "Optimize your system prompts and few-shot examples to reduce token usage without losing quality." },
      { title: "Cost Estimation", desc: "Before running a batch job, estimate how much it will cost across different model providers." },
      { title: "Context Management", desc: "Check if your document or conversation history fits within a model's context window before sending." },
      { title: "Comparing Models", desc: "Different models tokenize text differently — Claude and GPT use slightly different tokenizers, affecting cost." },
    ],
    faqs: [
      { q: "What is a token in AI?", a: "A token is the basic unit of text that LLMs process. In English, 1 token ≈ 4 characters or ¾ of a word. The sentence 'Hello world' is typically 2 tokens." },
      { q: "Why do tokens matter for cost?", a: "LLM APIs charge per token — both input (your prompt) and output (the model's response). A 1,000-token prompt sent 10,000 times per month adds up quickly." },
      { q: "Is tokenization the same for all models?", a: "No. GPT models use tiktoken, Claude uses a different BPE tokenizer, and Chinese/Japanese text uses far more tokens per character than English." },
      { q: "How many tokens is a page of text?", a: "A typical A4 page (~500 English words) is approximately 650–750 tokens. A full novel (~80,000 words) would be roughly 100,000 tokens." },
      { q: "What's the difference between input and output tokens?", a: "Input tokens are what you send to the model (your prompt). Output tokens are what the model generates. Output tokens typically cost 3–4× more than input tokens." },
    ],
    quickFact: "GPT-4o can process 128,000 tokens in a single request — equivalent to roughly 300 pages of text.",
    keywords: ["token calculator", "how many tokens", "gpt token counter", "claude tokens", "llm token estimator", "openai token calculator", "tokens to words", "prompt token count"],
  },

  "model-size": {
    headline: "How Much GPU Memory Does Your Model Need?",
    subheadline: "Calculate VRAM requirements for any LLM based on parameter count and precision.",
    intro: "Running large language models locally requires understanding GPU memory requirements. A 7B parameter model in FP16 needs ~14 GB of VRAM just for weights — before accounting for KV cache and activations. This calculator helps you plan hardware before committing to expensive cloud instances or GPU purchases.",
    useCases: [
      { title: "Local LLM Setup", desc: "Find out if your RTX 4090 (24GB) can run LLaMA 3 70B with 4-bit quantization before downloading 40GB of weights." },
      { title: "Cloud Cost Planning", desc: "Determine whether you need an A100 40GB or 80GB instance, saving $2–5/hour on cloud GPU costs." },
      { title: "Quantization Tradeoffs", desc: "Compare FP16 vs INT4 precision to balance model quality against memory constraints." },
      { title: "Multi-GPU Setups", desc: "Plan how many GPUs you need to run large models like LLaMA 3 405B or GPT-3 scale models." },
    ],
    faqs: [
      { q: "Why does model size in GB differ from parameter count?", a: "A 7B parameter model has 7 billion numbers. In FP16 (2 bytes each), that's 14 GB — but you also need memory for the KV cache, activations, and optimizer states during inference." },
      { q: "What is quantization?", a: "Quantization reduces the precision of model weights — from 32-bit floats down to 8-bit integers or even 4-bit. A 7B model in INT4 can fit in ~4 GB VRAM, making it runnable on consumer GPUs." },
      { q: "What's the minimum GPU to run LLaMA 3 8B?", a: "In 4-bit quantization (GGUF Q4), LLaMA 3 8B requires approximately 5–6 GB VRAM, making it runnable on an RTX 3060 (12GB) or even some 8GB cards." },
      { q: "Can I run LLMs on CPU instead of GPU?", a: "Yes, using llama.cpp or Ollama. CPU inference is 10–50× slower but works without a GPU. A 7B Q4 model runs at ~5–15 tokens/sec on a modern CPU." },
      { q: "What is GGUF Q4_K_M?", a: "GGUF is a file format for quantized models, popularized by llama.cpp. Q4_K_M means 4-bit quantization with a 'medium' variant that preserves quality better than basic Q4." },
    ],
    quickFact: "Meta's LLaMA 3 405B model requires approximately 810 GB of VRAM in FP16 — that's 10× NVIDIA A100 80GB GPUs just to load the weights.",
    keywords: ["llm memory calculator", "gpu vram calculator", "model size estimator", "how much vram for llama", "llm hardware requirements", "quantization calculator", "run llm locally", "7b model gpu memory"],
  },

  "api-cost": {
    headline: "Compare LLM API Costs Across All Major Providers",
    subheadline: "Calculate monthly costs for OpenAI, Anthropic Claude, Google Gemini and more.",
    intro: "LLM API pricing varies wildly between providers and models. GPT-4 Turbo costs 40× more than GPT-4o Mini for the same task. Claude 3 Haiku is often the cheapest option for high-volume applications, while Gemini 1.5 Flash offers the lowest price for long-context workloads. This calculator helps you compare real monthly costs before choosing a provider.",
    useCases: [
      { title: "Startup Cost Planning", desc: "Estimate monthly API spend before building a product, so you can price your service profitably." },
      { title: "Model Migration", desc: "Calculate how much you'd save by switching from GPT-4 Turbo to Claude 3.5 Sonnet for your use case." },
      { title: "Batch Processing Jobs", desc: "Estimate costs for one-time jobs like processing a database of 100,000 documents with an LLM." },
      { title: "Choosing the Right Tier", desc: "Decide whether a premium model's quality improvement justifies the 10–50× cost increase over a budget model." },
    ],
    faqs: [
      { q: "Why are input and output tokens priced differently?", a: "Generating tokens (output) requires more compute than reading tokens (input). Output tokens typically cost 3–4× more, which means response length significantly impacts cost." },
      { q: "Which LLM API is the cheapest?", a: "For high volume, Gemini 1.5 Flash ($0.075/1M input) and GPT-4o Mini ($0.15/1M input) are among the cheapest. For self-hosting, open-source models like LLaMA 3 have zero API costs." },
      { q: "Does Anthropic offer batch discounts?", a: "Yes — Anthropic, OpenAI, and Google all offer batch API pricing (typically 50% off) for non-real-time workloads with longer turnaround times." },
      { q: "How do I reduce LLM API costs?", a: "Key strategies: use smaller/cheaper models where quality allows, cache repeated prompts, compress system prompts, use streaming to detect early stopping, and use batch APIs for non-urgent tasks." },
      { q: "Is self-hosting cheaper than APIs?", a: "For high volume (millions of tokens/day), self-hosting on cloud GPUs can be 5–10× cheaper. For low volume, APIs are almost always more cost-effective than paying for GPU instances 24/7." },
    ],
    quickFact: "Processing 1 million tokens with GPT-4 Turbo costs $10 in input + $30 in output = $40 total. The same task with GPT-4o Mini costs $0.15 + $0.60 = $0.75 — 53× cheaper.",
    keywords: ["llm api cost calculator", "openai pricing calculator", "claude api cost", "gpt-4 cost estimator", "compare llm prices", "anthropic vs openai cost", "gemini api pricing", "chatgpt api monthly cost"],
  },

  "context-window": {
    headline: "How Much Text Fits in an LLM's Context Window?",
    subheadline: "See exactly how many pages, words and documents fit inside GPT-4, Claude and Gemini.",
    intro: "Context window size determines how much information an LLM can 'see' at once. A 128K context window can hold an entire novel; a 1M context window can process hours of meeting transcripts. Understanding context limits helps you design better RAG systems, choose the right model for long documents, and avoid costly 'context overflow' errors in production.",
    useCases: [
      { title: "Document Q&A", desc: "Determine if your PDF or report fits in a single context, or if you need to chunk it for RAG retrieval." },
      { title: "Code Analysis", desc: "Check if an entire codebase can fit in Claude's 200K context for whole-repository analysis." },
      { title: "Long Conversation Bots", desc: "Calculate how many conversation turns fit before you need to summarize and compress chat history." },
      { title: "Model Selection", desc: "Choose between GPT-4o (128K) and Gemini 1.5 Pro (1M) based on your document length requirements." },
    ],
    faqs: [
      { q: "What is a context window?", a: "The context window is the maximum amount of text an LLM can process in a single request — including your prompt, conversation history, and the model's response. It's measured in tokens." },
      { q: "What happens when you exceed the context limit?", a: "The API returns an error, or older parts of the conversation are silently truncated. Most production systems use summarization or RAG to handle documents larger than the context window." },
      { q: "Does a larger context window cost more?", a: "Yes. Providers charge per token, so filling a 1M context window costs ~8× more than a 128K window. Gemini 1.5 Pro also has a tiered pricing model above 128K tokens." },
      { q: "Is bigger always better for context windows?", a: "Not always. Research shows LLM accuracy on 'needle in a haystack' tasks degrades with very long contexts — models struggle to find relevant information buried in 500K+ tokens." },
      { q: "What is RAG and when should I use it?", a: "RAG (Retrieval-Augmented Generation) retrieves only the relevant chunks of a large document before sending them to the LLM. Use RAG when your knowledge base is larger than the context window, or to reduce costs." },
    ],
    quickFact: "Gemini 1.5 Pro's 1M token context window can hold approximately 2,500 pages of text, 30,000 lines of code, or 11 hours of meeting transcripts.",
    keywords: ["context window calculator", "llm context length", "how many pages gpt-4 context", "claude 200k context", "gemini 1m context", "token context limit", "llm document length", "context window comparison"],
  },

  "compute-units": {
    headline: "Convert AI Compute Units: FLOPS, TFLOPS, PFLOPS",
    subheadline: "Understand and compare AI hardware performance metrics.",
    intro: "AI compute is measured in FLOPS (Floating Point Operations Per Second). A modern GPU like the NVIDIA H100 delivers 204 TFLOPS of FP16 performance. Training GPT-3 required approximately 3.14 × 10²³ FLOPS. These numbers are hard to grasp — this converter puts them in context by comparing to real hardware and historical AI milestones.",
    useCases: [
      { title: "Hardware Comparison", desc: "Compare the compute of an RTX 4090 vs A100 vs H100 in a common unit to evaluate price-performance." },
      { title: "Training Cost Estimation", desc: "Convert published training compute (e.g. 6×10²³ FLOPs for GPT-4 estimates) to GPU-hours on specific hardware." },
      { title: "Research Papers", desc: "Understand compute requirements cited in ML papers and reproduce or compare them to your own hardware." },
      { title: "AI Infrastructure Planning", desc: "Plan data center GPU clusters by calculating total PFLOPS needed for your training and inference workloads." },
    ],
    faqs: [
      { q: "What is a FLOP in AI?", a: "A FLOP is a single floating-point mathematical operation (like multiplication or addition). Modern AI models require trillions (TFLOPS) or quadrillions (PFLOPS) of FLOPs to run." },
      { q: "What's the difference between FP32, FP16, and INT8 FLOPS?", a: "Lower precision (FP16, INT8) allows more operations per second on the same hardware. An A100 delivers 19.5 TFLOPS in FP32, but 77.97 TFLOPS in FP16 — 4× more — because each operation uses half the memory bandwidth." },
      { q: "How much compute did it take to train GPT-4?", a: "OpenAI hasn't disclosed exact numbers. Estimates range from 2×10²⁴ to 10²⁵ FLOPs, based on model size and training token count. At H100 efficiency, that's roughly 10,000–50,000 GPU-years." },
      { q: "What is a GPU-hour?", a: "A GPU-hour is the amount of compute delivered by one GPU running for one hour. It's a common billing unit for cloud GPU services. 1 A100 GPU-hour ≈ 77.97 TFLOPS × 3,600 seconds = 280,692 TFLOP-seconds." },
      { q: "How does AI compute growth compare to Moore's Law?", a: "GPU compute for AI has grown roughly 2× every 6 months since 2012 — much faster than Moore's Law (2× every 18–24 months). This is partly due to specialized AI chips and architectural improvements." },
    ],
    quickFact: "Training GPT-3 (175B parameters) required an estimated 3.14 × 10²³ FLOPs — equivalent to running an RTX 4090 at full speed for approximately 120 years.",
    keywords: ["flops calculator", "tflops to pflops", "ai compute units", "gpu flops comparison", "h100 tflops", "a100 performance", "ai training compute", "flops converter"],
  },
};

export function getAiToolSeoContent(slug: string): AiToolSeoContent | null {
  return content[slug] ?? null;
}
