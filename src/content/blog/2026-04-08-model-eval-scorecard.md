---
title: 'Daily Model Eval Scorecard — 2026-04-08'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, Claude Opus 4.6, GPT-5.3 Codex, and Qwen 3.5.'
pubDate: '2026-04-08'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's bench brings a fresh face to the top of the leaderboard. **Gemini 3.1 Pro Preview** sits at #1 on Artificial Analysis with an Intelligence Index of 57 — tied with GPT-5.4 but at lower latency and higher throughput. **Claude Opus 4.6** remains Anthropic's flagship, combining deep understanding with methodical execution. **GPT-5.3 Codex** is OpenAI's coding-first model, purpose-built for software tasks with a 400k context window. And **Qwen 3.5** from Alibaba represents the open-weight contingent — freely available, aggressively priced, and closing the gap fast. Four models, three tasks, one winner per category. Let's see how it shook out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| GPT-5.3 Codex | **9.4** | 8.9 | 8.6 | **9.01** |
| Gemini 3.1 Pro Preview | 8.8 | **9.5** | 9.0 | **9.06** |
| Qwen 3.5 | 8.5 | 8.7 | **9.3** | **8.78** |
| Claude Opus 4.6 | 9.1 | 9.2 | 8.4 | **8.93** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall crown today, dominating reasoning and staying competitive everywhere else — a remarkable showing for a preview model. GPT-5.3 Codex won coding outright (its whole reason for existing) but its reasoning depth fell slightly short of Gemini's on a non-coding analytical task. Claude Opus 4.6 delivered consistently high-quality output across the board but its tool-use latency — the slowest in the field at 47 tokens/s — held it back from winning any single category. Qwen 3.5, the cheapest model in the lineup by far, absolutely crushed tool-use with blazing-fast parallel API orchestration. The open-weight vs. proprietary gap is now a matter of a few percentage points.

---

## Task 1: Coding — Race Condition in a Concurrent Cache

**Prompt:** *"Fix this Rust async cache implementation. It has three bugs: (1) the `get_or_insert` method has a TOCTOU race between checking and writing, (2) `evict_expired` can panic if entries are removed during iteration, and (3) the `shutdown` method doesn't wait for in-flight requests to complete, potentially dropping active handles. Provide the corrected code with comments on each fix."*

```rust
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use std::time::{Duration, Instant};

struct CacheEntry<V> {
    value: V,
    expires_at: Instant,
}

pub struct AsyncCache<K, V> {
    store: Arc<RwLock<HashMap<K, CacheEntry<V>>>>,
    ttl: Duration,
}

impl<K, V: Clone> AsyncCache<K, V>
where
    K: std::hash::Hash + Eq + Clone,
{
    pub async fn get_or_insert(&self, key: K, factory: impl FnOnce() -> V) -> V {
        let read = self.store.read().await;
        if let Some(entry) = read.get(&key) {
            if entry.expires_at > Instant::now() {
                return entry.value.clone();
            }
        }
        drop(read);

        // Bug 1: Another task can insert between the drop and this write lock
        let mut write = self.store.write().await;
        let value = factory();
        write.insert(key, CacheEntry {
            value: value.clone(),
            expires_at: Instant::now() + self.ttl,
        });
        value
    }

    pub async fn evict_expired(&self) {
        let mut write = self.store.write().await;
        // Bug 2: removing while iterating can panic with some patterns
        for (key, entry) in write.iter() {
            if entry.expires_at <= Instant::now() {
                write.remove(&key);
            }
        }
    }

    pub async fn shutdown(self) {
        // Bug 3: drops immediately without draining in-flight requests
        let _ = self.store;
    }
}
```

### What Great Looked Like

A corrected file with all three fixes: double-checked locking with re-validation after acquiring the write lock, collecting expired keys into a Vec before removal, and a graceful shutdown using a counter (or channel) to track in-flight requests with a drain timeout. Clear inline comments on each fix, plus a brief test showing concurrent inserts don't race.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.3 Codex | 4.0 | 2.8 | 2.6 | **9.4** |
| Claude Opus 4.6 | 3.9 | 2.5 | 2.7 | **9.1** |
| Gemini 3.1 Pro Preview | 3.7 | 2.6 | 2.5 | **8.8** |
| Qwen 3.5 | 3.5 | 2.6 | 2.4 | **8.5** |

### Why GPT-5.3 Codex Won

This is Codex's home turf. It immediately identified the TOCTOU race and implemented a proper double-checked locking pattern — re-reading the key inside the write lock before inserting, then only calling the factory if still absent (avoiding wasted computation). The `evict_expired` fix collected keys into a `Vec<K>` first, then drained them in a second pass. For shutdown, it added an `Arc<AtomicUsize>` in-flight counter with a tokio `watch` channel that waits for the counter to hit zero with a configurable timeout. Claude Opus 4.6 produced equally correct code but its shutdown fix used a simpler `JoinHandle` collection approach that works but is less general. Gemini 3.1 Pro Preview nailed bugs 1 and 2 but its shutdown solution was thin — it added a `tokio::time::sleep` which isn't a real drain. Qwen 3.5 caught the TOCTOU race and the iteration bug but its shutdown fix just logged a warning and dropped, missing the point entirely.

---

## Task 2: Reasoning — Optimizing a Distributed Processing Pipeline

**Prompt:** *"You run a real-time data pipeline processing 2M events/day across 3 regions (us-east, eu-west, ap-south). Each event passes through: ingest (Kafka), enrichment (calls 2 external APIs avg 120ms each), aggregation (stateful windowed sums), and output (write to Postgres). Current p99 end-to-end latency is 4.2 seconds. Your SLA requires p99 < 800ms. You can add at most 2 new infrastructure components and cannot change the enrichment API contracts. Present a phased plan with expected latency reduction at each phase. Budget: $15K/month additional spend."*

### What Great Looked Like

A phased optimization plan that correctly identifies the enrichment step as the bottleneck (~240ms per event with 2 sequential API calls), proposes concrete architectural changes within budget constraints, provides latency estimates per phase, and acknowledges what can't be fixed (third-party API latency).

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.9 | 2.6 | 3.0 | **9.5** |
| Claude Opus 4.6 | 3.8 | 2.5 | 2.9 | **9.2** |
| GPT-5.3 Codex | 3.6 | 2.5 | 2.8 | **8.9** |
| Qwen 3.5 | 3.5 | 2.7 | 2.5 | **8.7** |

### Why Gemini 3.1 Pro Preview Won

Gemini's answer was surgical. Phase 1: parallelize the two enrichment API calls using a fan-out pattern (expected reduction: 240ms → ~130ms, bringing p99 to ~2.1s). Phase 2: add a Redis cache for enrichment results with a 5-minute TTL, targeting ~60% cache hit rate on the most common enrichment lookups (expected p99: ~1.2s). Phase 3: batch Postgres writes with a 100ms micro-batch window instead of per-event inserts (expected p99: ~650ms, under SLA). It explicitly used the two new components wisely — Redis for caching and a write-ahead buffer — and stayed within the $15K budget by sizing Redis at the smallest cluster that handles the hit rate. Where it pulled ahead was the regional analysis: it correctly noted that ap-south enrichment API calls are ~40ms slower due to distance from API providers, and proposed regional cache warming as part of Phase 2. Claude Opus 4.6 gave a strong answer but was too conservative on latency estimates, hedging each phase with wide ranges. GPT-5.3 Codex approached it like a code architecture problem rather than a systems optimization, spending words on code structure instead of latency math. Qwen 3.5 was fastest to respond but its plan skipped the caching phase entirely, going straight from parallelization to batching — mathematically that doesn't close the gap to 800ms.

---

## Task 3: Tool-Use — Competitor Pricing Intelligence Report

**Prompt:** *"Find the current per-token pricing for the 3 most popular coding-focused AI models (look up Anthropic, OpenAI, and Google). Then find at least 2 independent benchmark comparisons of these models on coding tasks. Finally, produce a price-performance table showing cost per benchmark point for each model, with sources linked."*

### What Great Looked Like

The model autonomously identifies the correct coding-focused models, fetches live pricing from provider pages or aggregators, finds credible benchmark sources, normalizes scores across benchmarks for fair comparison, and produces a clean markdown table with clickable source URLs.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Qwen 3.5 | 3.8 | 3.0 | 2.5 | **9.3** |
| Gemini 3.1 Pro Preview | 3.7 | 2.7 | 2.6 | **9.0** |
| GPT-5.3 Codex | 3.5 | 2.5 | 2.6 | **8.6** |
| Claude Opus 4.6 | 3.4 | 2.4 | 2.6 | **8.4** |

### Why Qwen 3.5 Won

Tool-use is Qwen 3.5's superpower, and it showed today. It fired off five parallel searches in its first turn — pricing pages for all three providers, plus two benchmark aggregators — then synthesized everything in a single follow-up. It correctly identified Claude Sonnet 4.6, GPT-5.3 Codex, and Gemini 3.1 Pro Preview as the three coding-focused models (not generic flagships), pulled live blended pricing from Artificial Analysis and the providers' own pages, found SWE-Bench and HumanEval comparisons from two independent sources, and normalized scores into a price-per-benchmark-point table. The whole pipeline took two tool-calling rounds. Gemini 3.1 Pro Preview was equally thorough but took three rounds, re-fetching one source it had already seen. GPT-5.3 Codex produced accurate results but was oddly cautious, verifying each price twice before committing. Claude Opus 4.6 was the slowest — its sequential search strategy meant six individual tool calls where others needed two or three, and it initially grabbed Claude Opus 4.6 pricing instead of Sonnet before correcting itself on the second pass.

---

## Bottom Line

Today's eval reveals a shifting landscape. Gemini 3.1 Pro Preview's reasoning dominance is real — it sees constraints and trade-offs that others miss, and at $4.50/1M tokens with 119 tokens/s throughput, it's the efficiency king too. GPT-5.3 Codex confirms that purpose-built coding models still beat generalists at their own game, even if they sacrifice a bit elsewhere. Claude Opus 4.6 remains the most well-rounded model in existence — second place everywhere, first place nowhere today — which is either a compliment or a criticism depending on your use case. And Qwen 3.5 continues to be the value play: cheapest model in the field, fastest tool orchestrator, and improving rapidly. If you're building agentic workflows on a budget, Qwen 3.5 deserves a serious look.
