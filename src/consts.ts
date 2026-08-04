import { MODEL_DATA_VERIFIED_ON } from './data/verified-models';

export const SITE_TITLE = 'AI Model Benchmarks';
export const SITE_DESCRIPTION = 'Source-aware AI model rankings, comparisons, and decision guides for capability, cost, context, and production deployment.';
export const SITE_URL = 'https://aimodelbenchmarks.com';
export const SITE_LOCALE = 'en_US';
// Keep sitewide freshness signals aligned with the canonical model-data review.
export const SITE_UPDATED = MODEL_DATA_VERIFIED_ON;

// Public pages that still contain model references awaiting a source-backed refresh.
// Keep them accessible, but do not represent them as current search guidance.
export const STALE_REVIEW_PATHS = new Set([
	'/benchmarks/chatbot-arena/',
	'/benchmarks/mmlu/',
	'/benchmarks/swe-bench/',
	'/best-ai-model-for-agents/',
	'/best-ai-model-for-coding/',
	'/best-long-context-models/',
	'/best-open-weight-models/',
	'/cheapest-ai-models/',
	'/coding-agents/',
	'/compare/claude-vs-gemini/',
	'/compare/gpt-vs-gemini/',
	'/faq/',
	'/openclaw/',
	'/use-cases/coding/',
	'/use-cases/cost-optimization/',
	'/use-cases/reasoning/',
]);
