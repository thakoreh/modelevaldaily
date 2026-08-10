export const MODEL_DATA_VERIFIED_ON = '2026-08-10';

// Last verification pass: 2026-08-10
// Official docs checked for OpenAI, Anthropic, Google, xAI, DeepSeek, Meta, Mistral, Alibaba/Qwen, Z.ai, Moonshot, MiniMax, Cohere, and source URL availability.

export const MODEL_SCORE_METHODOLOGY = {
	label: 'Editorial fit score',
	description: 'A directional decision aid derived from the catalog’s normalized coding, reasoning, and tool-use dimensions. It is not a universal benchmark result.',
	weights: { coding: 0.4, reasoning: 0.35, toolUse: 0.25 },
	verifiedOn: MODEL_DATA_VERIFIED_ON,
} as const;

export type ModelLifecycleStatus = 'available' | 'preview' | 'legacy';

export function getModelSlug(name: string) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getModelStatus(model: Pick<VerifiedModel, 'name' | 'strengths'>): ModelLifecycleStatus {
	const text = `${model.name} ${model.strengths.join(' ')}`.toLowerCase();
	if (text.includes('preview')) return 'preview';
	if (text.includes('legacy') || text.includes('deprecated')) return 'legacy';
	return 'available';
}

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

// Current frontier models - model names/pricing verified against provider docs.
export const VERIFIED_MODELS: VerifiedModel[] = [
	{
		name: 'GPT-5.6 Sol',
		provider: 'OpenAI',
		color: '#10b981',
		releaseDate: '2026-07-09',
		pricing: { input: 10.00, output: 45.00, notes: 'Standard long-context API tier (over 272K input tokens), per OpenAI pricing.' },
		contextWindow: '1.05M',
		bestFor: ['Complex production workflows', 'Coding', 'Multi-agent orchestration'],
		scores: { coding: 9.9, reasoning: 9.9, toolUse: 9.9 },
		strengths: ['OpenAI frontier model', 'Programmatic tool calling and persisted reasoning', '128K max output'],
		sources: [
			{ label: 'OpenAI GPT-5.6 Sol model card', url: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol' },
			{ label: 'OpenAI GPT-5.6 release notes', url: 'https://developers.openai.com/api/docs/changelog' },
			{ label: 'OpenAI Pricing', url: 'https://developers.openai.com/api/docs/pricing' },
		],
	},
	{
		name: 'GPT-5.6 Terra',
		provider: 'OpenAI',
		color: '#059669',
		releaseDate: '2026-07-09',
		pricing: { input: 4.00, output: 18.00, notes: 'Standard long-context API tier (over 272K input tokens), per OpenAI pricing.' },
		contextWindow: '1.05M',
		bestFor: ['Production agents', 'Coding', 'Cost-balanced workflows'],
		scores: { coding: 9.6, reasoning: 9.6, toolUse: 9.7 },
		strengths: ['GPT-5.6 balance of intelligence and cost', 'Programmatic tool calling and persisted reasoning', '128K max output'],
		sources: [
			{ label: 'OpenAI GPT-5.6 Terra model card', url: 'https://developers.openai.com/api/docs/models/gpt-5.6-terra' },
			{ label: 'OpenAI GPT-5.6 release notes', url: 'https://developers.openai.com/api/docs/changelog' },
			{ label: 'OpenAI Pricing', url: 'https://developers.openai.com/api/docs/pricing' },
		],
	},
	{
		name: 'GPT-5.6 Luna',
		provider: 'OpenAI',
		color: '#047857',
		releaseDate: '2026-07-09',
		pricing: { input: 0.40, output: 1.80, notes: 'Standard long-context API tier (over 272K input tokens), per OpenAI pricing.' },
		contextWindow: '1.05M',
		bestFor: ['High-volume workflows', 'Subagents', 'Cost-sensitive automation'],
		scores: { coding: 9.1, reasoning: 9.1, toolUse: 9.3 },
		strengths: ['GPT-5.6 model for efficient high-volume workloads', 'Programmatic tool calling and persisted reasoning', '128K max output'],
		sources: [
			{ label: 'OpenAI GPT-5.6 Luna model card', url: 'https://developers.openai.com/api/docs/models/gpt-5.6-luna' },
			{ label: 'OpenAI GPT-5.6 release notes', url: 'https://developers.openai.com/api/docs/changelog' },
			{ label: 'OpenAI Pricing', url: 'https://developers.openai.com/api/docs/pricing' },
		],
	},
	{
		name: 'GPT-5.5',
		provider: 'OpenAI',
		color: '#10b981',
		releaseDate: '2026-05-01',
		pricing: { input: 5.00, output: 30.00 },
		contextWindow: '1M',
		bestFor: ['Complex reasoning', 'Coding', 'Professional workflows'],
		scores: { coding: 9.8, reasoning: 9.8, toolUse: 9.7 },
		strengths: ['Prior OpenAI flagship', 'Strong coding and reasoning', 'Built-in tool support'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
		],
	},
	{
		name: 'Claude Fable 5',
		provider: 'Anthropic',
		color: '#7c3aed',
		releaseDate: '2026-06-09',
		pricing: { input: 10.00, output: 50.00 },
		contextWindow: '1M',
		bestFor: ['Long-running agents', 'Highest-capability tasks', 'Complex reasoning'],
		scores: { coding: 9.9, reasoning: 9.9, toolUse: 9.8 },
		strengths: ['Next-generation intelligence for long-running agents', 'Always-on adaptive thinking', '128K max output'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'Claude Opus 5',
		provider: 'Anthropic',
		color: '#d97706',
		releaseDate: '2026-07-24',
		pricing: { input: 5.00, output: 25.00 },
		contextWindow: '1M',
		bestFor: ['Complex reasoning', 'Long-running agents', 'Agentic coding'],
		scores: { coding: 9.9, reasoning: 9.9, toolUse: 9.8 },
		strengths: ['Latest Opus model for complex agentic coding', 'Thinking enabled by default', '128K max output'],
		sources: [
			{ label: 'Anthropic Claude Opus 5 release notes', url: 'https://platform.claude.com/docs/en/release-notes/overview' },
			{ label: 'Anthropic Models', url: 'https://platform.claude.com/docs/en/about-claude/models/overview' },
			{ label: 'Anthropic Pricing', url: 'https://platform.claude.com/docs/en/about-claude/pricing' },
		],
	},
	{
		name: 'Claude Opus 4.8',
		provider: 'Anthropic',
		color: '#f59e0b',
		releaseDate: '2026-06-09',
		pricing: { input: 5.00, output: 25.00 },
		contextWindow: '1M',
		bestFor: ['Complex reasoning', 'Agentic coding', 'Enterprise work'],
		scores: { coding: 9.8, reasoning: 9.8, toolUse: 9.6 },
		strengths: ['Established option for complex agentic coding', 'Adaptive thinking', '128K max output'],
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
		contextWindow: '1M',
		bestFor: ['Coding', 'Agents', 'Tool integration'],
		scores: { coding: 9.8, reasoning: 9.5, toolUse: 9.7 },
		strengths: ['Strong coding performance', 'Excellent tool integration', 'Strong agentic capabilities'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
		],
	},

	{
		name: 'Gemini 3.5 Flash',
		provider: 'Google',
		color: '#34a853',
		releaseDate: '2026-05-20',
		pricing: { input: 1.50, output: 9.00, notes: 'Standard tier; Batch and Flex tiers are lower.' },
		contextWindow: '1M',
		bestFor: ['Fast multimodal agents', 'Search grounding', 'High-volume workflows'],
		scores: { coding: 9.4, reasoning: 9.4, toolUse: 9.4 },
		strengths: ['Current stable Gemini flagship for speed', 'Strong search and grounding', '1M-token context'],
		sources: [
		{ label: 'Gemini Models', url: 'https://ai.google.dev/gemini-api/docs/models' },
		{ label: 'Gemini Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
		],
		},
		{
		name: 'Gemini 3.6 Flash', provider: 'Google', color: '#34a853', releaseDate: '2026-07-21',
		pricing: { input: 1.50, output: 7.50, notes: 'Standard paid tier; Batch and Flex tiers are lower.' }, contextWindow: '1M',
		bestFor: ['Agentic coding', 'Multimodal tasks', 'Search grounding'], scores: { coding: 9.5, reasoning: 9.4, toolUse: 9.5 },
		strengths: ['Stable Gemini model for agentic and multimodal tasks', '1M-token input and 65,536-token output limits', 'Search grounding and tool capabilities'],
		sources: [{ label: 'Gemini 3.6 Flash model card', url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash' }, { label: 'Gemini Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' }],
		},
		{
		name: 'Gemini 3.5 Flash-Lite', provider: 'Google', color: '#4285f4', releaseDate: '2026-07-21',
		pricing: { input: 0.30, output: 2.50, notes: 'Standard paid tier; Batch and Flex tiers are lower.' }, contextWindow: '1M',
		bestFor: ['High-volume automation', 'Subagents', 'Document parsing'], scores: { coding: 8.8, reasoning: 8.7, toolUse: 8.9 },
		strengths: ['Stable low-latency Gemini model', '1M-token input and 65,536-token output limits', 'Optimized for high-throughput agentic workflows'],
		sources: [{ label: 'Gemini 3.5 Flash-Lite model card', url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite' }, { label: 'Gemini Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' }],
		},
		{
		name: 'Claude Sonnet 5',
		provider: 'Anthropic',
		color: '#ea580c',
		releaseDate: '2026-06-09',
		pricing: { input: 3.00, output: 15.00, notes: 'Anthropic lists introductory pricing of $2 input / $10 output per MTok through August 31, 2026.' },
		contextWindow: '1M',
		bestFor: ['Balanced performance', 'Production workloads', 'Cost-efficient'],
		scores: { coding: 9.6, reasoning: 9.5, toolUse: 9.3 },
		strengths: ['Best combination of speed and intelligence', 'Fast comparative latency', '128K max output'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'Claude Haiku 4.5',
		provider: 'Anthropic',
		color: '#fb923c',
		releaseDate: '2025-10-01',
		pricing: { input: 1.00, output: 5.00 },
		contextWindow: '200K',
		bestFor: ['Fast responses', 'High-volume tasks', 'Near-frontier intelligence'],
		scores: { coding: 8.9, reasoning: 8.8, toolUse: 8.7 },
		strengths: ['Fastest current Claude model', 'Extended thinking', '64K max output'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'GPT-5.2-Codex',
		provider: 'OpenAI',
		color: '#059669',
		releaseDate: '2026-03-01',
		pricing: { input: 1.75, output: 14.00 },
		contextWindow: '400K',
		bestFor: ['Coding-focused tasks', 'Type inference', 'Agentic coding'],
		scores: { coding: 9.7, reasoning: 9.3, toolUse: 9.4 },
		strengths: ['Optimized for long-horizon coding', 'Strong agentic capabilities', 'Production-ready'],
		sources: [
			{ label: 'OpenAI Model Card', url: 'https://developers.openai.com/api/docs/models/gpt-5.2-codex' },
			{ label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
		],
	},
	{
		name: 'Grok 4.5',
		provider: 'xAI',
		color: '#111827',
		releaseDate: '2026-07-08',
		pricing: { input: 2.00, output: 6.00, notes: 'Standard context pricing. Prompts at or above 200K tokens use xAI’s higher long-context rates.' },
		contextWindow: '500K',
		bestFor: ['Agentic coding', 'Knowledge work', 'Tool-enabled workflows'],
		scores: { coding: 9.7, reasoning: 9.7, toolUse: 9.6 },
		strengths: ['xAI frontier model for code and agentic tool calling', 'Configurable reasoning effort', 'Supports function calling, web search, X search, and code execution'],
		sources: [
			{ label: 'xAI Grok 4.5 model overview', url: 'https://docs.x.ai/developers/grok-4-5' },
			{ label: 'xAI release notes', url: 'https://docs.x.ai/developers/release-notes' },
			{ label: 'xAI pricing', url: 'https://docs.x.ai/developers/pricing' },
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
		name: 'DeepSeek V4 Pro',
		provider: 'DeepSeek',
		color: '#06b6d4',
		releaseDate: '2026-04-26',
		pricing: { input: 0.435, output: 0.87, notes: 'Promotional pricing listed by DeepSeek; nominal price may be higher after discounts end.' },
		contextWindow: '1M',
		bestFor: ['Budget coding', 'High-volume', 'Cost-sensitive'],
		scores: { coding: 9.1, reasoning: 9.2, toolUse: 8.9 },
		strengths: ['Excellent value', 'Hybrid thinking/non-thinking modes', 'Large context window'],
		sources: [
			{ label: 'DeepSeek API Docs', url: 'https://api-docs.deepseek.com/' },
			{ label: 'DeepSeek Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
		],
	},
	{
		name: 'DeepSeek V4 Flash',
		provider: 'DeepSeek',
		color: '#0891b2',
		releaseDate: '2026-07-31',
		pricing: { input: 0.14, output: 0.28, notes: 'Public beta. Cache-hit input is $0.0028 per million tokens; DeepSeek says peak-hour pricing will be 2× when introduced.' },
		contextWindow: '1M',
		bestFor: ['Low-cost agent experiments', 'Responses API', 'Codex-compatible workflows'],
		scores: { coding: 8.9, reasoning: 8.9, toolUse: 8.9 },
		strengths: ['Public beta — not a general-availability recommendation', 'DeepSeek-V4-Flash-0731 re-post-training update', '384K maximum output and Responses API support'],
		sources: [
			{ label: 'DeepSeek V4 Flash July 31 update', url: 'https://api-docs.deepseek.com/updates/' },
			{ label: 'DeepSeek Models & Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
		],
	},
	{
		name: 'GPT-5.2',
		provider: 'OpenAI',
		color: '#10b981',
		releaseDate: '2025-12-15',
		pricing: { input: 1.75, output: 14.00 },
		contextWindow: '400K',
		bestFor: ['General-purpose', 'Balanced tasks'],
		scores: { coding: 9.3, reasoning: 9.2, toolUse: 9.0 },
		strengths: ['Reliable', 'Good performance', 'Widely available'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
		],
	},
	{
		name: 'Mistral Medium 3.5',
		provider: 'Mistral',
		color: '#ff7000',
		releaseDate: '2026-03-01',
		pricing: { input: 1.50, output: 7.50 },
		contextWindow: '256K',
		bestFor: ['European compliance', 'Agentic coding', 'Enterprise'],
		scores: { coding: 9.1, reasoning: 9.1, toolUse: 8.9 },
		strengths: ['Frontier-class multimodal model', 'Strong coding and agents', 'European provider option'],
		sources: [
			{ label: 'Mistral Medium 3.5 model card', url: 'https://docs.mistral.ai/models/model-cards/mistral-medium-3-5-26-04' },
		],
	},
	{
		name: 'Kimi K3',
		provider: 'Moonshot AI',
		color: '#00d4aa',
		releaseDate: '2026-07-16',
		pricing: { input: 3.00, output: 15.00, notes: 'Kimi lists $0.30/MTok cached input, $3/MTok input, and $15/MTok output.' },
		contextWindow: '1M',
		bestFor: ['Long-horizon coding', 'Knowledge work', 'Agent workflows'],
		scores: { coding: 9.4, reasoning: 9.3, toolUse: 9.2 },
		strengths: ['Flagship model with configurable reasoning effort', 'Native visual understanding', '1M-token context'],
		sources: [
			{ label: 'Kimi K3 announcement', url: 'https://www.kimi.com/blog/kimi-k3' },
			{ label: 'Kimi K3 pricing', url: 'https://platform.kimi.ai/docs/pricing/chat-k3' },
		],
	},

	{
		name: 'GPT-OSS-120B',
		provider: 'OpenAI',
		color: '#059669',
		releaseDate: '2026-02-20',
		pricing: { input: 0, output: 0, notes: 'Free — open weights, self-hosted' },
		contextWindow: '128K',
		bestFor: ['Self-hosted', 'Privacy', 'Customization'],
		scores: { coding: 9.3, reasoning: 9.2, toolUse: 9.0 },
		strengths: ['Open weights from OpenAI', 'Runs on single 80GB GPU', 'vLLM/Ollama compatible'],
		sources: [
			{ label: 'OpenAI GPT-OSS model documentation', url: 'https://developers.openai.com/api/docs/models/gpt-oss-120b' },
			{ label: 'HuggingFace', url: 'https://huggingface.co/openai' },
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
