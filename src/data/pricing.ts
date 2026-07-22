// AI Model Pricing Data - Verified from Official Sources
// Last Updated: July 22, 2026
// NO API DEPENDENCIES - Update manually via web search

export interface ModelPricing {
  provider: string;
  model: string;
  releaseDate: string;
  inputCost: number; // per 1M tokens
  outputCost: number; // per 1M tokens
  contextWindow: number;
  maxOutput: number;
  source: string;
  sourceUrl: string;
  lastVerified: string;
  notes?: string;
}

// Verified from: https://platform.openai.com/docs/pricing/ and https://platform.openai.com/docs/models
export const openaiModels: ModelPricing[] = [
  {
    provider: 'OpenAI',
    model: 'GPT-5.6 Sol',
    releaseDate: '2026-07-09',
    inputCost: 5.00,
    outputCost: 30.00,
    contextWindow: 1050000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
    lastVerified: '2026-07-22',
    notes: 'Frontier model in the GPT-5.6 family; the gpt-5.6 alias routes to GPT-5.6 Sol.'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.6 Terra',
    releaseDate: '2026-07-09',
    inputCost: 2.50,
    outputCost: 15.00,
    contextWindow: 1050000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-5.6-terra',
    lastVerified: '2026-07-22',
    notes: 'GPT-5.6 balance of intelligence and cost.'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.6 Luna',
    releaseDate: '2026-07-09',
    inputCost: 1.00,
    outputCost: 6.00,
    contextWindow: 1050000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-5.6-luna',
    lastVerified: '2026-07-22',
    notes: 'GPT-5.6 model for efficient, high-volume workloads.'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.5',
    releaseDate: '2026-05-01',
    inputCost: 5.00,
    outputCost: 30.00,
    contextWindow: 1000000,
    maxOutput: 128000,
    source: 'OpenAI Official Models',
    sourceUrl: 'https://platform.openai.com/docs/models',
    lastVerified: '2026-06-03',
    notes: 'Prior OpenAI flagship for complex reasoning and coding'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.4',
    releaseDate: '2026-03-05',
    inputCost: 2.50,
    outputCost: 15.00,
    contextWindow: 1000000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://platform.openai.com/docs/models',
    lastVerified: '2026-06-03',
    notes: 'Affordable frontier model for coding and professional workflows'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.2-Codex',
    releaseDate: '2026-03-01',
    inputCost: 1.75,
    outputCost: 14.00,
    contextWindow: 400000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://developers.openai.com/api/docs/models/gpt-5.2-codex',
    lastVerified: '2026-06-03',
    notes: 'Coding-focused model for long-horizon agentic coding'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.2',
    releaseDate: '2025-12-15',
    inputCost: 1.75,
    outputCost: 14.00,
    contextWindow: 400000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://platform.openai.com/docs/pricing/',
    lastVerified: '2026-06-03'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5 Chat',
    releaseDate: '2025-10-01',
    inputCost: 1.50,
    outputCost: 12.00,
    contextWindow: 128000,
    maxOutput: 16384,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://platform.openai.com/docs/pricing/',
    lastVerified: '2026-06-03'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-4.1-mini',
    releaseDate: '2026-01-15',
    inputCost: 0.40,
    outputCost: 1.60,
    contextWindow: 1047576,
    maxOutput: 32768,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://platform.openai.com/docs/pricing/',
    lastVerified: '2026-06-03',
    notes: 'Budget-friendly option'
  }
];

// Verified from: https://docs.anthropic.com/en/docs/about-claude/pricing
export const anthropicModels: ModelPricing[] = [
  {
    provider: 'Anthropic',
    model: 'Claude Fable 5',
    releaseDate: '2026-06-09',
    inputCost: 10.00,
    outputCost: 50.00,
    contextWindow: 1000000,
    maxOutput: 128000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://docs.anthropic.com/en/docs/about-claude/pricing',
    lastVerified: '2026-07-06',
    notes: 'Next-generation intelligence for long-running agents; generally available on Claude API and supported cloud platforms'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Opus 4.8',
    releaseDate: '2026-06-09',
    inputCost: 5.00,
    outputCost: 25.00,
    contextWindow: 1000000,
    maxOutput: 128000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://docs.anthropic.com/en/docs/about-claude/pricing',
    lastVerified: '2026-07-06',
    notes: 'Current Anthropic pick for complex agentic coding and enterprise work'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Sonnet 5',
    releaseDate: '2026-06-09',
    inputCost: 3.00,
    outputCost: 15.00,
    contextWindow: 1000000,
    maxOutput: 128000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://docs.anthropic.com/en/docs/about-claude/pricing',
    lastVerified: '2026-07-06',
    notes: 'Best combination of speed and intelligence; introductory $2/$10 per MTok through Aug 31, 2026'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Haiku 4.5',
    releaseDate: '2025-10-01',
    inputCost: 1.00,
    outputCost: 5.00,
    contextWindow: 200000,
    maxOutput: 64000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://docs.anthropic.com/en/docs/about-claude/pricing',
    lastVerified: '2026-07-06',
    notes: 'Fastest current Claude model with extended thinking'
  }
];

// Verified from: https://ai.google.dev/gemini-api/docs/pricing
export const googleModels: ModelPricing[] = [
  {
    provider: 'Google',
    model: 'Gemini 3.5 Flash',
    releaseDate: '2026-05-20',
    inputCost: 1.50,
    outputCost: 9.00,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-06-03',
    notes: 'Current stable Gemini model for speed, search grounding, and high-volume multimodal agents'
  },
  {
    provider: 'Google',
    model: 'Gemini 3.1 Pro Preview',
    releaseDate: '2026-02-15',
    inputCost: 2.00,
    outputCost: 12.00,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-06-03',
    notes: 'Preview model; standard tier pricing for prompts <= 200k tokens'
  },
  {
    provider: 'Google',
    model: 'Gemini 3.6 Flash',
    releaseDate: '2026-07-21',
    inputCost: 1.50,
    outputCost: 7.50,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-07-21',
    notes: 'Stable model for agentic and multimodal tasks; Batch and Flex tiers are lower.'
  },
  {
    provider: 'Google',
    model: 'Gemini 3.5 Flash-Lite',
    releaseDate: '2026-07-21',
    inputCost: 0.30,
    outputCost: 2.50,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-07-21',
    notes: 'Stable low-latency model for high-volume automation; Batch and Flex tiers are lower.'
  },
  {
    provider: 'Google',
    model: 'Gemini 3.1 Flash-Lite',
    releaseDate: '2026-03-01',
    inputCost: 0.25,
    outputCost: 1.50,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-06-03',
    notes: 'Cost-efficient Gemini 3.1 model for high-volume agentic tasks'
  },
  {
    provider: 'Google',
    model: 'Gemini 2.5 Flash',
    releaseDate: '2025-12-10',
    inputCost: 0.075,
    outputCost: 0.30,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-03-09',
    notes: 'Fast and cheap'
  }
];

// Verified from: https://open.bigmodel.cn/pricing (translated)
export const zhipuModels: ModelPricing[] = [
  {
    provider: 'Zhipu AI',
    model: 'GLM-5',
    releaseDate: '2026-02-20',
    inputCost: 0.50,
    outputCost: 2.00,
    contextWindow: 204800,
    maxOutput: 131072,
    source: 'Zhipu Official Pricing (converted from CNY)',
    sourceUrl: 'https://open.bigmodel.cn/pricing',
    lastVerified: '2026-03-09',
    notes: 'Free tier available via Z.AI'
  },
  {
    provider: 'Zhipu AI',
    model: 'GLM-4.7 Flash',
    releaseDate: '2026-01-10',
    inputCost: 0.014,
    outputCost: 0.014,
    contextWindow: 204800,
    maxOutput: 131072,
    source: 'Zhipu Official Pricing (converted from CNY)',
    sourceUrl: 'https://open.bigmodel.cn/pricing',
    lastVerified: '2026-03-09',
    notes: 'Ultra-cheap, fast'
  }
];

// Verified from: Meta official announcements and host pricing estimates.
export const metaModels: ModelPricing[] = [
  {
    provider: 'Meta',
    model: 'Llama 4 Maverick',
    releaseDate: '2025-04-05',
    inputCost: 2.00,
    outputCost: 8.00,
    contextWindow: 1000000,
    maxOutput: 8192,
    source: 'Meta Llama 4 announcement plus host pricing estimates',
    sourceUrl: 'https://ai.meta.com/blog/llama-4-multimodal-intelligence/',
    lastVerified: '2026-06-03',
    notes: 'Open-weight multimodal model; pricing varies by host'
  },
  {
    provider: 'Meta',
    model: 'Llama 4 Scout',
    releaseDate: '2025-04-05',
    inputCost: 0.30,
    outputCost: 1.20,
    contextWindow: 10000000,
    maxOutput: 8192,
    source: 'Meta Llama 4 announcement plus host pricing estimates',
    sourceUrl: 'https://ai.meta.com/blog/llama-4-multimodal-intelligence/',
    lastVerified: '2026-06-03',
    notes: 'Open-weight long-context model; pricing varies by host'
  }
];

// All models combined
export const allModels: ModelPricing[] = [
  ...openaiModels,
  ...anthropicModels,
  ...googleModels,
  ...zhipuModels,
  ...metaModels
].sort((a, b) => a.inputCost - b.inputCost);

// Helper to calculate monthly cost
export function calculateMonthlyCost(
  inputTokensPerDay: number,
  outputTokensPerDay: number,
  pricing: ModelPricing
): number {
  const daysPerMonth = 30;
  const inputCost = (inputTokensPerDay / 1000000) * pricing.inputCost * daysPerMonth;
  const outputCost = (outputTokensPerDay / 1000000) * pricing.outputCost * daysPerMonth;
  return inputCost + outputCost;
}

// Provider list for filtering
export const providers = ['OpenAI', 'Anthropic', 'Google', 'Zhipu AI', 'Meta'] as const;
export type Provider = typeof providers[number];
