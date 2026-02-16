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
		name: 'GPT-5.2',
		provider: 'OpenAI',
		color: '#10b981',
		pricing: { input: 1.75, output: 14.0 },
		contextWindow: '400K',
		bestFor: ['Coding', 'Agents', 'Complex tasks'],
		scores: { coding: 9.5, reasoning: 9.4, toolUse: 9.5 },
		strengths: ['Best coding performance', 'Strong agentic capabilities', 'Excellent tool integration'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://openai.com/api/pricing/' },
		],
	},
	{
		name: 'Claude Opus 4.1',
		provider: 'Anthropic',
		color: '#d97706',
		pricing: { input: 15, output: 75 },
		contextWindow: '200K',
		bestFor: ['Complex reasoning', 'Long-form analysis', 'High-stakes drafting'],
		scores: { coding: 9.3, reasoning: 9.5, toolUse: 9.2 },
		strengths: ['Excellent reasoning depth', 'Strong instruction fidelity', 'Consistent long-context behavior'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'Claude Opus 4.6 (Adaptive)',
		provider: 'Anthropic',
		color: '#f59e0b',
		pricing: { input: 18.75, output: 93.75, notes: 'With prompt caching discounts available.' },
		contextWindow: '200K',
		bestFor: ['Highest intelligence tasks', 'Complex reasoning', 'Research'],
		scores: { coding: 9.4, reasoning: 9.6, toolUse: 9.3 },
		strengths: ['Top-tier intelligence', 'Adaptive thinking', 'Best for critical decisions'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
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
		scores: { coding: 9.2, reasoning: 9.2, toolUse: 9.0 },
		strengths: ['Very large context', 'Strong multimodal support', 'Competitive long-context pricing'],
		sources: [
			{ label: 'Gemini Model List', url: 'https://ai.google.dev/gemini-api/docs/models' },
			{ label: 'Gemini API Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
		],
	},
	{
		name: 'Gemini 3 Pro',
		provider: 'Google',
		color: '#34a853',
		pricing: { input: 2.0, output: 12, notes: 'Paid tier pricing.' },
		contextWindow: '1M',
		bestFor: ['Multimodal understanding', 'Agentic tasks', 'Vibe coding'],
		scores: { coding: 9.3, reasoning: 9.3, toolUse: 9.1 },
		strengths: ['Best multimodal model', 'Superior search integration', 'Powerful agentic capabilities'],
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
		contextWindow: '128K',
		bestFor: ['Budget-conscious reasoning', 'Math-heavy tasks', 'Cost-sensitive coding'],
		scores: { coding: 8.9, reasoning: 9.1, toolUse: 8.6 },
		strengths: ['Strong price/performance', 'Reasoning-focused behavior', 'Low token cost'],
		sources: [
			{ label: 'DeepSeek Reasoning Model', url: 'https://api-docs.deepseek.com/guides/reasoning_model' },
			{ label: 'DeepSeek API Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
		],
	},
	{
		name: 'DeepSeek-V3',
		provider: 'DeepSeek',
		color: '#a78bfa',
		pricing: { input: 0.27, output: 1.1 },
		contextWindow: '128K',
		bestFor: ['Cost-effective coding', 'General tasks', 'High-volume usage'],
		scores: { coding: 8.8, reasoning: 8.9, toolUse: 8.5 },
		strengths: ['Excellent value', 'Good coding performance', 'Low latency'],
		sources: [
			{ label: 'DeepSeek Models', url: 'https://api-docs.deepseek.com/' },
			{ label: 'DeepSeek API Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
		],
	},
	{
		name: 'GLM-5',
		provider: 'Zhipu AI',
		color: '#f43f5e',
		pricing: { input: 0.75, output: 3.0 },
		contextWindow: '128K',
		bestFor: ['Chinese + English workflows', 'Value-focused deployment', 'Enterprise usage'],
		scores: { coding: 8.7, reasoning: 8.9, toolUse: 8.5 },
		strengths: ['Low API cost', 'Strong bilingual support', 'Competitive reasoning performance'],
		sources: [
			{ label: 'GLM-5 Introduction', url: 'https://docs.bigmodel.cn/cn/guide/models/text/glm-5' },
			{ label: 'Zhipu Pricing', url: 'https://open.bigmodel.cn/pricing' },
		],
	},
	{
		name: 'Claude Sonnet 4',
		provider: 'Anthropic',
		color: '#ea580c',
		pricing: { input: 3, output: 15 },
		contextWindow: '200K',
		bestFor: ['Balanced performance', 'Production workloads', 'General-purpose tasks'],
		scores: { coding: 9.0, reasoning: 9.0, toolUse: 8.9 },
		strengths: ['Great value proposition', 'Consistent quality', 'Fast response times'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'Claude Sonnet 3.7',
		provider: 'Anthropic',
		color: '#fb923c',
		pricing: { input: 3, output: 15 },
		contextWindow: '200K',
		bestFor: ['Extended thinking', 'Complex analysis', 'Coding assistance'],
		scores: { coding: 8.9, reasoning: 8.9, toolUse: 8.8 },
		strengths: ['Strong extended thinking', 'Good coding support', 'Reliable performance'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'GPT-5 mini',
		provider: 'OpenAI',
		color: '#34d399',
		pricing: { input: 0.25, output: 2.0 },
		contextWindow: '128K',
		bestFor: ['Fast tasks', 'High-volume usage', 'Cost optimization'],
		scores: { coding: 8.5, reasoning: 8.4, toolUse: 8.3 },
		strengths: ['Very low cost', 'Fast response times', 'Good for simple tasks'],
		sources: [
			{ label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
			{ label: 'OpenAI Pricing', url: 'https://openai.com/api/pricing/' },
		],
	},
	{
		name: 'Gemini 2.5 Flash',
		provider: 'Google',
		color: '#4ade80',
		pricing: { input: 0.30, output: 2.50 },
		contextWindow: '1M',
		bestFor: ['Fast processing', 'Low-latency tasks', 'High throughput'],
		scores: { coding: 8.7, reasoning: 8.7, toolUse: 8.5 },
		strengths: ['Excellent speed', 'Large context window', 'Hybrid reasoning support'],
		sources: [
			{ label: 'Gemini Model List', url: 'https://ai.google.dev/gemini-api/docs/models' },
			{ label: 'Gemini API Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
		],
	},
	{
		name: 'Gemini 2.5 Flash-Lite',
		provider: 'Google',
		color: '#86efac',
		pricing: { input: 0.10, output: 0.40 },
		contextWindow: '1M',
		bestFor: ['Cost-sensitive tasks', 'High-volume processing', 'Simple queries'],
		scores: { coding: 8.2, reasoning: 8.1, toolUse: 7.9 },
		strengths: ['Lowest cost option', 'Fastest output speed', 'Good for simple tasks'],
		sources: [
			{ label: 'Gemini Model List', url: 'https://ai.google.dev/gemini-api/docs/models' },
			{ label: 'Gemini API Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
		],
	},
	{
		name: 'Claude Haiku 3.5',
		provider: 'Anthropic',
		color: '#fbbf24',
		pricing: { input: 0.80, output: 4.0 },
		contextWindow: '200K',
		bestFor: ['Fast responses', 'Simple tasks', 'Cost-conscious usage'],
		scores: { coding: 8.3, reasoning: 8.2, toolUse: 8.1 },
		strengths: ['Fast and affordable', 'Good for simple tasks', 'Reliable quality'],
		sources: [
			{ label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
			{ label: 'Anthropic Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
		],
	},
	{
		name: 'Llama 4 Scout',
		provider: 'Meta',
		color: '#0668e1',
		pricing: { input: 0.10, output: 0.30, notes: 'Via API providers, pricing varies.' },
		contextWindow: '10M',
		bestFor: ['Extremely long context', 'Document processing', 'Research'],
		scores: { coding: 8.5, reasoning: 8.6, toolUse: 8.3 },
		strengths: ['Largest context window', 'Open source', 'Good for long documents'],
		sources: [
			{ label: 'Meta Llama', url: 'https://llama.meta.com/' },
			{ label: 'Hugging Face Llama', url: 'https://huggingface.co/meta-llama' },
		],
	},
	{
		name: 'Llama 4 Maverick',
		provider: 'Meta',
		color: '#0080ff',
		pricing: { input: 0.15, output: 0.50, notes: 'Via API providers, pricing varies.' },
		contextWindow: '1M',
		bestFor: ['Balanced open-source', 'General tasks', 'Self-hosting'],
		scores: { coding: 8.6, reasoning: 8.5, toolUse: 8.2 },
		strengths: ['Good performance', 'Open weights', 'Flexible deployment'],
		sources: [
			{ label: 'Meta Llama', url: 'https://llama.meta.com/' },
			{ label: 'Hugging Face Llama', url: 'https://huggingface.co/meta-llama' },
		],
	},
	{
		name: 'Grok 4.1',
		provider: 'xAI',
		color: '#1da1f2',
		pricing: { input: 2.0, output: 10.0, notes: 'Via xAI API.' },
		contextWindow: '128K',
		bestFor: ['Real-time information', 'Witty responses', 'Current events'],
		scores: { coding: 8.8, reasoning: 8.8, toolUse: 8.6 },
		strengths: ['Real-time web access', 'Unique personality', 'Good reasoning'],
		sources: [
			{ label: 'xAI API', url: 'https://x.ai/api' },
			{ label: 'Grok Documentation', url: 'https://docs.x.ai/' },
		],
	},
	{
		name: 'Grok 4.1 Fast',
		provider: 'xAI',
		color: '#60a5fa',
		pricing: { input: 1.0, output: 5.0, notes: 'Via xAI API.' },
		contextWindow: '2M',
		bestFor: ['Fast responses', 'Large context', 'Real-time data'],
		scores: { coding: 8.5, reasoning: 8.5, toolUse: 8.3 },
		strengths: ['Very fast', 'Large context window', 'Real-time capabilities'],
		sources: [
			{ label: 'xAI API', url: 'https://x.ai/api' },
			{ label: 'Grok Documentation', url: 'https://docs.x.ai/' },
		],
	},
	{
		name: 'Mistral Large 2',
		provider: 'Mistral AI',
		color: '#ff7000',
		pricing: { input: 2.0, output: 6.0 },
		contextWindow: '128K',
		bestFor: ['European compliance', 'Multilingual tasks', 'Enterprise'],
		scores: { coding: 8.7, reasoning: 8.7, toolUse: 8.4 },
		strengths: ['Strong multilingual', 'GDPR compliant', 'Good coding'],
		sources: [
			{ label: 'Mistral Models', url: 'https://docs.mistral.ai/getting-started/models/' },
			{ label: 'Mistral Pricing', url: 'https://mistral.ai/pricing/' },
		],
	},
	{
		name: 'Mistral Small 3',
		provider: 'Mistral AI',
		color: '#ff9500',
		pricing: { input: 0.20, output: 0.60 },
		contextWindow: '128K',
		bestFor: ['Fast processing', 'Cost-effective', 'Simple tasks'],
		scores: { coding: 8.2, reasoning: 8.1, toolUse: 7.9 },
		strengths: ['Very affordable', 'Fast inference', 'Good for simple tasks'],
		sources: [
			{ label: 'Mistral Models', url: 'https://docs.mistral.ai/getting-started/models/' },
			{ label: 'Mistral Pricing', url: 'https://mistral.ai/pricing/' },
		],
	},
	{
		name: 'Qwen 2.5 Max',
		provider: 'Alibaba',
		color: '#ff6a00',
		pricing: { input: 0.50, output: 2.0, notes: 'Via Alibaba Cloud.' },
		contextWindow: '128K',
		bestFor: ['Chinese language', 'Math reasoning', 'Coding'],
		scores: { coding: 8.8, reasoning: 8.8, toolUse: 8.5 },
		strengths: ['Strong math skills', 'Good Chinese support', 'Competitive pricing'],
		sources: [
			{ label: 'Qwen Models', url: 'https://qwenlm.github.io/' },
			{ label: 'Alibaba Cloud', url: 'https://www.alibabacloud.com/product/bailian' },
		],
	},
	{
		name: 'Qwen 2.5 72B',
		provider: 'Alibaba',
		color: '#ff8c00',
		pricing: { input: 0.35, output: 1.4, notes: 'Via API providers.' },
		contextWindow: '128K',
		bestFor: ['Open-source alternative', 'Self-hosting', 'Custom fine-tuning'],
		scores: { coding: 8.6, reasoning: 8.5, toolUse: 8.2 },
		strengths: ['Open weights', 'Good performance', 'Flexible deployment'],
		sources: [
			{ label: 'Qwen Models', url: 'https://qwenlm.github.io/' },
			{ label: 'Hugging Face Qwen', url: 'https://huggingface.co/Qwen' },
		],
	},
	{
		name: 'Nova Pro',
		provider: 'Amazon',
		color: '#ff9900',
		pricing: { input: 0.80, output: 3.20, notes: 'Via AWS Bedrock.' },
		contextWindow: '300K',
		bestFor: ['AWS integration', 'Enterprise workloads', 'Multimodal'],
		scores: { coding: 8.5, reasoning: 8.5, toolUse: 8.3 },
		strengths: ['AWS ecosystem', 'Good multimodal', 'Enterprise features'],
		sources: [
			{ label: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/' },
			{ label: 'Nova Models', url: 'https://aws.amazon.com/bedrock/nova/' },
		],
	},
	{
		name: 'Nova Micro',
		provider: 'Amazon',
		color: '#ffb84d',
		pricing: { input: 0.035, output: 0.14, notes: 'Via AWS Bedrock.' },
		contextWindow: '128K',
		bestFor: ['Lowest cost', 'Simple tasks', 'High volume'],
		scores: { coding: 7.8, reasoning: 7.7, toolUse: 7.5 },
		strengths: ['Very low cost', 'Fast inference', 'AWS integration'],
		sources: [
			{ label: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/' },
			{ label: 'Nova Models', url: 'https://aws.amazon.com/bedrock/nova/' },
		],
	},
	{
		name: 'Cohere Command R+',
		provider: 'Cohere',
		color: '#39594d',
		pricing: { input: 2.50, output: 10.0 },
		contextWindow: '128K',
		bestFor: ['RAG applications', 'Enterprise search', 'Tool use'],
		scores: { coding: 8.3, reasoning: 8.4, toolUse: 8.6 },
		strengths: ['Excellent RAG', 'Strong tool use', 'Enterprise focused'],
		sources: [
			{ label: 'Cohere Models', url: 'https://docs.cohere.com/docs/models' },
			{ label: 'Cohere Pricing', url: 'https://cohere.com/pricing' },
		],
	},
	{
		name: 'Reka Core',
		provider: 'Reka',
		color: '#6b21a8',
		pricing: { input: 1.0, output: 4.0, notes: 'Via API providers.' },
		contextWindow: '128K',
		bestFor: ['Multimodal tasks', 'Video understanding', 'Long context'],
		scores: { coding: 8.4, reasoning: 8.5, toolUse: 8.2 },
		strengths: ['Strong multimodal', 'Good video understanding', 'Competitive pricing'],
		sources: [
			{ label: 'Reka AI', url: 'https://www.reka.ai/' },
			{ label: 'Reka Documentation', url: 'https://docs.reka.ai/' },
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
