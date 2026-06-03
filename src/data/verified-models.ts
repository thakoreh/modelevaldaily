export const MODEL_DATA_VERIFIED_ON = '2026-06-03';

// Last verification pass: 2026-06-03
// Official docs checked for OpenAI, Anthropic, Google, xAI, DeepSeek, Meta, Mistral, and Alibaba model names/pricing.

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
		name: 'GPT-5.5',
		provider: 'OpenAI',
		color: '#10b981',
		releaseDate: '2026-05-01',
		pricing: { input: 5.00, output: 30.00 },
		contextWindow: '1M',
		bestFor: ['Complex reasoning', 'Coding', 'Professional workflows'],
		scores: { coding: 9.8, reasoning: 9.8, toolUse: 9.7 },
		strengths: ['OpenAI flagship', 'Strong coding and reasoning', 'Built-in tool support'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
		],
	},
	{
		name: 'Claude Opus 4.8',
		provider: 'Anthropic',
		color: '#f59e0b',
		releaseDate: '2026-05-28',
		pricing: { input: 5.00, output: 25.00 },
		contextWindow: '1M',
		bestFor: ['Complex reasoning', 'Agentic coding', 'Critical decisions'],
		scores: { coding: 9.8, reasoning: 9.8, toolUse: 9.6 },
		strengths: ['Anthropic flagship', 'Strong agentic coding', 'Large context window'],
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
		name: 'Gemini 3.1 Pro Preview',
		provider: 'Google',
		color: '#4285f4',
		releaseDate: '2026-02-19',
		pricing: { input: 2.00, output: 12.00, notes: 'Standard tier, prompts <= 200k tokens; higher rates apply above 200k.' },
		contextWindow: '1M',
		bestFor: ['Multimodal tasks', 'Long context', 'Search integration'],
		scores: { coding: 9.5, reasoning: 9.5, toolUse: 9.3 },
		strengths: ['Preview Pro model', 'Strong multimodal', 'Competitive long-context pricing'],
		sources: [
			{ label: 'Gemini Models', url: 'https://ai.google.dev/gemini-api/docs/models' },
			{ label: 'Gemini Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
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
		name: 'Claude Sonnet 4.6',
		provider: 'Anthropic',
		color: '#ea580c',
		releaseDate: '2026-02-17',
		pricing: { input: 3.00, output: 15.00 },
		contextWindow: '1M',
		bestFor: ['Balanced performance', 'Production workloads', 'Cost-efficient'],
		scores: { coding: 9.4, reasoning: 9.3, toolUse: 9.1 },
		strengths: ['Great value', 'Fast response times', 'Consistent quality'],
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
		name: 'Llama 4 Maverick',
		provider: 'Meta',
		color: '#8b5cf6',
		releaseDate: '2025-04-05',
		pricing: { input: 2.00, output: 8.00, notes: 'Varies by host (Together, Fireworks, etc.)' },
		contextWindow: '1M',
		bestFor: ['Open weights', 'Multimodal', 'Customizable'],
		scores: { coding: 9.0, reasoning: 9.1, toolUse: 8.7 },
		strengths: ['Open-weight multimodal model', '17B active parameters with MoE routing', 'Good for customization'],
		sources: [
			{ label: 'Meta Llama 4', url: 'https://ai.meta.com/blog/llama-4-multimodal-intelligence/' },
			{ label: 'HuggingFace', url: 'https://huggingface.co/meta-llama' },
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
			{ label: 'DeepSeek Models', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
			{ label: 'DeepSeek Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
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
		pricing: { input: 2.00, output: 6.00 },
		contextWindow: '128K',
		bestFor: ['European compliance', 'Agentic coding', 'Enterprise'],
		scores: { coding: 9.1, reasoning: 9.1, toolUse: 8.9 },
		strengths: ['Frontier-class multimodal model', 'Strong coding and agents', 'European provider option'],
		sources: [
			{ label: 'Mistral Models', url: 'https://docs.mistral.ai/getting-started/models/' },
			{ label: 'Mistral Deployment', url: 'https://docs.mistral.ai/models/deployment' },
		],
	},
	{
		name: 'Kimi K2.5',
		provider: 'Moonshot AI',
		color: '#00d4aa',
		releaseDate: '2026-02-11',
		pricing: { input: 0.60, output: 2.50 },
		contextWindow: '256K',
		bestFor: ['Visual coding', 'Long context', 'Agent workflows'],
		scores: { coding: 9.4, reasoning: 9.3, toolUse: 9.2 },
		strengths: ['MoE architecture (1T params, 32B active)', 'Competitive pricing', 'Multimodal capabilities'],
		sources: [
			{ label: 'OpenRouter', url: 'https://openrouter.ai/moonshotai/kimi-k2.5' },
			{ label: 'Moonshot Platform', url: 'https://platform.moonshot.ai/' },
		],
	},
	{
		name: 'MiniMax M2.5',
		provider: 'MiniMax',
		color: '#6366f1',
		releaseDate: '2026-02-11',
		pricing: { input: 0.30, output: 1.20 },
		contextWindow: '196K',
		bestFor: ['Real-world productivity', 'Cost-sensitive', 'High-volume'],
		scores: { coding: 9.1, reasoning: 9.2, toolUse: 8.9 },
		strengths: ['Best value frontier model', 'Excellent price/performance', '228B params'],
		sources: [
			{ label: 'OpenRouter', url: 'https://openrouter.ai/minimax/minimax-m2.5' },
			{ label: 'Together AI', url: 'https://www.together.ai/models/minimax-m2-5' },
		],
	},
	{
		name: 'Grok 4.3',
		provider: 'xAI',
		color: '#1a1a1a',
		releaseDate: '2026-05-29',
		pricing: { input: 1.25, output: 2.50 },
		contextWindow: '1M',
		bestFor: ['Long context', 'Web search', 'X platform data'],
		scores: { coding: 9.2, reasoning: 9.3, toolUse: 9.0 },
		strengths: ['Current xAI flagship', 'Strong agentic tool calling', 'Built-in web and X search options'],
		sources: [
			{ label: 'xAI Models', url: 'https://docs.x.ai/developers/models' },
			{ label: 'xAI Pricing', url: 'https://docs.x.ai/developers/models' },
		],
	},
	{
		name: 'Qwen3 Max 2026-01-23',
		provider: 'Alibaba',
		color: '#ff6a00',
		releaseDate: '2026-01-23',
		pricing: { input: 1.20, output: 6.00 },
		contextWindow: '262K',
		bestFor: ['Multilingual', 'Enterprise', 'Chinese language'],
		scores: { coding: 9.2, reasoning: 9.2, toolUse: 8.9 },
		strengths: ['Strong bilingual (CN/EN)', 'Enterprise-ready', '50% batch discount'],
		sources: [
			{ label: 'Alibaba Cloud Models', url: 'https://www.alibabacloud.com/help/en/model-studio/user-guide/model/' },
			{ label: 'Alibaba Coding Plan', url: 'https://www.alibabacloud.com/help/en/model-studio/coding-plan' },
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
			{ label: 'OpenAI Blog', url: 'https://openai.com/index/introducing-gpt-oss/' },
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
