// AI Model Pricing Data - Verified from Official Sources
// Last Updated: March 9, 2026
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

// Verified from: https://openai.com/api/pricing/ and https://www.tldl.io/resources/openai-api-pricing
export const openaiModels: ModelPricing[] = [
  {
    provider: 'OpenAI',
    model: 'GPT-5.4',
    releaseDate: '2026-03-05',
    inputCost: 2.50,
    outputCost: 15.00,
    contextWindow: 1050000,
    maxOutput: 128000,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://openai.com/api/pricing/',
    lastVerified: '2026-03-09',
    notes: 'Latest frontier model, released March 5, 2026'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.3 Codex',
    releaseDate: '2026-02-20',
    inputCost: 3.00,
    outputCost: 15.00,
    contextWindow: 200000,
    maxOutput: 65536,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://openai.com/api/pricing/',
    lastVerified: '2026-03-09',
    notes: 'Coding-focused model'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.2',
    releaseDate: '2025-12-15',
    inputCost: 1.75,
    outputCost: 14.00,
    contextWindow: 128000,
    maxOutput: 16384,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://openai.com/api/pricing/',
    lastVerified: '2026-03-09'
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
    sourceUrl: 'https://openai.com/api/pricing/',
    lastVerified: '2026-03-09'
  },
  {
    provider: 'OpenAI',
    model: 'GPT-4.1-mini',
    releaseDate: '2026-01-15',
    inputCost: 0.15,
    outputCost: 0.60,
    contextWindow: 128000,
    maxOutput: 16384,
    source: 'OpenAI Official Pricing',
    sourceUrl: 'https://openai.com/api/pricing/',
    lastVerified: '2026-03-09',
    notes: 'Budget-friendly option'
  }
];

// Verified from: https://platform.claude.com/docs/en/about-claude/pricing and https://www.tldl.io/resources/anthropic-api-pricing
export const anthropicModels: ModelPricing[] = [
  {
    provider: 'Anthropic',
    model: 'Claude Opus 4.7',
    releaseDate: '2026-02-28',
    inputCost: 5.00,
    outputCost: 25.00,
    contextWindow: 200000,
    maxOutput: 32000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
    lastVerified: '2026-03-09',
    notes: 'Most capable Claude model'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Opus 4.6',
    releaseDate: '2026-02-01',
    inputCost: 5.00,
    outputCost: 25.00,
    contextWindow: 200000,
    maxOutput: 32000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
    lastVerified: '2026-03-09'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Sonnet 4.6',
    releaseDate: '2026-01-15',
    inputCost: 3.00,
    outputCost: 15.00,
    contextWindow: 200000,
    maxOutput: 16000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
    lastVerified: '2026-03-09',
    notes: 'Balanced performance/cost'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Sonnet 4.5',
    releaseDate: '2025-12-01',
    inputCost: 3.00,
    outputCost: 15.00,
    contextWindow: 200000,
    maxOutput: 16000,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
    lastVerified: '2026-03-09'
  },
  {
    provider: 'Anthropic',
    model: 'Claude Haiku 4.5',
    releaseDate: '2025-11-15',
    inputCost: 0.25,
    outputCost: 1.25,
    contextWindow: 200000,
    maxOutput: 8192,
    source: 'Anthropic Official Pricing',
    sourceUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
    lastVerified: '2026-03-09',
    notes: 'Fastest and cheapest'
  }
];

// Verified from: https://ai.google.dev/gemini-api/docs/pricing
export const googleModels: ModelPricing[] = [
  {
    provider: 'Google',
    model: 'Gemini 3.5 Pro',
    releaseDate: '2026-02-15',
    inputCost: 1.25,
    outputCost: 5.00,
    contextWindow: 1048576,
    maxOutput: 65536,
    source: 'Google AI Official Pricing',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    lastVerified: '2026-03-09',
    notes: 'Best long-context handling'
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

// Verified from: Meta official announcements and https://artificialanalysis.ai/
export const metaModels: ModelPricing[] = [
  {
    provider: 'Meta',
    model: 'Llama 4 (405B)',
    releaseDate: '2026-01-28',
    inputCost: 2.00,
    outputCost: 8.00,
    contextWindow: 128000,
    maxOutput: 8192,
    source: 'Artificial Analysis estimate (open source)',
    sourceUrl: 'https://artificialanalysis.ai/',
    lastVerified: '2026-03-09',
    notes: 'Open source - pricing varies by host'
  },
  {
    provider: 'Meta',
    model: 'Llama 4 (70B)',
    releaseDate: '2026-01-28',
    inputCost: 0.30,
    outputCost: 1.20,
    contextWindow: 128000,
    maxOutput: 8192,
    source: 'Artificial Analysis estimate (open source)',
    sourceUrl: 'https://artificialanalysis.ai/',
    lastVerified: '2026-03-09',
    notes: 'Open source - pricing varies by host'
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
