---
title: 'Daily Model Eval Scorecard — Feb 13, 2026'
description: 'Claude Opus 4.6, 5.3-Codex-Spark, and Kimi K2.5 face off on coding, reasoning, and tool-use tasks. See who wins on correctness, cost, and latency.'
pubDate: '2026-02-13'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's scorecard pits three frontier models against real engineering tasks: Claude Opus 4.6 (Anthropic), 5.3-Codex-Spark (OpenAI), and Kimi K2.5 (Moonshot). We tested on a bug fix, a tradeoff decision, and a docs-driven integration.

## Cross-Task Comparison

| Model | Coding | Reasoning | Tool-use | Total |
|-------|--------|-----------|----------|-------|
| Claude Opus 4.6 | 9.6 | 9.5 | 9.2 | **9.4** |
| 5.3-Codex-Spark | 9.5 | 9.0 | 9.1 | **9.2** |
| Kimi K2.5 | 8.9 | 8.9 | 8.9 | **8.9** |

**Weighting:** Coding 40% / Reasoning 35% / Tool-use 25%

## Task 1: Coding — Fix a Race Condition in Async Handler

**Prompt:**
> You have a Node.js async handler that updates a user record and sends a notification email. Under load, some users receive duplicate emails. Diagnose the race condition and provide a minimal, production-ready fix with proper error handling.

### Scoring Rubric (10 points)
- **Correctness (4 pts):** Fixes the race condition, handles errors, no new bugs
- **Speed-to-usable (3 pts):** Solution is minimal, readable, deployable as-is
- **Clarity (3 pts):** Explanation is clear, identifies root cause, suggests tests

### Results

| Model | Score | Correctness | Speed | Clarity | Notes |
|-------|-------|-------------|-------|---------|-------|
| Claude Opus 4.6 | 9.6 | 4.0 | 3.0 | 2.6 | Identified missing idempotency key, suggested dedup middleware, included test cases |
| 5.3-Codex-Spark | 9.5 | 4.0 | 3.0 | 2.5 | Same fix, slightly more verbose explanation, solid test coverage |
| Kimi K2.5 | 8.9 | 3.8 | 2.8 | 2.3 | Fix was correct but suggested over-engineered distributed lock pattern |

**What great looked like:**
- Pinpointed the missing idempotency key as root cause
- Provided 15-line minimal fix with proper error handling
- Suggested integration test with concurrent requests
- Warned about email provider retry semantics

**Common failures:**
- Over-engineering with distributed locks when a simple idempotency key suffices
- Missing error handling for the email send failure path
- No test suggestions

## Task 2: Reasoning — Choose Between Build vs Buy for Auth

**Prompt:**
> Your startup needs authentication for a B2B SaaS product. Option A: Use Auth0 (managed). Option B: Roll your own with Passport.js + JWT. Budget is tight, team of 3, 6-month runway. Provide a decision with clear tradeoffs.

### Scoring Rubric (10 points)
- **Correctness (4 pts):** Decision is defensible, considers key factors
- **Speed-to-usable (3 pts):** Recommendation is actionable, not hedged
- **Clarity (3 pts):** Tradeoffs are explicit, assumptions stated

### Results

| Model | Score | Correctness | Speed | Clarity | Notes |
|-------|-------|-------------|-------|---------|-------|
| Claude Opus 4.6 | 9.5 | 4.0 | 3.0 | 2.5 | Clear rec (Auth0), detailed cost/time analysis, called out enterprise SSO need |
| 5.3-Codex-Spark | 9.0 | 3.8 | 2.8 | 2.4 | Same decision but more hedged, less explicit on costs |
| Kimi K2.5 | 8.9 | 3.7 | 2.8 | 2.4 | Recommended roll-your-own, underweighted maintenance burden |

**What great looked like:**
- Picked Auth0 without hedging ("use managed auth unless you have a specific reason not to")
- Included concrete cost comparison ($240/mo Auth0 vs 2-3 eng weeks)
- Called out enterprise SSO as a future requirement that's cheap now, expensive later
- Warned about security maintenance burden on small teams

**Common failures:**
- Hedging ("it depends") without committing
- Underweighting long-term maintenance costs
- Not considering enterprise features (SSO, SCIM) as future blockers

## Task 3: Tool-use — Integrate Stripe Webhooks with Idempotency

**Prompt:**
> Set up Stripe webhook handling for subscription events. Requirements: verify signatures, handle idempotency, log all events to Postgres, retry on transient failures. Provide production-ready code.

### Scoring Rubric (10 points)
- **Correctness (4 pts):** Signature verification, idempotency, error handling, retries
- **Speed-to-usable (3 pts):** Code is deployable, follows best practices
- **Clarity (3 pts):** Explains security considerations, edge cases

### Results

| Model | Score | Correctness | Speed | Clarity | Notes |
|-------|-------|-------------|-------|---------|-------|
| Claude Opus 4.6 | 9.2 | 3.8 | 3.0 | 2.4 | Solid signature check, proper idempotency key usage, mentioned replay attack window |
| 5.3-Codex-Spark | 9.1 | 3.8 | 2.9 | 2.4 | Nearly identical, slightly less clear on Stripe's timestamp tolerance |
| Kimi K2.5 | 8.9 | 3.7 | 2.8 | 2.4 | Missed Stripe's built-in idempotency keys, implemented custom dedup table |

**What great looked like:**
- Used Stripe's built-in idempotency keys instead of rolling custom dedup
- Verified signature with correct timestamp tolerance (5 min)
- Logged raw event payload before processing for audit
- Implemented exponential backoff for retries

**Common failures:**
- Over-engineering custom dedup when Stripe provides idempotency
- Missing timestamp tolerance check in signature verification
- Not logging raw payloads for debugging

## Operator Verdict

**Winner: Claude Opus 4.6 (9.4)**

Claude consistently provided the most actionable, production-ready answers with minimal hedging. The race condition fix was minimal and correct, the build-vs-buy decision was decisive with concrete numbers, and the Stripe integration followed best practices without over-engineering.

**Runner-up: 5.3-Codex-Spark (9.2)**

Strong on coding and tool-use, slightly more verbose and hedged on reasoning tasks. If you're prioritizing code generation over strategic decisions, Codex-Spark is nearly as good.

**Budget pick: Kimi K2.5 (8.9)**

Competent across all tasks but occasionally over-engineered (distributed locks for simple race conditions, custom dedup tables when Stripe provides them). Good value for the price if you can review outputs carefully.

## Deep-Dive Posts

- [Coding Benchmark Deep Dive](/blog/2026-02-13-coding-benchmark/)
- [Reasoning Benchmark Deep Dive](/blog/2026-02-13-reasoning-benchmark/)
- [Tool-use Benchmark Deep Dive](/blog/2026-02-13-tool-use-benchmark/)

---

**Methodology:** All tasks run with identical prompts, scored blind by two engineers using the rubric above. Cost and latency tracked but not weighted in scores. Full methodology at [/about](/about).
