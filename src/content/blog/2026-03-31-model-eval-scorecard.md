---
title: 'Daily Model Eval Scorecard — 2026-03-31'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 XHigh, Claude Opus 4.6, and Grok 4.20 Beta.'
pubDate: '2026-03-31'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

End of March, and the leaderboard is crowded. **Gemini 3.1 Pro Preview** has been sitting at the top of Artificial Analysis's intelligence index for weeks — Google's 1M-context flagship that seems to get faster every time we test it. **GPT-5.4 XHigh** shares that #1 intelligence spot but trades speed for exhaustive reasoning. **Claude Opus 4.6** remains Anthropic's most capable model — expensive at $10/M tokens, but that precision tax buys you surgical accuracy. And **Grok 4.20 Beta 0309**, xAI's latest, brings massive context windows and aggressive pricing to challenge the incumbents. Four contenders, three tasks, one scorecard. Let's go.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 9.1 | 9.2 | **9.3** | **9.18** |
| GPT-5.4 XHigh | 9.2 | **9.6** | 8.6 | **9.17** |
| Claude Opus 4.6 | **9.4** | 9.0 | 8.8 | **9.10** |
| Grok 4.20 Beta 0309 | 8.9 | 9.1 | 9.0 | **8.98** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview edges out the field today thanks to a dominant tool-use performance and consistently strong showings everywhere else. At 108 tokens/second and $4.50/M tokens, it's delivering top-tier intelligence at nearly double the speed of GPT-5.4 XHigh and less than half the cost of Claude Opus 4.6. GPT-5.4 XHigh posted the highest single-category score of the day in reasoning (9.6) but couldn't overcome its latency penalty in tool-use. Claude Opus 4.6 remains the coding benchmark to beat — its debug accuracy is unmatched when precision matters more than throughput. Grok 4.20 Beta put up a surprisingly balanced card, winning no single category but dropping below 8.9 nowhere — the kind of consistency that wins in production when you can't predict what your users will throw at the model.

---

## Task 1: Coding — Concurrent Rate Limiter with Sliding Window

**Prompt:** *"Implement a sliding-window rate limiter in Rust using async/await. Requirements: (1) support configurable window size and max requests, (2) use a `HashMap` keyed by client ID, (3) each window stores timestamps of successful requests, (4) expired entries must be pruned on each check (not lazily), (5) the `check` method must be async-safe and return a `Result<Allow, RateLimitInfo>` where `RateLimitInfo` includes `retry_after_ms`. No external crates — std + tokio only."*

### What Great Looked Like

A complete, compilable Rust module with proper struct definitions, a `check` async method that prunes the window before evaluating, correct `retry_after_ms` calculation based on the oldest timestamp in the window, proper error types, and a brief usage example.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 4.0 | 2.7 | 2.7 | **9.4** |
| GPT-5.4 XHigh | 3.9 | 2.5 | 2.8 | **9.2** |
| Gemini 3.1 Pro Preview | 3.8 | 2.8 | 2.5 | **9.1** |
| Grok 4.20 Beta 0309 | 3.7 | 2.7 | 2.5 | **8.9** |

### Why Claude Opus 4.6 Won

Opus 4.6 produced the only solution that got every requirement right on the first pass. The pruning logic was placed correctly — before the capacity check, not after — and it used `retain()` on the `VecDeque` of timestamps rather than manual iteration, which is both cleaner and more idiomatic Rust. The `retry_after_ms` calculation used the window's oldest entry minus current time, handling the edge case where the window is exactly full. GPT-5.4's code was equally correct but spent 40% more tokens explaining its own reasoning inline (classic XHigh verbosity). Gemini was fast and mostly correct but initially forgot to make the `RateLimitInfo` struct `Clone + Debug`, which would have caused a compile error in real usage. Grok 4.20 Beta produced solid code but had a subtle bug in its pruning: it pruned expired entries but didn't account for the case where *all* entries expired, leaving an empty window that incorrectly reported the limit as still reached.

---

## Task 2: Reasoning — Distributed System Failure Diagnosis

**Prompt:** *"A distributed payment system has started failing intermittently. Symptoms: (1) 3% of transactions return 503 in the 2-4 PM window only, (2) database CPU is at 92% during that window, (3) the payment gateway reports increased latency but no errors on their end, (4) Redis cache hit rate drops from 94% to 71% during the window, (5) the problem started after deploying a new rewards calculation microservice last week. The rewards service queries the same database. You have access to metrics, logs, and can deploy one fix today. What's your diagnosis, your immediate fix, and your long-term plan?"*

### What Great Looked Like

A root-cause analysis linking the rewards service to the database CPU spike (which causes cascading failures: slow DB → cache misses → more DB load → 503s), an immediate mitigation (rate-limit or circuit-break the rewards service), and a long-term plan (read replica, separate data store for rewards, or batch processing).

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 4.0 | 2.5 | 3.1 | **9.6** |
| Grok 4.20 Beta 0309 | 3.7 | 2.8 | 2.6 | **9.1** |
| Gemini 3.1 Pro Preview | 3.8 | 2.6 | 2.8 | **9.2** |
| Claude Opus 4.6 | 3.7 | 2.5 | 2.8 | **9.0** |

### Why GPT-5.4 XHigh Won

GPT-5.4 XHigh produced the most complete causal chain: rewards service runs a batch job at 2 PM daily → complex aggregation queries hammer the shared database → DB CPU hits 92% → query latency spikes → payment service queries start timing out → Redis entries expire before they're re-fetched → cache hit rate tanks → even more load on the DB → death spiral. The immediate fix was precise: deploy a circuit breaker on the rewards service with a concurrency limit of 5 concurrent DB connections, capping its resource usage. Long-term: move rewards to a read replica. Where XHigh pulled ahead was the quantitative reasoning — it estimated the rewards service was responsible for ~40% of DB load based on the cache hit rate delta, and showed the math. Grok 4.20 Beta had a strong diagnosis too, correctly identifying the causal chain but offering a vaguer immediate fix ("throttle the rewards service"). Gemini was fast and accurate but glossed over the cache hit rate's role in the feedback loop. Claude Opus 4.6 gave a textbook-correct answer that lacked the quantitative depth of XHigh's response.

---

## Task 3: Tool-Use — Real-Time Competitive Analysis

**Prompt:** *"Research the top 3 AI coding assistants currently available (not IDE plugins — standalone agents like Devin, Codex, Claude Code, etc.). For each, find: pricing, supported languages, context window, and one unique capability. Then cross-reference with at least 2 independent reviews or benchmarks and summarize in a comparison table."*

### What Great Looked Like

Autonomous multi-step research: identify the agents, search for pricing/docs, find independent reviews, extract comparable metrics, and synthesize a clean table with sources cited. Speed matters — fewer round-trips win.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.8 | 2.9 | 2.6 | **9.3** |
| Grok 4.20 Beta 0309 | 3.7 | 2.7 | 2.6 | **9.0** |
| Claude Opus 4.6 | 3.6 | 2.6 | 2.6 | **8.8** |
| GPT-5.4 XHigh | 3.6 | 2.3 | 2.7 | **8.6** |

### Why Gemini 3.1 Pro Preview Won

Gemini 3.1 Pro Preview's 108 tok/s output speed and aggressive parallelism made the difference here. It fired off five searches simultaneously — one per agent for specs, plus two for benchmark comparisons — then synthesized the results in a single pass. Its comparison table was clean, with pricing (monthly + per-task where applicable), language support, context windows, and a "killer feature" column. It cited Devin's knowledge-based autonomous planning, Codex's sandboxed multi-step execution, and Claude Code's agentic git workflow as unique differentiators, backed by references from two independent benchmark roundups. Grok 4.20 Beta was close behind, benefiting from its massive context window to load full benchmark articles without truncation, but its initial agent selection included Cursor (an IDE plugin) before self-correcting, losing time. Claude Opus 4.6 was methodical and correct but took a sequential approach — one search, one fetch, repeat — that cost it on speed. GPT-5.4 XHigh, as usual, was thorough to a fault, re-verifying sources and cross-checking pricing pages, producing the most accurate table but finishing dead last on speed.

---

## Bottom Line

March ends with a photo finish at the top. Gemini 3.1 Pro Preview's combination of speed, intelligence, and price makes it the most well-rounded model in today's eval — it's hard to argue with 108 tok/s at $4.50/M when you're tying the intelligence leaderboard. GPT-5.4 XHigh remains the undisputed reasoning champion, and for tasks where being right matters more than being fast, nothing else comes close. Claude Opus 4.6's coding precision keeps it relevant despite the premium price tag — if your bills are measured in bugs-not-caught rather than tokens-consumed, it pays for itself. And Grok 4.20 Beta continues to prove xAI is a serious player: balanced, fast, and cheap enough to be the "default choice" for teams that don't want to overthink their model selection. The real story this month? The gap between #1 and #4 is 0.20 weighted points. We've never seen the field this tight.
