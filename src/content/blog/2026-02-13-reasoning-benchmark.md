---
title: 'Reasoning Benchmark Deep Dive — Build vs Buy Auth (Feb 13)'
description: 'How Claude, Codex-Spark, and Kimi approached a build-vs-buy decision for authentication in a resource-constrained startup. Prompts, rubric, and decision quality.'
pubDate: '2026-02-13'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

This deep dive expands on the reasoning task from today's [daily scorecard](/blog/2026-02-13-model-eval-scorecard/). We examine how Claude Opus 4.6, 5.3-Codex-Spark, and Kimi K2.5 approached a strategic build-vs-buy decision.

## Task Context

**Scenario:** A B2B SaaS startup needs authentication. The team has 3 engineers, 6-month runway, and tight budget. They're evaluating Auth0 (managed) vs rolling their own with Passport.js + JWT.

**Constraints:**
- Must provide a clear recommendation (not "it depends")
- Must consider budget, team size, and future needs
- Must state assumptions explicitly

## The Prompt

> Your startup needs authentication for a B2B SaaS product. Option A: Use Auth0 (managed). Option B: Roll your own with Passport.js + JWT. Budget is tight, team of 3, 6-month runway. Provide a decision with clear tradeoffs.

## Scoring Rubric (10 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Correctness | 4 | Decision is defensible, considers key factors |
| Speed-to-usable | 3 | Recommendation is actionable, not hedged |
| Clarity | 3 | Tradeoffs are explicit, assumptions stated |

## Results Table

| Model | Score | Correctness | Speed | Clarity |
|-------|-------|-------------|-------|---------|
| Claude Opus 4.6 | 9.5 | 4.0 | 3.0 | 2.5 |
| 5.3-Codex-Spark | 9.0 | 3.8 | 2.8 | 2.4 |
| Kimi K2.5 | 8.9 | 3.7 | 2.8 | 2.4 |

## What Great Looked Like

**Claude Opus 4.6** made a clear, decisive recommendation in the first sentence:

> **Use Auth0.** For a 3-person team with 6-month runway, the 2-3 engineering weeks you'd spend building auth is time not spent on core product. Auth0 costs ~$240/mo at scale — cheaper than one engineer-week.

Claude's analysis covered:

1. **Cost comparison:**
   - Auth0: Free tier for first 7,000 MAU, then $240/mo for 10,000 MAU
   - DIY: 2-3 eng weeks (~$15-25K in opportunity cost), plus ongoing maintenance

2. **Hidden costs of DIY:**
   - Password reset flows (surprisingly complex)
   - Email verification
   - Rate limiting and brute-force protection
   - Session management
   - Security audits

3. **Future needs:**
   - Enterprise SSO (SAML, OIDC) — Auth0 includes this; DIY requires significant work
   - SCIM provisioning — Auth0 supports; DIY is months of work
   - Compliance (SOC 2, GDPR) — Auth0 is pre-certified

4. **When to reconsider:**
   - If you have specific compliance requirements Auth0 doesn't meet
   - If you're building auth as a core product feature
   - If you have an experienced security engineer on staff

## Common Failure Modes

**Hedging without commitment:** 5.3-Codex-Spark started with "It depends on your priorities" and took three paragraphs to reach a recommendation. This loses decision velocity.

**Underweighting maintenance:** Kimi K2.5 recommended DIY, correctly noting that Passport.js is well-documented, but underestimated the ongoing maintenance burden. Auth isn't "set and forget" — you're on the hook for:
- Security patches
- Token rotation strategies
- Breach response
- Compliance updates

**Missing enterprise features:** Kimi didn't mention SSO or SCIM as future blockers. For B2B SaaS, these are table stakes for enterprise deals and expensive to retrofit.

## Decision Quality Comparison

| Factor | Claude | Codex-Spark | Kimi |
|--------|--------|-------------|------|
| Clear recommendation | ✓ First sentence | ✗ Hedged | ✓ First sentence |
| Cost analysis | ✓ Concrete numbers | ✓ Rough estimates | ✓ Rough estimates |
| Hidden costs | ✓ Listed 4+ | ✓ Listed 2 | ✗ Missed several |
| Enterprise SSO | ✓ Called out early | ✓ Mentioned later | ✗ Not mentioned |
| When to reconsider | ✓ 3 scenarios | ✓ 2 scenarios | ✓ 1 scenario |

## Key Insight

The difference between Claude and Codex-Spark was decisiveness. Claude led with the answer, then supported it. Codex-Spark led with analysis, then concluded. For engineering leaders who need recommendations, not just analysis, the former is more valuable.

Kimi's recommendation to DIY wasn't wrong per se — it's defensible if you have a security-focused engineer and expect to scale auth complexity. But for the constraints given (3-person team, 6-month runway), Auth0 is the higher-confidence choice.

## Reproduction Steps

To reproduce this eval:

1. Present the prompt to each model
2. Score on:
   - Whether a clear recommendation appears in the first paragraph
   - Whether concrete cost numbers are provided
   - Whether hidden costs (password reset, security) are mentioned
   - Whether future enterprise needs (SSO, SCIM) are considered
3. Deduct points for hedging ("it depends") without commitment

## Takeaways

- Decisiveness matters: Lead with the recommendation, then support it
- Concrete numbers beat vague estimates
- Hidden costs (maintenance, security) are often underweighted
- Future enterprise needs should be considered early, even if not immediate

---

Back to [today's scorecard](/blog/2026-02-13-model-eval-scorecard/).
