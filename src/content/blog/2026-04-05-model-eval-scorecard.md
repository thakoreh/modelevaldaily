---
title: 'Daily Model Eval Scorecard — 2026-04-05'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 XHigh, Claude Opus 4.6, and Gemma 4 27B.'
pubDate: '2026-04-05'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Fresh off Google's I/O momentum, **Gemini 3.1 Pro Preview** sits atop the Artificial Analysis intelligence leaderboard — but can it hold its own in real tasks? **GPT-5.4 XHigh** brings OpenAI's maximum-effort reasoning to bear, just weeks after its surprise back-to-back release alongside GPT-5.3. **Claude Opus 4.6** remains the coding benchmark to beat. And then there's **Gemma 4 27B**, Google's brand-new open-weight model released just three days ago (April 2), claiming "byte for byte, the most capable open models" under an Apache 2.0 license. A proprietary heavyweight, an OpenAI flagship, Anthropic's coding specialist, and an open-source upstart. Let's see where the chips fall.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 9.1 | **9.4** | 8.8 | **9.12** |
| GPT-5.4 XHigh | 9.0 | 9.2 | 8.5 | **8.93** |
| Claude Opus 4.6 | **9.3** | 8.9 | 8.7 | **9.01** |
| Gemma 4 27B | 8.4 | 8.7 | **9.0** | **8.62** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall crown today with dominant reasoning performance and strong coding scores — a model that seems built for exactly this kind of analytical evaluation. Claude Opus 4.6 wins coding outright, continuing its streak as the developer's go-to, but couldn't match Google's depth on the reasoning task. GPT-5.4 XHigh was solid across the board but its characteristic latency penalty (XHigh mode is thorough but slow) kept it from winning any single category. The real story is Gemma 4 27B: three days old, fully open-weight under Apache 2.0, and it **won tool-use outright** with blazing-fast parallel function calling that embarrassed models costing 20x more. If this is what Google's open-source program delivers at 27B parameters, the proprietary model teams should be nervous.

---

## Task 1: Coding — Concurrent Rate Limiter with Sliding Window

**Prompt:** *"Implement a sliding-window rate limiter in Rust using `tokio::sync`. Requirements: (1) Generic over any key type that's `Hash + Eq + Clone`. (2) Configurable max requests and window duration. (3) Must be safe under concurrent access (no `Mutex<VecDeque>`, use `DashMap` or similar). (4) Include a `try_acquire(&self, key: &K) -> bool` method that returns false when the key is rate-limited. (5) Write a doc comment explaining the time complexity of cleanup. Provide the full compilable code."*

```rust
use std::collections::VecDeque;
use std::hash::Hash;
use std::time::{Duration, Instant};
use tokio::sync::Mutex;
use std::collections::HashMap;

pub struct RateLimiter<K> {
    max_requests: usize,
    window: Duration,
    // Bug: uses Mutex<HashMap> — not concurrent-safe under real load
    state: Mutex<HashMap<K, VecDeque<Instant>>>,
}

impl<K: Hash + Eq + Clone> RateLimiter<K> {
    pub fn new(max_requests: usize, window: Duration) -> Self {
        Self {
            max_requests,
            window,
            state: Mutex::new(HashMap::new()),
        }
    }

    pub async fn try_acquire(&self, key: &K) -> bool {
        let mut state = self.state.lock().await;
        let now = Instant::now();
        let timestamps = state.entry(key.clone()).or_default();

        // Bug: only removes expired entries from the front,
        // doesn't handle clock skew or out-of-order timestamps
        while let Some(&front) = timestamps.front() {
            if now.duration_since(front) > self.window {
                timestamps.pop_front();
            } else {
                break;
            }
        }

        if timestamps.len() < self.max_requests {
            timestamps.push_back(now);
            true
        } else {
            false
        }
    }
}
```

### What Great Looked Like

A full refactor replacing `Mutex<HashMap>` with `DashMap<K, VecDeque<Instant>>`, proper generic bounds, correct sliding-window cleanup with O(n) worst-case per key (documented), and a compilable module with imports. Bonus points for noting that `DashMap` shards internally so lock contention is per-key, not global.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 4.0 | 2.6 | 2.7 | **9.3** |
| Gemini 3.1 Pro Preview | 3.8 | 2.7 | 2.6 | **9.1** |
| GPT-5.4 XHigh | 3.8 | 2.4 | 2.8 | **9.0** |
| Gemma 4 27B | 3.5 | 2.6 | 2.3 | **8.4** |

### Why Claude Opus 4.6 Won

Opus 4.6 immediately identified the core problem — `Mutex<HashMap>` serializes all keys, defeating the purpose of a concurrent rate limiter — and replaced it with `DashMap` without being asked. The generic bounds were spot-on (`K: Hash + Eq + Clone + Send + Sync`), the doc comment correctly stated O(w) cleanup where w is the window size per key, and it included a `#[cfg(test)]` module with a concurrent stress test using `tokio::spawn`. Gemini 3.1 Pro Preview produced nearly identical code but missed the `Send + Sync` bounds on the first pass, adding them only in a follow-up. GPT-5.4 XHigh was thorough (it explained *why* DashMap shards) but its response was 2x longer than needed and materially slower. Gemma 4 27B got the DashMap swap right but fumbled the cleanup logic — it used `retain()` instead of draining from the front, which changes the time complexity characteristics.

---

## Task 2: Reasoning — Designing a Multi-Region Database Failover Strategy

**Prompt:** *"You run a SaaS platform with 10M users. Your primary database is PostgreSQL in us-east-1 with a read replica in eu-west-1 (200ms replication lag). Your secondary is a CockroachDB cluster spanning 3 regions. You need to design a failover strategy that: (1) guarantees no data loss for committed transactions, (2) recovers within 30 seconds of primary failure, (3) handles split-brain scenarios, and (4) supports graceful rollback if the failover was a false alarm. You have 15 minutes of WAL backlog. Walk through the exact sequence of events during a failover, including what happens to in-flight transactions. Justify every decision."*

### What Great Looked Like

A step-by-step failover runbook: detection → fencing → promotion → client rerouting → reconciliation. Clear handling of in-flight transactions (rollback vs. replay). Split-brain prevention via STONITH or fencing tokens. Graceful rollback path with WAL replay. Trade-offs stated explicitly (e.g., 200ms of potential data loss in replication lag window vs. zero-loss with synchronous commit).

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.9 | 2.7 | 2.8 | **9.4** |
| GPT-5.4 XHigh | 3.8 | 2.5 | 2.9 | **9.2** |
| Claude Opus 4.6 | 3.7 | 2.5 | 2.7 | **8.9** |
| Gemma 4 27B | 3.5 | 2.6 | 2.6 | **8.7** |

### Why Gemini 3.1 Pro Preview Won

This is Gemini 3.1 Pro's home turf — complex, multi-system reasoning with real infrastructure constraints. It produced a detailed runbook with exact timing: T+0s detection via health check failure, T+2s fencing of the old primary (pg_isready + iptables DROP), T+5s promotion of eu-west-1 replica with `pg_ctl promote`, T+8s DNS update via Route53 with 30s TTL override, T+15s CockroachDB begins dual-write verification. Critically, it addressed the 200ms replication lag window honestly: transactions committed on the primary but not yet replicated will be recovered from the WAL backlog during reconciliation, but any that didn't make it to WAL are lost — and it proposed enabling synchronous commit for tier-1 data as a mitigation. GPT-5.4 XHigh's answer was arguably more thorough on split-brain (it designed a custom fencing token system), but went overboard on theory when PostgreSQL's built-in fencing mechanisms are sufficient. Claude Opus 4.6 wrote clean, readable prose but skipped the in-flight transaction handling. Gemma 4 27B gave a competent answer that would pass a senior engineer interview but lacked the precision on timing and rollback paths that separated the top two.

---

## Task 3: Tool-Use — Competitive Pricing Intelligence Pipeline

**Prompt:** *"I sell wireless earbuds on Amazon. Find the top 5 best-selling wireless earbuds on Amazon right now (by BSR in the Electronics category). For each, get: (1) current price, (2) star rating and review count, (3) the 3 most recent 1-star reviews with complaints, and (4) whether it has Amazon's Choice badge. Compile this into a structured comparison. Then identify the most common complaint across all products and suggest a feature positioning angle based on the gap."*

### What Great Looked Like

The model autonomously searches Amazon, identifies top products by BSR, fetches individual product pages for details, extracts review data without hallucinating, and synthesizes actionable competitive intelligence — all in minimal tool round-trips.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemma 4 27B | 3.7 | 3.0 | 2.3 | **9.0** |
| Claude Opus 4.6 | 3.6 | 2.6 | 2.5 | **8.7** |
| Gemini 3.1 Pro Preview | 3.6 | 2.5 | 2.7 | **8.8** |
| GPT-5.4 XHigh | 3.5 | 2.2 | 2.8 | **8.5** |

### Why Gemma 4 27B Won

This is the upset of the day. Gemma 4 27B — an open-weight model you can run on a single GPU — beat every proprietary model at tool orchestration. It fired off parallel product page fetches immediately, correctly parsed BSR rankings from Amazon's Best Sellers page, then batched review fetches in a single pass. The speed was remarkable: 3.0 on speed is the highest any model scored today, driven by Gemma's fast inference at 27B parameters. The competitive analysis was solid — it identified "Bluetooth connectivity drops" as the most common 1-star complaint across 4 of 5 products and suggested a positioning angle around "rock-solid Bluetooth 5.4 with dual-device connectivity." Where it lost points was clarity: the output formatting was inconsistent (mixed markdown tables and bullet lists), and one product's review count was slightly off. But for speed-to-insight, it was unmatched. Gemini 3.1 Pro Preview was more polished and accurate, but took a sequential approach that cost it 2 extra round-trips. GPT-5.4 XHigh over-reasoned every step, re-verifying data it had already collected. Claude Opus 4.6 was reliable but conservative — it double-checked each product page individually rather than batching.

---

## Bottom Line

Three days after Gemma 4's release, the landscape already looks different. Gemini 3.1 Pro Preview is the reasoning king right now — it earned the #1 spot on Artificial Analysis honestly, and our eval confirms it. Claude Opus 4.6 continues to own coding; if you're writing Rust or TypeScript, start here. GPT-5.4 XHigh remains the "explain everything twice" model — brilliant but slow, perfect when you need exhaustive analysis and don't mind waiting. But the headline is Gemma 4 27B winning tool-use against three of the most expensive proprietary models on the planet. Open-weight isn't just catching up — in specific categories, it's pulling ahead. At Apache 2.0 licensing and self-hostable inference costs, Gemma 4's win today might be the most significant data point of the week.
