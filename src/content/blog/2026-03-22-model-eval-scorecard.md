---
title: 'Daily Model Eval Scorecard — 2026-03-22'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Claude Opus 4.6, GPT-5.4 XHigh, GLM-5 Turbo, and MiniMax 2.7.'
pubDate: '2026-03-22'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup brings together four very different philosophies. **Claude Opus 4.6** is Anthropic's flagship, betting everything on deep understanding and precise instruction-following. **GPT-5.4 XHigh** pushes OpenAI's reasoning engine to maximum effort — slower token-by-token, but systematically thorough. **GLM-5 Turbo** from Zhipu AI strips away the fat and focuses on raw throughput and tool orchestration. And **MiniMax 2.7**, the open-weight newcomer, is here to prove that you don't need a walled garden to compete. Four models, three tasks, one winner per category. Let's see how it shook out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Claude Opus 4.6 | **9.3** | 9.1 | 8.9 | **9.12** |
| GPT-5.4 XHigh | 9.0 | **9.5** | 8.7 | **9.08** |
| GLM-5 Turbo | 8.6 | 8.8 | **9.4** | **8.88** |
| MiniMax 2.7 | 8.7 | 9.0 | 8.5 | **8.73** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Claude Opus 4.6 takes the overall crown today by winning coding outright and staying competitive everywhere else. GPT-5.4 XHigh dominated reasoning — no surprise when you crank the effort dial to max — but its latency cost it in the other categories. GLM-5 Turbo made a serious case for itself in tool-use, chaining API calls with surgical precision. And MiniMax 2.7? For a model you can run yourself, it's terrifyingly close to the proprietary leaders — especially in reasoning, where it nearly matched GPT-5.4 at a fraction of the cost.

---

## Task 1: Coding — Broken Priority Queue

**Prompt:** *"Fix this TypeScript min-heap priority queue. It has three bugs: (1) the comparison is inverted, (2) `siftDown` doesn't handle the right child, and (3) `extractMin` can leave the heap in an inconsistent state when the array is empty. Provide the corrected code with comments on each fix."*

```typescript
class PriorityQueue<T> {
  private heap: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  push(val: T) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1);
  }

  private siftUp(i: number) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[i], this.heap[parent]) > 0) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  private siftDown(i: number) {
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < this.heap.length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      // Bug 2: right child never checked
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }

  extractMin(): T | undefined {
    // Bug 3: no empty guard
    const min = this.heap[0];
    const last = this.heap.pop()!;
    this.heap[0] = last;
    this.siftDown(0);
    return min;
  }
}
```

### What Great Looked Like

A corrected file with all three fixes applied, clear inline comments explaining each change, and a brief test snippet demonstrating the queue works with edge cases (empty extract, single-element, duplicate priorities).

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 4.0 | 2.6 | 2.7 | **9.3** |
| GPT-5.4 XHigh | 3.8 | 2.4 | 2.8 | **9.0** |
| MiniMax 2.7 | 3.7 | 2.6 | 2.4 | **8.7** |
| GLM-5 Turbo | 3.6 | 2.5 | 2.5 | **8.6** |

### Why Claude Opus 4.6 Won

Opus 4.6 nailed every fix on the first pass. The comparison inversion was caught immediately, the right-child check was added cleanly inside `siftDown`, and it wrote the empty-array guard with an early return plus a comment explaining why `pop()` before assignment prevents the inconsistent state. Its test snippet covered all three edge cases. GPT-5.4 produced equally correct code but took noticeably longer (XHigh reasoning on a debugging task is overkill), and MiniMax's fix for Bug 3 was technically correct but left the heap assignment order ambiguous — one of those "it works but I wouldn't ship it" situations. GLM-5 Turbo missed that the comparison function's return value semantics needed to flip for both `siftUp` *and* `siftDown`, fixing only the one flagged in the prompt.

---

## Task 2: Reasoning — Infrastructure Migration Under Constraints

**Prompt:** *"You're migrating a monolith's auth service to microservices. You have 3 months, a team of 4 engineers, and zero downtime tolerance. The current service handles: JWT signing/verification (50k req/s), session management (Redis-backed, 30k req/s), and password hashing (bcrypt, 5k req/s). You can extract at most 2 services. Which do you extract, in what order, and why? Justify trade-offs. Constraints: no new infrastructure budget, must use existing Redis cluster, team has no Kubernetes experience."*

### What Great Looked Like

A clear extraction plan identifying the two highest-ROI services to pull out, a phased timeline respecting team constraints, explicit acknowledgment of what stays monolithic and why, and a risk mitigation strategy for each phase.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 3.9 | 2.5 | 3.1 | **9.5** |
| MiniMax 2.7 | 3.6 | 2.8 | 2.6 | **9.0** |
| Claude Opus 4.6 | 3.7 | 2.5 | 2.9 | **9.1** |
| GLM-5 Turbo | 3.5 | 2.5 | 2.8 | **8.8** |

### Why GPT-5.4 XHigh Won

This is exactly the kind of problem XHigh was built for. It identified JWT verification and session management as the two services to extract (bcrypt stays with the monolith because it's CPU-bound and benefits from colocation with user data). The phased plan was textbook: shadow traffic on JWT first (stateless, easiest to dual-write), then session management (stateful but Redis already exists). Where it pulled ahead was the constraint analysis — it explicitly flagged "no K8s" as a forcing function toward Docker Compose + systemd, and budget constraints as a reason to avoid a service mesh. Every trade-off had a reason. Claude Opus 4.6 was close but spent too many words on generic migration principles instead of concrete sequencing. MiniMax 2.7's answer was surprisingly sharp on the "which services" question but thin on the timeline and risk sections. GLM-5 Turbo gave a solid answer that read more like a textbook summary than a plan.

---

## Task 3: Tool-Use — Multi-Step Web Research Pipeline

**Prompt:** *"Find the current price of NVIDIA's most recent GPU (not announced — actually shipping). Then look up 3 independent benchmark reviews comparing it to the previous generation. Finally, summarize the price-to-performance delta in a table with sources."*

### What Great Looked Like

The model autonomously searches for the product, identifies it correctly (not confusing announcements with availability), fetches multiple benchmark sources, extracts comparable metrics, and synthesizes a clean summary table with URLs.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GLM-5 Turbo | 3.8 | 2.9 | 2.7 | **9.4** |
| Claude Opus 4.6 | 3.7 | 2.6 | 2.6 | **8.9** |
| GPT-5.4 XHigh | 3.7 | 2.3 | 2.7 | **8.7** |
| MiniMax 2.7 | 3.4 | 2.6 | 2.5 | **8.5** |

### Why GLM-5 Turbo Won

Tool-use is where GLM-5 Turbo's design philosophy pays off. It fired off three parallel searches immediately, correctly identified the RTX 5090 as the current shipping flagship, then fetched benchmarks from Gamers Nexus, Hardware Unboxed, and Tom's Hardware in rapid succession. The summary table was clean, with FPS deltas, rasterization vs. ray tracing splits, and price-per-frame calculations. Most importantly, it didn't get confused by NVIDIA's "announced but not shipping" products — a trap that caught MiniMax 2.7, which initially returned the rumored RTX 5090 Ti before correcting itself. GPT-5.4 XHigh was thorough but painfully slow, re-searching multiple times as if second-guessing its own results. Claude Opus 4.6 did everything right but took a more sequential approach, costing it on speed. The difference between good and great in tool-use is how many round-trips you can eliminate, and GLM-5 Turbo simply parallelized better.

---

## Bottom Line

Today's eval reinforced a pattern we keep seeing: there is no single best model, only the best model for the job. Claude Opus 4.6 remains the coding king. GPT-5.4 XHigh earns its weight in reasoning-heavy tasks — if you can afford the latency. GLM-5 Turbo is the tool-use specialist, and at its price point, it's arguably the best value in the lineup. MiniMax 2.7 continues to impress as an open-weight model that punches well above its weight, particularly in reasoning where it nearly matched the proprietary leaders. The gap between open and closed is shrinking fast.
