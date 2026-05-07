interface FactIssueDefinition {
	pattern: RegExp;
	reason: string;
}

export interface FactIssue {
	match: string;
	reason: string;
}

// Phrases currently treated as unverified until we can map them to provider docs.
const UNVERIFIED_PATTERNS: FactIssueDefinition[] = [
	{
		pattern: /\b5\.3-Codex-Spark\b/gi,
		reason: 'Not listed in official OpenAI model references.',
	},
	{
		pattern: /\bGPT-5\.3 Codex\b/gi,
		reason: 'Current official OpenAI references list GPT-5.2-Codex, not GPT-5.3 Codex.',
	},
	{
		pattern: /\bClaude 4o\b/gi,
		reason: 'No official Anthropic model named "Claude 4o".',
	},
	{
		pattern: /\bGemini 3 Pro Preview\b/gi,
		reason: 'Google says Gemini 3 Pro Preview is deprecated and shut down; use Gemini 3.1 Pro Preview.',
	},
	{
		pattern: /\bKimi K2\.5\b/gi,
		reason: 'Public provider docs could not be validated in this build.',
	},
	{
		pattern: /\bKimi K3\b/gi,
		reason: 'Public provider docs could not be validated in this build.',
	},
];

export function getFactIssues(content: string): FactIssue[] {
	const issues: FactIssue[] = [];

	for (const rule of UNVERIFIED_PATTERNS) {
		const matches = content.match(rule.pattern);
		if (!matches) continue;
		for (const match of matches) {
			issues.push({ match, reason: rule.reason });
		}
	}

	return issues;
}

export function isFactCheckedContent(content: string): boolean {
	return getFactIssues(content).length === 0;
}

export function isFactCheckedPost(post: { body?: string }): boolean {
	return isFactCheckedContent(post.body ?? '');
}
