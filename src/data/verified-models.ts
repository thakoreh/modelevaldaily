export const MODEL_DATA_VERIFIED_ON = '2026-02-16';

export interface VerifiedModel {
	name: string;
	provider: string;
	color: string;
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

export const VERIFIED_MODELS: VerifiedModel[] = [
	{
		name: 'GPT-5',
		provider: 'OpenAI',
		color: '#10b981',
		pricing: { input: 1.25, output: 10.0 },
		contextWindow: 'See provider docs',
		bestFor: ['Coding', 'Agents', 'Tool integrations'],
		scores: { coding: 9.4, reasoning: 9.2, toolUse: 9.5 },
		strengths: ['Strong coding + tool use', 'Stable API ecosystem', 'Good quality-to-cost balance'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing' },
		],
	},
	{
		name: 'Claude Opus 4.1',
		provider: 'Anthropic',
		color: '#d97706',
		pricing: { input: 15, output: 75 },
		contextWindow: '200K',
		bestFor: ['Complex reasoning', 'Long-form analysis', 'High-stakes drafting'],
		scores: { coding: 9.3, reasoning: 9.4, toolUse: 9.1 },
		strengths: ['Excellent reasoning depth', 'Strong instruction fidelity', 'Consistent long-context behavior'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models/all-models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'Gemini 2.5 Pro',
		provider: 'Google',
		color: '#4285f4',
		pricing: { input: 1.25, output: 10, notes: 'For prompts up to 200K tokens.' },
		contextWindow: '1M',
		bestFor: ['Large context tasks', 'Multimodal workflows', 'Research synthesis'],
		scores: { coding: 9.1, reasoning: 9.1, toolUse: 8.9 },
		strengths: ['Very large context', 'Strong multimodal support', 'Competitive long-context pricing'],
		sources: [
			{ label: 'Gemini Model List', url: 'https://ai.google.dev/gemini-api/docs/models' },
			{ label: 'Gemini API Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
		],
	},
	{
		name: 'DeepSeek-R1',
		provider: 'DeepSeek',
		color: '#8b5cf6',
		pricing: { input: 0.55, output: 2.19 },
		contextWindow: 'See provider docs',
		bestFor: ['Budget-conscious reasoning', 'Math-heavy tasks', 'Cost-sensitive coding'],
		scores: { coding: 8.9, reasoning: 9.0, toolUse: 8.5 },
		strengths: ['Strong price/performance', 'Reasoning-focused behavior', 'Low token cost'],
		sources: [
			{ label: 'DeepSeek Reasoning Model', url: 'https://api-docs.deepseek.com/guides/reasoning_model' },
			{ label: 'DeepSeek API Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
		],
	},
	{
		name: 'GLM-5',
		provider: 'Zhipu AI',
		color: '#f43f5e',
		pricing: { input: 0.75, output: 3.0 },
		contextWindow: 'See provider docs',
		bestFor: ['Chinese + English workflows', 'Value-focused deployment', 'Enterprise usage'],
		scores: { coding: 8.6, reasoning: 8.8, toolUse: 8.4 },
		strengths: ['Low API cost', 'Strong bilingual support', 'Competitive reasoning performance'],
		sources: [
			{ label: 'GLM-5 Introduction', url: 'https://docs.bigmodel.cn/cn/guide/models/text/glm-5' },
			{ label: 'Zhipu Pricing', url: 'https://open.bigmodel.cn/pricing' },
		],
	},
];
