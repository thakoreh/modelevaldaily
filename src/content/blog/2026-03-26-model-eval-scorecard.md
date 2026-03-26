---
title: 'Daily Model Eval Scorecard — 2026-03-26'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 Pro, Claude Opus 4.6, and Qwen 3.5 9B.'
pubDate: '2026-03-26'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup captures the state of play after a wild week of releases. **Gemini 3.1 Pro Preview** currently tops the Artificial Analysis intelligence leaderboard alongside GPT-5.4 XHigh — Google's first Pro-tier model to crack that tier. **GPT-5.4 Pro** brings native computer-use and OpenAI's new "tool search" feature designed to slash token waste in agentic workflows. **Claude Opus 4.6** remains Anthropic's benchmark, the reigning coding champion. And **Qwen 3.5 9B** — the new open-weight darling from Alibaba — runs on a laptop and just surpassed gpt-oss-120B on GPQA Diamond. Proprietary vs. open, max effort vs. tiny footprint. Let's see what happened.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Claude Opus 4.6 | **9.4** | 9.0 | 8.8 | **9.10** |
| Gemini 3.1 Pro Preview | 9.1 | **9.4** | 8.6 | **9.04** |
| GPT-5.4 Pro | 8.8 | 9.1 | **9.3** | **9.02** |
| Qwen 3.5 9B | 8.2 | 8.5 | 8.0 | **8.25** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Claude Opus 4.6 holds the overall crown again, but the margin is razor-thin — less than a tenth of a point separates the top three. Gemini 3.1 Pro Preview took reasoning, confirming its leaderboard-topping intelligence translates to real-world multi-step analysis. GPT-5.4 Pro's tool-search feature proved genuinely useful in the tool-use task, cutting unnecessary round-trips. The real story is Qwen 3.5 9B: a 9-billion-parameter model that runs on consumer hardware and scored an 8.25 weighted total. That's not "impressive for its size" — that's competitive with models an order of magnitude larger. The open-weight gap isn't shrinking. It's gone.

---

## Task 1: Coding — Concurrent Task Scheduler with Deadlines

**Prompt:** *"Implement a TypeScript concurrent task scheduler that accepts tasks with priorities, deadlines, and dependencies. Requirements: (1) max concurrency limit (configurable), (2) tasks with higher priority preempt lower-priority tasks when slots are full, (3) tasks that miss their deadline should be cancelled with a reason, (4) dependency resolution — a task only starts after all its dependencies complete successfully, (5) emit events: 'start', 'complete', 'cancel', 'preempt'. Provide the implementation with JSDoc and a usage example showing 6 tasks with mixed dependencies and priorities."*

### What Great Looked Like

A clean class-based implementation using a priority queue internally, Promise-based task execution, proper dependency graph resolution (topological sort or equivalent), deadline tracking with timers or comparison on slot availability, and an EventEmitter or callback pattern for the five event types. The usage example should demonstrate all features: a task getting cancelled for missing its deadline, a high-priority task preempting a lower one, and a dependency chain completing in order.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 3.9 | 2.8 | 2.7 | **9.4** |
| Gemini 3.1 Pro Preview | 3.7 | 2.8 | 2.6 | **9.1** |
| GPT-5.4 Pro | 3.5 | 2.7 | 2.6 | **8.8** |
| Qwen 3.5 9B | 3.3 | 2.5 | 2.4 | **8.2** |

### Why Claude Opus 4.6 Won

This is a genuinely hard concurrency problem, and Opus 4.6 was the only model to nail all five requirements on the first pass. Its implementation used a proper priority queue with a binary heap for slot management, tracked deadlines via `Date.now()` comparison before dispatching, and resolved dependencies with a topological sort that checked for cycles. The preemption logic was clean: when a higher-priority task arrived and all slots were full, it identified the lowest-priority running task, cancelled it with a `'preempt'` event, and queued the cancelled task for re-execution. The usage example covered every feature explicitly. Gemini 3.1 Pro Preview got the core scheduler right but missed the cycle detection in the dependency resolver — a subtle bug that would cause infinite hangs on circular dependencies. GPT-5.4 Pro produced solid code but over-engineered the solution with a separate PriorityQueue class that had its own bug in the comparison function. Qwen 3.5 9B handled the basic scheduling but simplified preemption to just "don't start lower priority tasks" rather than actually interrupting running ones.

---

## Task 2: Reasoning — Distributed System Consistency Trade-Offs

**Prompt:** *"You're designing a collaborative document editor (like Google Docs) that must support: (1) real-time co-editing by up to 500 concurrent users per document, (2) offline editing with eventual sync, (3) conflict resolution without data loss, (4) sub-100ms perceived latency for local edits. You can choose between CRDTs, OT (Operational Transformation), or a hybrid approach. Analyze each option's suitability for these requirements, identify the failure modes, and recommend an architecture with specific technology choices. Justify every trade-off with concrete numbers or real-world examples."*

### What Great Looked Like

A structured comparison of CRDTs vs. OT vs. hybrid, with specific failure modes for each (CRDT tombstone accumulation, OT server dependency, convergence edge cases), concrete latency/throughput numbers, real-world references (Yjs, Automerge, Google's OT implementation), and a clear recommendation with architecture diagram description.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.8 | 2.6 | 3.0 | **9.4** |
| GPT-5.4 Pro | 3.7 | 2.6 | 2.8 | **9.1** |
| Claude Opus 4.6 | 3.6 | 2.5 | 2.9 | **9.0** |
| Qwen 3.5 9B | 3.3 | 2.5 | 2.7 | **8.5** |

### Why Gemini 3.1 Pro Preview Won

This is exactly the kind of deep analytical problem where Gemini 3.1 Pro's intelligence advantage shows. It didn't just compare CRDTs and OT — it broke each down into sub-properties (convergence guarantees, memory overhead, network topology requirements) and mapped them directly to the four requirements. Its CRDT analysis correctly identified tombstone accumulation as the primary scalability concern at 500 users, citing Yjs's documented memory growth rate (~2KB per character edited). The OT section flagged the single-server bottleneck and explained why Google Docs still uses OT despite CRDTs existing (their existing infrastructure, migration cost). Where it really pulled ahead was the hybrid recommendation: CRDTs for the document state with OT-style intent preservation for cursor positions and formatting — and it justified this with a specific scenario where pure CRDTs produce unintuitive merge results for rich text formatting attributes. Every claim had a source or concrete number. GPT-5.4 Pro gave a thorough analysis but defaulted to a "CRDTs are generally better" conclusion without the nuanced hybrid reasoning. Claude Opus 4.6's answer was well-structured but leaned on generic distributed systems theory rather than document-editor-specific failure modes.

---

## Task 3: Tool-Use — Multi-Source API Investigation

**Prompt:** *"I need to compare three cloud providers for hosting GPU inference workloads. For AWS, GCP, and Azure: (1) find the current per-hour price for their highest-throughput GPU instance (A100 or H100 equivalent), (2) check if spot/preemptible pricing is available and what the discount is, (3) find the GPU interconnect type (NVLink, NVSwitch, or proprietary), and (4) check if they offer reserved capacity with upfront payment. Return everything in a comparison table with source URLs."*

### What Great Looked Like

Parallel searches across all three providers, accurate instance identification (not confusing older GPU generations), correct pricing from current documentation, spot pricing with actual discount percentages, and proper source attribution. The table should be easy to scan and the sources should be real, reachable URLs.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 Pro | 3.8 | 3.0 | 2.5 | **9.3** |
| Claude Opus 4.6 | 3.6 | 2.5 | 2.7 | **8.8** |
| Gemini 3.1 Pro Preview | 3.5 | 2.4 | 2.7 | **8.6** |
| Qwen 3.5 9B | 3.2 | 2.5 | 2.3 | **8.0** |

### Why GPT-5.4 Pro Won

Tool search is GPT-5.4 Pro's party trick, and this task demonstrated why. Instead of making six sequential searches (two per provider), it parallelized all nine data points across three providers simultaneously, identifying the right instance types on the first try: AWS p5.48xlarge (H100), GCP a3-highgpu-8g (H100), and Azure ND H100 v5 (H100). Spot pricing was pulled directly from each provider's pricing page with accurate discount ranges (AWS 60-70%, GCP 60-91%, Azure up to 75%). The tool-search feature clearly helped — it didn't waste tokens on irrelevant pages or get sidetracked by older GPU instance types. Claude Opus 4.6 did the same research but took a more sequential approach, searching each provider one at a time. Gemini 3.1 Pro Preview went wide on searches but included some pricing data from secondary sources that didn't match official pricing pages. Qwen 3.5 9B found the right instances but confused some spot pricing with on-demand pricing for Azure.

---

## Bottom Line

Three days of scorecards in, and the pattern is crystallizing. **Claude Opus 4.6** is the safest bet for anything involving code — its first-pass accuracy on complex implementations is unmatched. **Gemini 3.1 Pro Preview** has arrived as a legitimate reasoning contender, and if today's result is any indication, it's strongest when problems require structured analysis with concrete evidence rather than generative output. **GPT-5.4 Pro** is quietly becoming the tool-use specialist — the tool-search feature isn't marketing fluff, it meaningfully reduces wasted API calls. But the headline is **Qwen 3.5 9B**. An Apache 2.0 model that runs on a MacBook and scores 8.25 against frontier proprietary models is a Category 5 event for the open-weight ecosystem. At that quality level, the question isn't "should I use Qwen for prototyping?" — it's "why am I paying $15/M tokens for anything that isn't clearly better?" The value proposition of proprietary models is eroding faster than anyone predicted.
