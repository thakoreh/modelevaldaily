---
title: 'Daily Model Eval Scorecard — 2026-03-24'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.3 Codex, Claude Opus 4.6 Max, and MiroThinker 72B.'
pubDate: '2026-03-24'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's scorecard features four models that represent very different bets on what "smart" means. **Gemini 3.1 Pro Preview** currently sits atop the Artificial Analysis intelligence leaderboard — Google's most capable reasoning model, fresh out of preview. **GPT-5.3 Codex** is OpenAI's coding-specialized workhorse, built for shipping code and designed to replace junior devs, not debate philosophers. **Claude Opus 4.6 Max** is Anthropic at full power, with extended thinking and the largest context window in Anthropic's lineup. And **MiroThinker 72B** is the open-weight underdog that's been making waves — an open-source model that reportedly benchmarks above GPT-5 on several evals. Four models, three tasks, no mercy.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| GPT-5.3 Codex | **9.4** | 8.7 | 8.6 | **8.93** |
| Claude Opus 4.6 Max | 9.0 | **9.3** | 8.8 | **9.04** |
| Gemini 3.1 Pro Preview | 8.8 | 9.1 | **9.2** | **9.00** |
| MiroThinker 72B | 8.5 | 8.9 | 8.4 | **8.63** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Claude Opus 4.6 Max edges out the overall win by dominating reasoning and staying competitive in coding and tool-use — a textbook "no weaknesses" performance. Gemini 3.1 Pro Preview nearly matched it, winning tool-use convincingly and posting a strong reasoning score, but fell short in coding where it showed occasional sloppiness. GPT-5.3 Codex did exactly what it was built for: crushed coding, then faded in the other two categories. MiroThinker 72B, the open-weight story of the week, showed impressive reasoning chops for a 72B model and proved it belongs in this conversation — but coding and tool-use revealed the gap between open-weight ambition and proprietary polish.

---

## Task 1: Coding — Streaming ETL Pipeline with Backpressure

**Prompt:** *"Write a Node.js TypeScript class that implements a streaming ETL pipeline with backpressure handling. Requirements: (1) accepts an async generator as input, (2) applies a configurable transform function to each chunk, (3) writes to a writable stream with backpressure signaling, (4) supports configurable concurrency (max parallel transforms), (5) emits progress events (processed count, error count, bytes written), and (6) gracefully handles upstream errors without crashing the pipeline. Include a usage example with a mock data source."*

### What Great Looked Like

A clean, well-typed TypeScript class using `AsyncGenerator`, `Writable` streams, and a semaphore or worker pool pattern for concurrency control. Backpressure should be handled via the writable stream's `drain` event. Error handling should catch transform failures per-item and continue processing. The progress emitter should use Node's `EventEmitter`. Usage example should demonstrate it end-to-end.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.3 Codex | 3.9 | 2.8 | 2.7 | **9.4** |
| Claude Opus 4.6 Max | 3.8 | 2.5 | 2.7 | **9.0** |
| Gemini 3.1 Pro Preview | 3.5 | 2.6 | 2.7 | **8.8** |
| MiroThinker 72B | 3.4 | 2.5 | 2.6 | **8.5** |

### Why GPT-5.3 Codex Won

This is Codex's bread and butter, and it showed. The implementation used a clean semaphore pattern for concurrency control, correctly hooked into the writable stream's `drain` event for backpressure, and wrapped each transform in a try/catch that emitted error events without killing the pipeline. The type signatures were precise — generic input/output types, proper `AsyncIterable` typing, and a `PipelineOptions` interface that made the API self-documenting. Where it really pulled ahead: the usage example included a realistic mock source with simulated delays, proving the backpressure actually worked. Claude Opus 4.6 Max produced equally clean code but took a more conservative approach to concurrency (a simple queue instead of a semaphore), which worked but was less elegant. Gemini 3.1 Pro Preview's implementation had a subtle bug — it didn't await the writable stream's `finish` event before resolving, meaning the pipeline could report completion while data was still flushing. MiroThinker 72B's answer was structurally sound but missed the backpressure requirement entirely, just piping without checking `write()` return values.

---

## Task 2: Reasoning — Design a Rate Limiter That Actually Works at Scale

**Prompt:** *"Design a distributed rate limiter for an API gateway handling 500k req/s across 50 instances. Requirements: (1) support multiple strategies (token bucket, sliding window, fixed window), (2) per-user and per-endpoint limits configurable at runtime, (3) sub-5ms overhead per request, (4) graceful degradation when the backing store (Redis) is unavailable, (5) handle clock skew across instances. Compare the strategies on accuracy, memory usage, and computational cost. Recommend one with justification."*

### What Great Looked Like

A comprehensive architecture document covering all five requirements, with a clear comparison table of the three strategies, concrete numbers for Redis operations per request, a degradation plan (local fallback with eventual consistency), and a clock skew mitigation strategy (Lamport timestamps, hybrid logical clocks, or bounded drift with sync intervals). The recommendation should be opinionated with explicit trade-offs.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 Max | 3.8 | 2.6 | 2.9 | **9.3** |
| Gemini 3.1 Pro Preview | 3.7 | 2.6 | 2.8 | **9.1** |
| MiroThinker 72B | 3.6 | 2.7 | 2.6 | **8.9** |
| GPT-5.3 Codex | 3.4 | 2.6 | 2.7 | **8.7** |

### Why Claude Opus 4.6 Max Won

Claude Opus 4.6 Max treated this like a real system design interview and delivered accordingly. It recommended the sliding window counter (not the log-based sliding window — correctly noting that 500k req/s makes per-request log storage infeasible) and justified it with concrete math: O(1) Redis operations per request vs. O(n) for log-based. The clock skew section was the differentiator — it proposed a bounded drift model where each instance tracks its offset from Redis's TIME command, applies corrections locally, and falls back to a ±50ms tolerance band rather than trying for perfect synchronization. The degradation plan was practical: local token bucket as a fallback, relaxed to 110% of the configured limit to prevent false rejections during outages, with a 30-second sync-back window once Redis recovers. Gemini 3.1 Pro Preview was nearly as good but hedged on the recommendation instead of committing. MiroThinker 72B showed strong reasoning for a 72B model — its strategy comparison table was the cleanest of the group — but hand-waved the clock skew section. GPT-5.3 Codex, unsurprisingly, gave an answer that read like documentation rather than design: correct but uninspired.

---

## Task 3: Tool-Use — Competitive Intelligence Report

**Prompt:** *"Research the current state of AI coding assistants (March 2026). For each of the top 5 tools (Cursor, GitHub Copilot, Windsurf, Cline, and any other major one), find: (1) their latest major feature release, (2) pricing tier changes in the last 3 months, (3) user sentiment from Reddit/Hacker News in the last month, and (4) any announced but unreleased features. Compile into a comparison table."*

### What Great Looked Like

Autonomous multi-source research with parallel searches for each tool, real pricing data pulled from official pages, actual user sentiment from community forums (not generic praise), and a structured comparison table. Should distinguish between announced shipping features and vaporware.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.7 | 2.9 | 2.6 | **9.2** |
| Claude Opus 4.6 Max | 3.6 | 2.5 | 2.7 | **8.8** |
| GPT-5.3 Codex | 3.5 | 2.6 | 2.5 | **8.6** |
| MiroThinker 72B | 3.3 | 2.6 | 2.5 | **8.4** |

### Why Gemini 3.1 Pro Preview Won

Gemini 3.1 Pro Preview's native search grounding gave it a massive speed advantage here. It launched parallel searches for all five tools simultaneously, pulled real data from official pricing pages, and cross-referenced Reddit threads for sentiment. The comparison table was clean and actionable: Cursor's agentic mode, Copilot's workspace integration, Windsurf's Cascade 2.0, Cline's multi-file editing, and Zed's native AI. Where Gemini pulled ahead was accuracy under time pressure — it correctly identified that Cursor had adjusted its Pro tier pricing (not just restated old prices, a trap GPT-5.3 Codex fell into), and it flagged Windsurf's recent pivot toward enterprise as a sentiment flashpoint on Hacker News. Claude Opus 4.6 Max was thorough but sequential, costing valuable speed points. GPT-5.3 Codex hallucinated a "Cline Enterprise" tier that doesn't exist — a reminder that coding models don't always make good researchers. MiroThinker 72B got the basics right but confused Cline's open-source status (it's open-core, not fully open-source) and missed Zed entirely.

---

## Bottom Line

Today's eval confirmed what the leaderboard numbers suggest: the top tier is tighter than ever. Claude Opus 4.6 Max's overall win came from consistency — not the fastest, not the flashiest, but the one you'd trust with the hardest problem. Gemini 3.1 Pro Preview is the real story though: topping the intelligence leaderboard wasn't a fluke. Its tool-use dominance today shows it's not just smart — it's *practically* smart, able to turn that intelligence into real-world results fast. GPT-5.3 Codex remains the coding specialist and will until someone builds a better one — but its narrowness is a liability in anything that isn't a code editor. And MiroThinker 72B? For an open-weight model, it's genuinely impressive. Its reasoning score nearly matched Claude's, which is remarkable for 72B parameters. The open-weight gap isn't just closing — it's almost invisible in certain categories. Watch this space.
