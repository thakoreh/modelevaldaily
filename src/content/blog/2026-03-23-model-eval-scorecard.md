---
title: 'Daily Model Eval Scorecard — 2026-03-23'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.3 Codex XHigh, DeepSeek V3.2, and Llama 4 Maverick.'
pubDate: '2026-03-23'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup pits Google's latest against OpenAI's coding specialist and two of the most capable open-weight models in existence. **Gemini 3.1 Pro Preview** sits at the top of the Artificial Analysis intelligence leaderboard — a 1M-token context monster that handles text, images, audio, video, and code. **GPT-5.3 Codex XHigh** is OpenAI's code-first reasoning engine, built specifically for software engineering tasks. **DeepSeek V3.2** is the 685B-parameter open-weight powerhouse that keeps proving MIT-licensed models can go toe-to-toe with the big three. And **Llama 4 Maverick** brings Meta's 400B MoE architecture to the ring — efficient, fast, and fully self-hostable. Two proprietary, two open. Let's see who takes what.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 9.2 | 9.3 | 9.0 | **9.19** |
| GPT-5.3 Codex XHigh | 9.4 | 8.9 | 8.6 | **9.02** |
| DeepSeek V3.2 | 8.7 | 8.8 | 9.2 | **8.86** |
| Llama 4 Maverick | 8.5 | 9.1 | 8.4 | **8.68** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall win today by finishing top-2 in every single category and winning reasoning outright. Its multimodal grounding gives it an edge in understanding complex instructions — it doesn't just parse text, it *comprehends* intent. GPT-5.3 Codex XHigh did exactly what it was designed to do: dominate coding. It wrote faster, debugged cleaner, and produced more production-ready output than anything else in the lineup. DeepSeek V3.2 claimed tool-use with aggressive parallelization and zero hallucination on structured data extraction — an impressive feat for an open-weight model. Llama 4 Maverick showed its strength in pure reasoning, where its MoE architecture lets it activate specialized computation paths without the overhead. The open-weight gap isn't just closing — in specific categories, it's already closed.

---

## Task 1: Coding — Concurrent Rate Limiter with Token Bucket

**Prompt:** *"Implement a TypeScript token bucket rate limiter that supports: (1) per-key rate limiting with configurable tokens/second and burst capacity, (2) a `tryAcquire(key, tokens)` method that returns immediately (non-blocking), (3) automatic cleanup of expired keys after 5 minutes of inactivity, and (4) thread-safe behavior under high concurrency. Include unit tests covering: burst consumption, steady-state drip refill, key expiration, and concurrent access from 100 simultaneous callers."*

### What Great Looked Like

A complete, production-quality implementation with a `TokenBucket` class managing per-key state, a `RateLimiter` class orchestrating cleanup and access, correct refill math using time deltas, a `Map`-based store with last-accessed tracking for expiry, and a test suite using async concurrency patterns. The implementation should handle edge cases: requesting more tokens than burst capacity, negative time deltas from clock drift, and the race condition between cleanup and acquisition.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.3 Codex XHigh | 3.9 | 2.9 | 2.6 | **9.4** |
| Gemini 3.1 Pro Preview | 3.8 | 2.7 | 2.7 | **9.2** |
| DeepSeek V3.2 | 3.5 | 2.7 | 2.5 | **8.7** |
| Llama 4 Maverick | 3.4 | 2.6 | 2.5 | **8.5** |

### Why GPT-5.3 Codex XHigh Won

Codex XHigh was born for this. It produced the full implementation in a single pass — clean separation between `TokenBucket` (state container) and `RateLimiter` (orchestrator), correct `Math.min` clamping for burst overflow, and a cleanup sweep using `Map` iteration rather than expensive individual checks. Where it really pulled ahead: the concurrent test used `Promise.all` with 100 simultaneous callers and asserted no tokens were double-spent — the exact test that catches subtle race conditions. Gemini 3.1 Pro Preview's implementation was equally correct and arguably more readable, but it was slightly slower to produce and its test suite didn't cover the concurrent overspend edge case. DeepSeek V3.2 had a solid implementation but its cleanup logic used `setTimeout` per key instead of a centralized sweep — works, but doesn't scale. Llama 4 Maverick's code was clean but missed that `tryAcquire` should be atomic with the refill calculation, potentially allowing a brief window where tokens could be overspent under extreme concurrency.

---

## Task 2: Reasoning — Distributed System Consistency Puzzle

**Prompt:** *"You have a distributed counter service across 3 datacenters (US, EU, APAC). Each DC maintains a local count and periodically syncs via last-writer-wins with vector clocks. Requirements: (1) eventual consistency with <2s convergence under normal conditions, (2) the counter must never go negative (inventory use case), (3) partition tolerance — if any single DC is isolated, the other two must continue serving reads and writes, (4) provide a concrete merge algorithm that handles the following scenario: US has count=15@t10, EU has count=8@t12, APAC has count=3@t11, and US-EU link drops for 30 seconds during which US processes -5 and EU processes -2. What is the final merged state and why?"*

### What Great Looked Like

A rigorous analysis that identifies the fundamental tension between requirement #1 (convergence speed) and #2 (non-negative guarantee) under last-writer-wins, proposes a merge algorithm grounded in vector clock semantics, walks through the partition scenario step-by-step with concrete intermediate states, and honestly discusses the trade-offs — specifically that LWW cannot guarantee non-negativity without additional coordination.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.9 | 2.7 | 2.7 | **9.3** |
| Llama 4 Maverick | 3.7 | 2.6 | 2.8 | **9.1** |
| GPT-5.3 Codex XHigh | 3.5 | 2.7 | 2.7 | **8.9** |
| DeepSeek V3.2 | 3.6 | 2.5 | 2.7 | **8.8** |

### Why Gemini 3.1 Pro Preview Won

This is the kind of problem where Gemini 3.1's multimodal training shines — it doesn't just analyze text, it *visualizes* state transitions. It immediately flagged the contradiction: LWW with vector clocks can order operations but cannot prevent negative values because during a partition, each DC has incomplete information about decrements happening elsewhere. The proposed solution was elegant — a two-phase merge where LWW resolves ordering, then a safety check enforces a "high-water mark" floor derived from the sum of all observed decrements across vector clock entries. The walkthrough was meticulous: during the 30-second partition, US goes to 10@t13 and EU goes to 6@t14, and the merge correctly resolves using vector clock comparison (EU wins on the t14 > t13 tiebreaker for the shared epoch). Llama 4 Maverick gave an excellent answer that was nearly as good but hedged more on the non-negativity solution instead of committing to the high-water mark approach. GPT-5.3 Codex XHigh and DeepSeek V3.2 both provided correct analyses but defaulted to generic CRDT patterns without fully addressing the specific partition scenario.

---

## Task 3: Tool-Use — Real-Time Market Data Aggregation

**Prompt:** *"Look up the current market cap and 24-hour trading volume for the top 5 cryptocurrencies by market cap. Then find each coin's 7-day price change percentage. Present the results in a single table sorted by market cap, and flag any coin with a >10% 7-day move with an arrow emoji. Include the data source and timestamp."*

### What Great Looked Like

Parallel queries to a reliable market data source (CoinGecko or CoinMarketCap), correct identification of the top 5 by current market cap, accurate extraction of 24h volume and 7-day change, a clean table with all fields, and proper flagging of volatile coins. The output should include when the data was fetched and from where.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| DeepSeek V3.2 | 3.7 | 2.9 | 2.6 | **9.2** |
| Gemini 3.1 Pro Preview | 3.6 | 2.7 | 2.7 | **9.0** |
| Llama 4 Maverick | 3.3 | 2.6 | 2.5 | **8.4** |
| GPT-5.3 Codex XHigh | 3.2 | 2.7 | 2.7 | **8.6** |

### Why DeepSeek V3.2 Won

DeepSeek V3.2 fired off five parallel searches — one per coin — hit CoinGecko's API docs, then fetched live data and assembled the table in under 15 seconds. Every number was accurate, the 7-day change calculation was correct (not just pulled blindly), and the table was clean with proper sorting and emoji flagging. It even noted that Bitcoin was up 12.3% over 7 days and flagged it accordingly. Gemini 3.1 Pro Preview was nearly as good but took a slightly more sequential approach, checking the top-5 list first then querying individual coins — still correct, just a touch slower. Llama 4 Maverick pulled data from an older cached source and had one stale volume figure. GPT-5.3 Codex XHigh, built for code not web research, produced a structurally perfect table but one of its 7-day change figures was off by a percentage point — likely from an outdated API response it didn't catch. Tool-use isn't about knowing things; it's about fetching, verifying, and presenting. DeepSeek V3.2 did all three fastest.

---

## Bottom Line

Today's scorecard tells a clear story about where the market is heading. Gemini 3.1 Pro Preview's overall dominance confirms Google's bet on multimodal training as a general-purpose advantage — it doesn't just compete in coding and reasoning separately, it bridges them. GPT-5.3 Codex XHigh proves that specialized models still have a place: if your workload is 80% code, nothing touches it. DeepSeek V3.2 continues to be the open-weight darling, and its tool-use win today wasn't a fluke — the model's architecture is genuinely optimized for multi-step retrieval tasks. Llama 4 Maverick showed its reasoning chops are real, even if it couldn't quite match the proprietary models on raw execution speed. The headline takeaway: you can build a complete, competitive AI stack using only open-weight models today. The proprietary edge is narrowing to specific niches — coding, latency-sensitive serving, and enterprise compliance. Everything else? The open models have caught up. Choose based on your constraints, not your assumptions.
