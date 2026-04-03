---
title: 'Daily Model Eval Scorecard — 2026-04-03'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.3 Codex, Claude Opus 4.6, and Qwen3.6-Plus.'
pubDate: '2026-04-03'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup is a clash of titans with fresh blood. **Gemini 3.1 Pro Preview** sits at the top of Artificial Analysis's intelligence index — Google's latest pushes the frontier on reasoning depth. **GPT-5.3 Codex** is OpenAI's coding-first powerhouse, purpose-built for software tasks with xhigh reasoning effort. **Claude Opus 4.6** is Anthropic's steady flagship, the model you trust with production code. And **Qwen3.6-Plus**, released just yesterday by Alibaba, is the newest entrant in the proprietary arena — built for agentic workflows and already making noise in enterprise benchmarks. Four models, three tasks, one winner per category. Let's dig in.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| GPT-5.3 Codex | **9.4** | 9.0 | 8.7 | **9.08** |
| Gemini 3.1 Pro Preview | 9.1 | **9.4** | 8.8 | **9.11** |
| Claude Opus 4.6 | 9.2 | 9.1 | 9.0 | **9.12** |
| Qwen3.6-Plus | 8.5 | 8.7 | **9.2** | **8.73** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Claude Opus 4.6 edges out the field on weighted total by being consistently excellent — second in coding, competitive in reasoning, and strong in tool-use. Gemini 3.1 Pro Preview dominated reasoning outright, living up to its #1 intelligence ranking, but couldn't quite match Claude's code quality or GPT-5.3 Codex's surgical precision on programming tasks. GPT-5.3 Codex took coding with the highest single-category score of the day (9.4), proving that a model built for code still beats generalists at their own game. The surprise? Qwen3.6-Plus, fresh off yesterday's launch, crushed tool-use with aggressive parallel execution and near-zero wasted round-trips. For a model that's been public for less than 48 hours, that's a statement.

---

## Task 1: Coding — Race Condition in a Concurrent Cache

**Prompt:** *"This Rust async cache has a race condition: two concurrent `get_or_insert` calls for the same key can both miss the cache and insert duplicate values. Fix it so that only one insert happens per key, using only `tokio::sync` primitives (no external crates). The fix should not block the entire cache — other keys must remain fully concurrent. Provide the corrected code with comments on the synchronization strategy."*

```rust
use std::collections::HashMap;
use std::hash::Hash;
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct Cache<K, V> {
    inner: Arc<Mutex<HashMap<K, V>>>,
}

impl<K: Eq + Hash + Clone, V: Clone> Cache<K, V> {
    pub fn new() -> Self {
        Self { inner: Arc::new(Mutex::new(HashMap::new())) }
    }

    pub async fn get_or_insert<F>(&self, key: K, factory: F) -> V
    where
        F: FnOnce() -> V,
    {
        let mut map = self.inner.lock().await;
        if let Some(val) = map.get(&key) {
            return val.clone();
        }
        let val = factory();
        map.insert(key, val.clone());
        val
    }
}
```

### What Great Looked Like

A corrected implementation using per-key locking (e.g., a `DashMap`-style approach or a secondary lock map), ensuring only one factory invocation per key while keeping other keys fully concurrent. Clear comments explaining why the naive mutex approach serializes all access and the chosen strategy avoids it.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.3 Codex | 4.0 | 2.7 | 2.7 | **9.4** |
| Claude Opus 4.6 | 3.9 | 2.6 | 2.7 | **9.2** |
| Gemini 3.1 Pro Preview | 3.8 | 2.7 | 2.6 | **9.1** |
| Qwen3.6-Plus | 3.5 | 2.5 | 2.5 | **8.5** |

### Why GPT-5.3 Codex Won

This is Codex's home turf. It immediately identified the double-check locking pattern as insufficient in async Rust and proposed a `HashMap<K, Arc<Mutex<()>>>` lock striping approach — a secondary map of per-key mutexes that are created on demand and cleaned up after insertion. The factory only runs while holding the per-key lock, and other keys flow through completely unblocked. It also handled lock cleanup (removing the per-key mutex after insertion to prevent memory leaks) and added a `Drop` guard pattern. Claude Opus 4.6 produced a nearly identical solution but spent extra tokens on an alternative `tokio::sync::OnceCell` approach before settling on lock striping — correct but less decisive. Gemini 3.1 Pro Preview's solution was sound but its lock cleanup had a subtle edge case where a cancelled future could leave a stale lock entry. Qwen3.6-Plus got the core idea right but its implementation held the global lock slightly longer than necessary during lock-map insertion, partially defeating the concurrency goal.

---

## Task 2: Reasoning — Multi-Region Database Failover Strategy

**Prompt:** *"You run a distributed PostgreSQL service across 3 regions (us-east, eu-west, ap-south). Each region has a primary and a read replica. Your SLA requires <5s failover for writes and <200ms read latency P99. The link between us-east and ap-south has 320ms RTT with 0.1% packet loss. A network partition isolates ap-south from the other two regions. Design a failover strategy that: (1) preserves write correctness (no split-brain), (2) minimizes read latency for ap-south users during the partition, (3) recovers cleanly when the partition heals. You can use Patroni + etcd but no cloud-managed databases."*

### What Great Looked Like

A concrete failover plan with clear split-brain prevention (quorum-based), stale-read handling for the partitioned region, and a step-by-step recovery procedure. Bonus for acknowledging trade-offs between consistency and availability under the specific constraints.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.9 | 2.7 | 2.8 | **9.4** |
| Claude Opus 4.6 | 3.8 | 2.5 | 2.8 | **9.1** |
| GPT-5.3 Codex | 3.7 | 2.6 | 2.7 | **9.0** |
| Qwen3.6-Plus | 3.5 | 2.6 | 2.6 | **8.7** |

### Why Gemini 3.1 Pro Preview Won

Gemini 3.1 Pro Preview delivered the most complete answer. It proposed a 3-node etcd cluster with one node in each region, requiring 2-of-3 quorum for leader election — which means ap-south loses quorum during the partition and automatically demotes its primary to a read-only standby. For read latency, it suggested ap-south serve stale reads from its replica with a `max_standby_streaming_delay` bump during partition mode, keeping P99 under 200ms by serving from local storage. The recovery plan was explicit: on partition heal, ap-south's Patroni node rejoins etcd, re-establishes streaming replication from the current global primary, and catches up before being promoted. Where Gemini pulled ahead was addressing the 0.1% packet loss on the us-east/ap-south link — it recommended TCP keepalive tuning and a synchronous_commit=remote_apply setting for the healthy path, with a fallback to async during degraded connectivity. Claude Opus 4.6's answer was solid on split-brain prevention but hand-waved the read latency constraint during the partition. GPT-5.3 Codex focused heavily on the Patroni configuration details at the expense of the broader strategy. Qwen3.6-Plus gave a reasonable answer but didn't address the packet loss constraint at all.

---

## Task 3: Tool-Use — Competitive Pricing Intelligence Pipeline

**Prompt:** *"Find the current API pricing for the 4 most capable LLMs (by Artificial Analysis intelligence ranking). For each, look up: input price per 1M tokens, output price per 1M tokens, context window, and median output speed. Then cross-reference with 2 independent benchmarks comparing these models on coding tasks. Produce a value-ranking table (performance per dollar) with sources."*

### What Great Looked Like

The model autonomously identifies the top models from the leaderboard, fetches current pricing from official API pages, pulls benchmark data from at least two sources, and synthesizes a clear value-ranking table with proper citations. Speed and accuracy both matter — extra points for parallel fetching and avoiding redundant searches.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Qwen3.6-Plus | 3.8 | 2.8 | 2.6 | **9.2** |
| Claude Opus 4.6 | 3.7 | 2.5 | 2.8 | **9.0** |
| Gemini 3.1 Pro Preview | 3.6 | 2.6 | 2.6 | **8.8** |
| GPT-5.3 Codex | 3.5 | 2.4 | 2.8 | **8.7** |

### Why Qwen3.6-Plus Won

Qwen3.6-Plus was built for agentic workflows, and it shows. It fired off six parallel searches in the first round — pricing pages for all four models, Artificial Analysis leaderboard, and two benchmark aggregators — then synthesized everything in a single pass. Its value-ranking table was clean, with cost-per-intelligence-point calculations and both Aider Polyglot and SWE-bench Verified scores side by side. Most impressively, it correctly identified that Gemini 3.1 Pro Preview at $4.50/1M blended is the best performance-per-dollar, beating GPT-5.4 at $5.63 despite similar intelligence scores. The only ding was a minor formatting inconsistency in one source URL. Claude Opus 4.6 produced the most readable output — its table formatting and prose summary were best-in-class — but it took a sequential approach that cost precious seconds. Gemini 3.1 Pro Preview fetched accurate data but got pulled into a rabbit hole trying to find a fifth model to include before settling on four. GPT-5.3 Codex, ironically for a model named "Codex," spent too long on the benchmark cross-reference step, re-fetching pages it had already seen — its coding focus meant it over-indexed on SWE-bench and nearly missed the Aider comparison entirely.

---

## Bottom Line

Today's eval proves that the model landscape is tightening at the top. Claude Opus 4.6 takes the overall crown through sheer consistency — it never finished below second in any category. Gemini 3.1 Pro Preview earned its #1 intelligence ranking with a decisive reasoning win. GPT-5.3 Codex is the coder's model, full stop — if you're evaluating programming tasks, start here. And Qwen3.6-Plus, barely a day old, already leads in tool-use orchestration. The takeaway for builders: don't pick one model. Pick the right model for each workload, or better yet, build a router that sends coding to Codex, reasoning to Gemini, and agentic pipelines to Qwen. The era of the one-size-fits-all model is over.
