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
		pattern: /\bClaude Opus 4\.[67]\b/gi,
		reason: 'Not listed in official Anthropic model references.',
	},
	{
		pattern: /\bClaude 4o\b/gi,
		reason: 'No official Anthropic model named "Claude 4o".',
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
