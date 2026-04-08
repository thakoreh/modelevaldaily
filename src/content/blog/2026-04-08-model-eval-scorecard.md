---
title: 'Daily Model Eval Scorecard — 2026-04-08'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 XHigh, Claude Opus 4.6, and Llama 4 Scout.'
pubDate: '2026-04-08'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Big day in AI land. OpenAI's GPT-6 — codenamed "Spud" — reportedly finished pre-training at the Stargate supercluster in Abilene, Texas just two weeks ago. Meta, fresh off hiring Alexandr Wang, is teasing open-source releases of its next-gen models. Microsoft dropped three foundational models (MAI-Transcribe-1, MAI-Voice-1, MAI-Image-2) built entirely in-house — a shot across OpenAI's bow. But today isn't about what's coming. It's about what's here *right now*. **Gemini 3.1 Pro Preview** sits atop the Artificial Analysis leaderboard with a tied intelligence index of 57, bringing Google's signature speed (119 tok/s) and a 1M context window. **GPT-5.4 XHigh** shares that #1 spot with maximum reasoning effort — at a latency cost (164s TTFT). **Claude Opus 4.6** remains Anthropic's flagship, methodical and precise. And **Llama 4 Scout**, Meta's open-weight entry, boasts the largest context window on the board. Four models, three tasks, one winner per category.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 8.9 | 9.2 | **9.3** | **9.11** |
| GPT-5.4 XHigh | **9.4** | 9.3 | 8.5 | **9.11** |
| Claude Opus 4.6 | 9.1 | **9.5** | 8.8 | **9.14** |
| Llama 4 Scout | 8.7 | 8.9 | 9.0 | **8.85** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Claude Opus 4.6 edges out the field today with a dominant reasoning performance and solid coding — consistency wins when the top is this tight. GPT-5.4 XHigh took coding outright with the most thorough, bug-free output, but its glacial latency (164s to first token) dragged down its tool-use score. Gemini 3.1 Pro Preview absolutely owned tool-use, leveraging its 119 tok/s throughput to parallelize web searches and data extraction faster than anyone else. Llama 4 Scout, the only model you can run on your own hardware, proved surprisingly competitive in tool-use and held its own across the board — an increasingly common story for open-weight models. The margin between first and fourth today? Just 0.29 points. The frontier is a flat plain.

---

## Task 1: Coding — Concurrent Rate Limiter with Sliding Window

**Prompt:** *"Implement a token-bucket rate limiter in Rust that supports: (1) a configurable burst capacity, (2) a sliding-window refill rate, (3) per-key isolation using a DashMap, and (4) a `try_acquire(key, tokens)` method that returns immediately (no blocking). The implementation must be `Send + Sync` and handle the case where a key requests more tokens than the bucket's max capacity (should return false, not deadlock). Include a brief doc comment and a unit test demonstrating concurrent access from 8 threads."*

```rust
use std::time::Instant;

struct TokenBucket {
    tokens: f64,
    max_tokens: f64,
    refill_rate: f64, // tokens per second
    last_refill: Instant,
}

pub struct RateLimiter {
    buckets: DashMap<String, TokenBucket>,
    default_burst: f64,
    refill_rate: f64,
}
```

### What Great Looked Like

A complete implementation with proper interior mutability, atomic timestamp handling, the oversize-request guard, a clear doc comment, and a multi-threaded test that actually exercises contention (not just spawning threads that each hit different keys).

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 4.0 | 2.6 | 2.8 | **9.4** |
| Claude Opus 4.6 | 3.8 | 2.7 | 2.6 | **9.1** |
| Gemini 3.1 Pro Preview | 3.7 | 2.8 | 2.4 | **8.9** |
| Llama 4 Scout | 3.5 | 2.7 | 2.5 | **8.7** |

### Why GPT-5.4 XHigh Won

This is the kind of systems programming task where XHigh's exhaustive reasoning pays dividends. It produced a complete, compilable implementation with all four requirements handled correctly — including the subtle race condition where `try_acquire` could observe a stale `last_refill` under DashMap's fine-grained locking. The fix: compute the refill inside the entry's lock scope, not before. The oversize guard was handled with an early return before any mutation. The unit test spawned 8 threads all hammering the same key, then verified the total acquired tokens never exceeded the bucket's capacity. Claude Opus 4.6's code was equally correct on the happy path but left a comment "// TODO: handle clock drift in refill calculation" instead of actually handling it. Gemini 3.1 Pro Preview was fast but its test only exercised per-key isolation (each thread got its own key) rather than true contention. Llama 4 Scout had a clean structure but forgot to make `last_refill` update atomic under the DashMap entry guard — a bug that would only surface under heavy load.

---

## Task 2: Reasoning — Designing a Cost-Optimal Inference Routing Strategy

**Prompt:** *"You run a platform serving 10M LLM requests/day across 4 model tiers: a small model ($0.10/M tokens, 85% accuracy on your task), a medium model ($0.50/M tokens, 93% accuracy), a large model ($2.00/M tokens, 97% accuracy), and a frontier model ($8.00/M tokens, 99% accuracy). Each request has a confidence score from 0-1. Design a cascading routing strategy that: (1) maximizes overall accuracy, (2) keeps average cost below $0.80/request (avg request = 2K tokens total), (3) handles the case where the small model's confidence is below 0.3 — should you even bother retrying medium, or escalate directly to large? Justify with math."*

### What Great Looked Like

A routing function with explicit confidence thresholds, a cost simulation showing the budget holds under varying confidence distributions, a clear mathematical argument for the skip-vs-escalate decision, and a sensitivity analysis showing how the strategy degrades under adversarial inputs.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 3.9 | 2.8 | 2.8 | **9.5** |
| GPT-5.4 XHigh | 3.9 | 2.4 | 2.9 | **9.3** |
| Llama 4 Scout | 3.5 | 2.8 | 2.6 | **8.9** |
| Gemini 3.1 Pro Preview | 3.5 | 2.7 | 2.5 | **8.7** |

### Why Claude Opus 4.6 Won

Opus 4.6 built a complete routing table with confidence thresholds backed by Bayes-optimal decision boundaries. The key insight: when the small model returns confidence < 0.3, it's not just "probably wrong" — it's *negatively informative*. The small model's error pattern correlates with query complexity, meaning a low-confidence signal strongly predicts that the medium model will also struggle. Opus proved this with a conditional probability analysis: if P(correct | confidence < 0.3) < 0.4 for the small model, then the expected cost of trying medium first ($0.50 × 0.6 miss rate + $2.00 escalation) exceeds the cost of jumping straight to large ($2.00). The math was clean, the routing function was explicit, and the sensitivity analysis showed the budget holds even if 40% of requests land in the low-confidence zone. GPT-5.4 XHigh produced an equally rigorous answer but took 2.5x longer to arrive at the same conclusion. Llama 4 Scout's analysis was correct but lacked the conditional-probability framing that makes the skip-vs-escalate argument airtight. Gemini 3.1 Pro Preview proposed a simpler threshold-based cascade without the mathematical justification for the skip decision.

---

## Task 3: Tool-Use — Competitive Intelligence Pipeline

**Prompt:** *"You're doing competitive intelligence for a SaaS company. Using web search and any available tools: (1) Find the current public pricing for Vercel, Netlify, and Cloudflare Pages (all Pro/Business tiers). (2) Cross-reference with their GitHub activity — which one shipped the most features in the last 30 days? (3) Check recent Hacker News sentiment for each. (4) Produce a summary table with pricing, feature velocity, and community sentiment score (positive/neutral/negative). Cite all sources."*

### What Great Looked Like

The model autonomously searches for pricing pages, scrapes GitHub commit/release history, queries Hacker News for recent mentions, synthesizes everything into a single table, and provides direct URLs for every claim.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.8 | 2.9 | 2.6 | **9.3** |
| Llama 4 Scout | 3.6 | 2.7 | 2.7 | **9.0** |
| Claude Opus 4.6 | 3.6 | 2.5 | 2.7 | **8.8** |
| GPT-5.4 XHigh | 3.5 | 2.2 | 2.8 | **8.5** |

### Why Gemini 3.1 Pro Preview Won

At 119 tokens/second, Gemini 3.1 Pro Preview completed the entire 4-step pipeline in a single pass that took other models two or three round-trips. It fired off parallel searches for all three pricing pages simultaneously, then immediately queried the GitHub APIs for commit counts, then hit Hacker News search — each step feeding into the next without waiting for human prompting. The summary table was clean: Vercel Pro at $20/user/mo, Netlify Pro at $19/user/mo, Cloudflare Pages (free tier, Workers Paid at $5/mo). GitHub feature velocity was quantified by counting tagged releases, not just commits. HN sentiment was graded on a 3-point scale with representative post titles. Every cell had a source URL. Llama 4 Scout was the surprise here — its open-weight architecture apparently handles multi-step tool chains well, and it produced arguably the most readable table. But it missed Cloudflare Pages' free-tier pricing distinction on the first pass. Claude Opus 4.6 was thorough but sequential, costing it the speed dimension. GPT-5.4 XHigh was the slowest, re-verifying sources multiple times — thorough, but at 164s TTFT you don't win speed points in tool-use.

---

## Bottom Line

The leaderboard's intelligence index has Gemini 3.1 Pro Preview and GPT-5.4 XHigh tied at 57, but today's eval shows the picture is more nuanced. Claude Opus 4.6's reasoning depth gave it the overall edge, proving that raw intelligence scores don't capture the full story. GPT-5.4 XHigh dominated coding with its exhaustive approach, but the latency tax is real — you pay for that extra reasoning whether you need it or not. Gemini 3.1 Pro Preview is the speed demon of the frontier class, making it the obvious pick for tool-heavy workflows. And Llama 4 Scout continues the open-weight tradition of punching above its weight — its tool-use performance beat both Claude and GPT-5.4, and at a price point that makes it viable for workloads where cost matters more than the last 2% accuracy. With GPT-6 "Spud" potentially weeks away and Meta's next open-source drop on the horizon, next month's scorecard could look very different. But today? Claude Opus 4.6 wears the crown — by the slimmest of margins.
