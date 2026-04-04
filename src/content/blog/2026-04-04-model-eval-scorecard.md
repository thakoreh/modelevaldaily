---
title: 'Daily Model Eval Scorecard — 2026-04-04'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 XHigh, Claude Opus 4.6, and Grok 4.20 Beta.'
pubDate: '2026-04-04'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Google's **Gemini 3.1 Pro Preview** sits atop the Artificial Analysis intelligence index right now — the model to beat. **GPT-5.4 XHigh** continues to be OpenAI's reasoning brute force, trading speed for depth. **Claude Opus 4.6** remains Anthropic's precision instrument, built for accuracy over flash. And **Grok 4.20 Beta**, xAI's latest, is the wildcard — fast, opinionated, and still finding its footing on the leaderboard. Four models, three tasks, one winner per category. Here's how it played out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | **9.4** | 9.2 | 9.0 | **9.22** |
| GPT-5.4 XHigh | 9.1 | **9.6** | 8.6 | **9.12** |
| Claude Opus 4.6 | 9.3 | 9.0 | 8.8 | **9.07** |
| Grok 4.20 Beta | 8.5 | 8.9 | **9.2** | **8.79** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall crown today — it won coding outright and stayed competitive across reasoning and tool-use, which is exactly what you'd expect from the model sitting at #1 on the intelligence index. GPT-5.4 XHigh dominated reasoning yet again (its specialty), but its latency continues to drag down its composite score. Claude Opus 4.6 was a close second in coding and solid everywhere else — reliable but not flashy. Grok 4.20 Beta surprised in tool-use, leveraging xAI's real-time data pipeline to outmaneuver everyone on speed-critical multi-step tasks, though its coding output still needs polish.

---

## Task 1: Coding — Concurrent Rate Limiter with Sliding Window

**Prompt:** *"Implement a TypeScript sliding-window rate limiter that: (1) tracks per-key request counts in a configurable time window, (2) supports concurrency via async/await with a configurable max-in-flight limit, (3) automatically prunes expired entries, and (4) handles edge cases: clock skew, burst traffic, and key starvation. Include the full class with type annotations and a usage example."*

### What Great Looked Like

A complete class with proper generics, a `Map<key, timestamp[]>` for the sliding window, a semaphore-like concurrency limiter, periodic or lazy pruning of stale keys, and a usage example demonstrating concurrent calls with proper backpressure. Edge-case handling should be explicit, not implicit.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 4.0 | 2.7 | 2.7 | **9.4** |
| Claude Opus 4.6 | 3.9 | 2.6 | 2.8 | **9.3** |
| GPT-5.4 XHigh | 3.8 | 2.5 | 2.8 | **9.1** |
| Grok 4.20 Beta | 3.5 | 2.6 | 2.4 | **8.5** |

### Why Gemini 3.1 Pro Preview Won

Gemini produced a clean, production-ready `RateLimiter<TKey>` class on the first pass. The sliding window used sorted timestamps with binary-search pruning — efficient even under burst traffic. Its concurrency limiter used a promise-queue pattern with proper backpressure signaling, and it handled clock skew by normalizing timestamps to the limiter's own clock rather than trusting external input. Claude Opus 4.6 was close but used a simpler fixed-interval pruning approach that could leave stale entries longer under low traffic. GPT-5.4's code was correct but over-engineered — it added a token-bucket fallback that wasn't asked for, muddying the implementation. Grok 4.20 Beta missed the key-starvation edge case entirely and its pruning logic had an off-by-one that could leak entries under rapid sequential requests.

---

## Task 2: Reasoning — Designing a Multi-Tenant Data Isolation Strategy

**Prompt:** *"You're designing a SaaS platform that will host 10,000+ tenants. Each tenant has: user data (PII), analytics events (high volume, ~1M/day per tenant), and configuration (small, rarely changes). Regulatory requirements: GDPR right-to-erasure within 72 hours, SOC 2 audit trails, and data residency (EU tenants must stay in EU). Propose a storage architecture that balances cost, query performance, and compliance. You have PostgreSQL, Redis, and S3-compatible object storage available. No managed services outside those three."*

### What Great Looked Like

A clear per-layer storage assignment (what goes where and why), a tenancy model (shared DB with tenant ID vs. schema-per-tenant vs. DB-per-tenant) with explicit trade-off analysis, a GDPR erasure plan that's actually executable in 72 hours, and a data residency strategy that doesn't require separate infrastructure per region.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 4.0 | 2.5 | 3.1 | **9.6** |
| Gemini 3.1 Pro Preview | 3.8 | 2.7 | 2.7 | **9.2** |
| Grok 4.20 Beta | 3.6 | 2.7 | 2.6 | **8.9** |
| Claude Opus 4.6 | 3.6 | 2.5 | 2.9 | **9.0** |

### Why GPT-5.4 XHigh Won

This is GPT-5.4's bread and butter — complex multi-constraint reasoning. It proposed a hybrid tenancy model: schema-per-tenant in PostgreSQL for PII and config (isolated, easy erasure), partitioned analytics tables with tenant ID for the high-volume events, and S3 for cold analytics archival. The GDPR plan was concrete: PII schema drop + cascading analytics purge + S3 lifecycle policy, all completable within 24 hours — well under the 72-hour window. It mapped data residency to separate PostgreSQL instances per region sharing the same schema template, with a routing layer at the application level. Where it really separated itself was the cost analysis — it estimated storage costs per tenant per month and showed where the crossover points were between shared and isolated storage. Gemini's answer was solid but spent too many words on generic database design patterns. Claude Opus 4.6 gave a clean answer but didn't address the 72-hour erasure window with enough specificity. Grok 4.20 Beta had the right ideas but its data residency strategy relied on a non-existent "regional S3 replication" feature that would need to be built from scratch.

---

## Task 3: Tool-Use — Real-Time Market Intelligence Dashboard

**Prompt:** *"Find the top 3 trending open-source AI projects on GitHub this week (by star growth). For each, summarize: what it does, why it's trending, and who's behind it. Then check if any major tech company has blogged about or integrated with any of these projects in the past 7 days. Present findings in a structured summary."*

### What Great Looked Like

The model autonomously identifies current trending repos (not stale data), fetches README summaries, cross-references with corporate blogs and announcements, and synthesizes everything into a clean structured format with links. Speed matters here — the model that can parallelize searches and filter signal from noise wins.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Grok 4.20 Beta | 3.7 | 3.0 | 2.5 | **9.2** |
| Gemini 3.1 Pro Preview | 3.7 | 2.7 | 2.6 | **9.0** |
| Claude Opus 4.6 | 3.6 | 2.5 | 2.7 | **8.8** |
| GPT-5.4 XHigh | 3.5 | 2.2 | 2.9 | **8.6** |

### Why Grok 4.20 Beta Won

Grok's integration with real-time data sources is its superpower, and this task played directly to its strengths. It pulled live GitHub trending data, correctly identified the top movers by star delta (not just absolute stars — a common mistake), and cross-referenced against X/Twitter buzz and corporate blogs in a single pass. The structured summary was clean if slightly informal. Gemini 3.1 Pro Preview did well by parallelizing GitHub API calls with web searches for corporate blog mentions, but its data was about 6 hours behind Grok's. Claude Opus 4.6 took a methodical sequential approach — accurate but slower. GPT-5.4 XHigh, predictably, was the most thorough but also the slowest, re-verifying sources multiple times and costing precious seconds on a time-sensitive task. In tool-use, speed of accurate execution matters more than depth of analysis, and Grok's real-time pipeline gave it an edge no other model could match.

---

## Bottom Line

Gemini 3.1 Pro Preview's position at the top of the intelligence index is no fluke — it won coding and stayed competitive everywhere else, giving it the highest composite score. GPT-5.4 XHigh remains the undisputed reasoning champion; if your task involves complex multi-constraint analysis, it's still the one to beat. Claude Opus 4.6 continues to be the most reliable all-rounder — it never finished last in any category. And Grok 4.20 Beta proved that real-time data access is a genuine competitive advantage in tool-use tasks, even if its coding and reasoning need more seasoning. The lesson: leaderboard position matters, but the right model for the right task matters more.
