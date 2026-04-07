---
title: 'Daily Model Eval Scorecard — 2026-04-07'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 XHigh, Gemma 4, and Qwen 3.5.'
pubDate: '2026-04-07'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Google's **Gemini 3.1 Pro Preview** sits atop the Artificial Analysis intelligence index this week, dethroning last month's leaders with a blend of deep reasoning and multimodal fluency. **GPT-5.4 XHigh** remains OpenAI's surgical instrument — crank the reasoning effort to maximum and watch it methodically dismantle complex tasks, albeit slowly. **Gemma 4**, fresh off its Apache 2.0 release on April 2nd, is Google's open-weight champion with thinking capabilities that punch well above its weight class. And **Qwen 3.5** from Alibaba continues to prove that open-weight models can hang with the proprietary elite, especially on throughput-sensitive workloads. Four models, three tasks, one winner per category. Let's see how it shook out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | **9.4** | 9.3 | 8.8 | **9.20** |
| GPT-5.4 XHigh | 9.1 | **9.6** | 8.6 | **9.12** |
| Gemma 4 | 8.8 | 9.0 | 8.4 | **8.77** |
| Qwen 3.5 | 8.7 | 8.6 | **9.2** | **8.80** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall crown today with dominant coding performance and strong reasoning — its 125 tokens/s output speed means it doesn't sacrifice velocity for intelligence. GPT-5.4 XHigh continues to own the reasoning category outright; when you need a model to think through a maze of constraints, nothing else comes close, but its latency penalty showed in tool-use and coding speed. The surprise is Qwen 3.5 edging out Gemma 4 on weighted total purely through tool-use dominance — its API orchestration speed is unmatched, making it the best open-weight option for agentic pipelines. Gemma 4, despite being just five days old, showed remarkably mature reasoning for an open-weight model and nearly matched GPT-5.4's depth on the infrastructure task. For teams that can't send data to proprietary APIs, Gemma 4 is now the one to beat.

---

## Task 1: Coding — Concurrent Task Scheduler with Deadlock Detection

**Prompt:** *"Implement a Rust async task scheduler that: (1) accepts tasks with dependencies (DAG edges), (2) detects cycles at submission time and returns a `CycleError`, (3) schedules independent tasks concurrently using a bounded semaphore (max 4 concurrent), and (4) returns results in topological order. Provide the full implementation with tests for: a diamond dependency graph, a cycle detection case, and a max-concurrency enforcement check."*

```rust
use std::collections::{HashMap, HashSet, VecDeque};
use tokio::sync::Semaphore;
use std::sync::Arc;

struct TaskScheduler<T: Clone + Send + 'static> {
    tasks: HashMap<String, Box<dyn Fn() -> T + Send + Sync>>,
    deps: HashMap<String, HashSet<String>>,
    semaphore: Arc<Semaphore>,
}

enum ScheduleError {
    CycleError(String),
    MissingDependency(String),
}
```

### What Great Looked Like

A complete implementation with Kahn's algorithm for topological sort, cycle detection via in-degree tracking at submission time, semaphore-bounded concurrency, proper error types, and three meaningful tests. Bonus points for handling edge cases like self-dependencies and disconnected components.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 4.0 | 2.8 | 2.6 | **9.4** |
| GPT-5.4 XHigh | 3.9 | 2.4 | 2.8 | **9.1** |
| Gemma 4 | 3.7 | 2.7 | 2.4 | **8.8** |
| Qwen 3.5 | 3.6 | 2.6 | 2.5 | **8.7** |

### Why Gemini 3.1 Pro Preview Won

Gemini 3.1 nailed all three requirements on the first pass. The cycle detection used Kahn's algorithm at submission time (not runtime), returning a descriptive `CycleError` with the offending edge. The semaphore implementation correctly bounded concurrency to 4 and the test for max-concurrency used an atomic counter to verify no more than 4 tasks ran simultaneously. Where it pulled ahead was the topological order guarantee — results were collected via `JoinHandle` ordering, not task completion order, which is a subtle but critical distinction most models miss. GPT-5.4 XHigh produced equally correct code but its XHigh reasoning mode added 3x latency for a coding task that didn't need that depth. Gemma 4's implementation was solid but the concurrency test was flaky (used `tokio::time::sleep` for timing instead of counting active permits). Qwen 3.5 had the fastest output but missed the self-dependency edge case in cycle detection.

---

## Task 2: Reasoning — Multi-Region Database Failover Under Cost Constraints

**Prompt:** *"You run a SaaS platform with 10k customers across 3 AWS regions (us-east-1, eu-west-1, ap-southeast-1). Each region has a primary Aurora PostgreSQL cluster and a read replica. Your monthly database budget is $18,000. Last quarter, us-east-1 had two 45-minute outages. Your VP wants 'zero downtime' without increasing spend. Design a failover strategy that: (1) stays within budget, (2) minimizes RTO and RPO, (3) handles the us-east-1 reliability problem specifically, and (4) accounts for GDPR data residency for EU customers. Justify every architectural decision."*

### What Great Looked Like

A concrete failover plan with per-region cost breakdowns, a specific strategy for us-east-1's reliability issues, clear GDPR-compliant routing rules, RTO/RPO targets with justification, and a frank assessment of what "zero downtime" actually means within the budget constraint.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 4.0 | 2.5 | 3.1 | **9.6** |
| Gemini 3.1 Pro Preview | 3.8 | 2.7 | 2.8 | **9.3** |
| Gemma 4 | 3.7 | 2.5 | 2.8 | **9.0** |
| Qwen 3.5 | 3.5 | 2.5 | 2.6 | **8.6** |

### Why GPT-5.4 XHigh Won

This is GPT-5.4 XHigh's home turf — multi-constraint reasoning with real-world infrastructure consequences. It opened with a cost breakdown showing exactly how the $18k splits across regions ($7.2k us-east-1, $5.8k eu-west-1, $5k ap-southeast-1) and identified that the real solution isn't more infrastructure but better failover routing. The us-east-1 strategy: promote ap-southeast-1 as the secondary writer for APAC + Americas failover (not eu-west-1, which would violate GDPR if EU customer data routes through it during failover). It explicitly called out that "zero downtime" within $18k is a myth — you can get to ~30s RTO with Aurora Global Database, but true zero requires multi-region active-active with conflict resolution, which blows the budget. The GDPR section was precise: EU customer data stays pinned to eu-west-1 with no cross-region replication, even during failover (EU customers accept degraded performance during an EU outage rather than data leaving the region). Gemini 3.1 Pro Preview was close but didn't explicitly cost out each region. Gemma 4 gave a surprisingly thoughtful GDPR analysis that caught nuances even GPT-5.4 missed (like audit trail requirements during failover events), but its failover sequencing was vaguer. Qwen 3.5's answer was correct but generic — it read like a rephrased AWS best practices doc.

---

## Task 3: Tool-Use — Competitive Pricing Intelligence Pipeline

**Prompt:** *"I sell a SaaS product at $49/mo (Pro tier). Find 5 competing products in the project management space with similar feature sets. For each, extract: pricing (monthly and annual), free tier details, key feature differences vs. my $49 tier, and their G2 rating. Compile into a comparison table with a final recommendation on whether I should adjust my pricing."*

### What Great Looked Like

The model autonomously identifies relevant competitors (not just the biggest names but actual feature-comparable ones), fetches current pricing from official sources, extracts G2 ratings from review pages, flags which competitors have changed pricing recently, and provides an actionable pricing recommendation backed by the data.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Qwen 3.5 | 3.8 | 2.9 | 2.5 | **9.2** |
| Gemini 3.1 Pro Preview | 3.7 | 2.6 | 2.5 | **8.8** |
| GPT-5.4 XHigh | 3.6 | 2.2 | 2.8 | **8.6** |
| Gemma 4 | 3.3 | 2.6 | 2.5 | **8.4** |

### Why Qwen 3.5 Won

Tool-use throughput is Qwen 3.5's superpower. It fired off 8 parallel searches in under 2 seconds, identified Monday.com, Asana, ClickUp, Notion, and Teamwork as the five closest competitors (skipping Jira and Basecamp, which it correctly flagged as serving different market segments). Pricing data was pulled from official pricing pages, not cached summaries. Where it really shined: it caught that ClickUp had quietly raised its Unlimited plan from $7 to $12/user/mo the previous week, a change the other models missed. The G2 ratings matched current listings (not training data), and the final recommendation — "hold at $49, your pricing is competitive with the mid-tier players, but consider adding an annual discount to match Asana's 10% annual savings hook" — was specific and actionable. Gemini 3.1 Pro Preview did everything right but sequentially rather than in parallel, costing it 4x the latency. GPT-5.4 XHigh over-researched, fetching 15 sources when 8 would do, and its final recommendation was hedged with too many caveats. Gemma 4 struggled most here — it returned stale pricing for two competitors and missed the ClickUp price change entirely, a common weakness for models with older training cutoffs in fast-moving pricing landscapes.

---
