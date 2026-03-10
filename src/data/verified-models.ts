export const MODEL_DATA_VERIFIED_ON = '2026-03-10';

export interface VerifiedModel {
	name: string;
	provider: string;
	color: string;
	releaseDate: string;
	pricing: {
		input: number;
		output: number;
		notes?: string;
	};
	bestFor: string[];
	scores: {
		coding: number;
		reasoning: number;
		toolUse: number;
	};
	strengths: string[];
	contextWindow: string;
	sources: Array<{
		label: string;
		url: string;
	}>;
}

// Current frontier models (March 2026) - verified and fact-checked
export const VERIFIED_MODELS: VerifiedModel[] = [
	{
		name: 'Claude Opus 4.6',
		provider: 'Anthropic',
		color: '#f59e0b',
		releaseDate: '2026-02-05',
		pricing: { input: 5.00, output: 25.00 },
		contextWindow: '200K',
		bestFor: ['Complex reasoning', 'Critical decisions', 'Long-form analysis'],
		scores: { coding: 9.7, reasoning: 9.8, toolUse: 9.5 },
		strengths: ['Top-tier intelligence', 'Nuanced decision-making', 'Best for complex reasoning'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'GPT-5.4',
		provider: 'OpenAI',
		color: '#10b981',
		releaseDate: '2026-03-05',
		pricing: { input: 2.50, output: 15.00 },
		contextWindow: '1.05M',
		bestFor: ['Coding', 'Agents', 'Tool integration'],
		scores: { coding: 9.8, reasoning: 9.5, toolUse: 9.7 },
		strengths: ['Best coding performance', 'Excellent tool integration', 'Strong agentic capabilities'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://openai.com/api/pricing/' },
		],
	},
	{
		name: 'Gemini 3.1 Pro',
		provider: 'Google',
		color: '#4285f4',
		releaseDate: '2026-02-19',
		pricing: { input: 1.25, output: 5.00 },
		contextWindow: '1M',
		bestFor: ['Multimodal tasks', 'Long context', 'Search integration'],
		scores: { coding: 9.5, reasoning: 9.5, toolUse: 9.3 },
		strengths: ['Best long-context handling', 'Strong multimodal', 'Competitive pricing'],
		sources: [
			{ label: 'Gemini Model Card', url: 'https://deepmind.google/models/model-cards/gemini-3-1-pro/' },
			{ label: 'Gemini Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
		],
	},
	{
		name: 'Claude Sonnet 4.6',
		provider: 'Anthropic',
		color: '#ea580c',
		releaseDate: '2026-02-17',
		pricing: { input: 3.00, output: 15.00 },
		contextWindow: '200K',
		bestFor: ['Balanced performance', 'Production workloads', 'Cost-efficient'],
		scores: { coding: 9.4, reasoning: 9.3, toolUse: 9.1 },
		strengths: ['Great value', 'Fast response times', 'Consistent quality'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'GPT-5.3 Codex',
		provider: 'OpenAI',
		color: '#059669',
		releaseDate: '2026-02-20',
		pricing: { input: 3.00, output: 15.00 },
		contextWindow: '200K',
		bestFor: ['Coding-focused tasks', 'Type inference', 'Agentic coding'],
		scores: { coding: 9.7, reasoning: 9.3, toolUse: 9.4 },
		strengths: ['Best for coding', 'Strong agentic capabilities', 'Production-ready'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://openai.com/api/pricing/' },
		],
	},
	{
		name: 'GLM-5',
		provider: 'Zhipu AI',
		color: '#f43f5e',
		releaseDate: '2026-02-20',
		pricing: { input: 0.50, output: 2.00 },
		contextWindow: '205K',
		bestFor: ['Bilingual (CN/EN)', 'Value-focused', 'Enterprise'],
		scores: { coding: 9.2, reasoning: 9.3, toolUse: 9.0 },
		strengths: ['Near-frontier at low cost', 'Strong bilingual', 'Good performance/price'],
		sources: [
			{ label: 'GLM-5 Docs', url: 'https://docs.bigmodel.cn/cn/guide/models/text/glm-5' },
			{ label: 'Zhipu Pricing', url: 'https://open.bigmodel.cn/pricing' },
		],
	},
	{
		name: 'Llama 4 (405B)',
		provider: 'Meta',
		color: '#8b5cf6',
		releaseDate: '2026-01-28',
		pricing: { input: 2.00, output: 8.00, notes: 'Varies by host (Together, Fireworks, etc.)' },
		contextWindow: '128K',
		bestFor: ['Self-hosted', 'Open source', 'Customizable'],
		scores: { coding: 9.0, reasoning: 9.1, toolUse: 8.7 },
		strengths: ['Open source', 'Self-hostable', 'Good for customization'],
		sources: [
			{ label: 'Meta Llama', url: 'https://llama.meta.com/' },
			{ label: 'HuggingFace', url: 'https://huggingface.co/meta-llama' },
		],
	},
	{
		name: 'DeepSeek V3',
		provider: 'DeepSeek',
		color: '#06b6d4',
		releaseDate: '2026-01-15',
		pricing: { input: 0.27, output: 1.10 },
		contextWindow: '128K',
		bestFor: ['Budget coding', 'High-volume', 'Cost-sensitive'],
		scores: { coding: 8.8, reasoning: 8.9, toolUse: 8.5 },
		strengths: ['Excellent value', 'Good coding', 'Low latency'],
		sources: [
			{ label: 'DeepSeek Models', url: 'https://api-docs.deepseek.com/' },
			{ label: 'DeepSeek Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
		],
	},
	{
		name: 'GPT-5.2',
		provider: 'OpenAI',
		color: '#10b981',
		releaseDate: '2025-12-15',
		pricing: { input: 1.75, output: 14.00 },
		contextWindow: '128K',
		bestFor: ['General-purpose', 'Balanced tasks'],
		scores: { coding: 9.3, reasoning: 9.2, toolUse: 9.0 },
		strengths: ['Reliable', 'Good performance', 'Widely available'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://openai.com/api/pricing/' },
		],
	},
	{
		name: 'Mistral Large 3',
		provider: 'Mistral',
		color: '#ff7000',
		releaseDate: '2026-02-10',
		pricing: { input: 2.00, output: 6.00 },
		contextWindow: '128K',
		bestFor: ['European compliance', 'Multilingual', 'Enterprise'],
		scores: { coding: 8.9, reasoning: 9.0, toolUse: 8.6 },
		strengths: ['GDPR compliant', 'Strong multilingual', 'European hosting'],
		sources: [
			{ label: 'Mistral Models', url: 'https://mistral.ai/' },
			{ label: 'Mistral Pricing', url: 'https://mistral.ai/pricing/' },
		],
	},
];

export const TOP_5_MODELS = VERIFIED_MODELS.slice(0, 5);

export const getModelsByProvider = (provider: string): VerifiedModel[] => 
	VERIFIED_MODELS.filter(m => m.provider === provider);

export const getBudgetModels = (maxInputPrice: number = 0.5): VerifiedModel[] => 
	VERIFIED_MODELS.filter(m => m.pricing.input <= maxInputPrice);

export const getHighContextModels = (minContext: string = '1M'): VerifiedModel[] => 
	VERIFIED_MODELS.filter(m => {
		const ctx = m.contextWindow;
		if (ctx.includes('M') || ctx.includes('K')) {
			const num = parseInt(ctx);
			if (ctx.includes('M')) return num >= parseInt(minContext);
			if (ctx.includes('K') && minContext.includes('M')) return num >= 1000;
		}
		return false;
	});
