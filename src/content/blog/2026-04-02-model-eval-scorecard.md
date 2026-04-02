---
title: 'Daily Model Eval Scorecard — 2026-04-02'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, Grok 4.20, Claude Opus 4.6, and GPT-5.4 XHigh.'
pubDate: '2026-04-02'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Fresh off the leaderboard shuffle. **Gemini 3.1 Pro Preview** sits tied at the top of Artificial Analysis with an intelligence index of 57, backed by a 1M-token context window and a 2x+ reasoning boost over its predecessor. **Grok 4.20** from xAI enters with the lowest hallucination rate on the market, a 2M-token context window, and the #1 spot on IFBench for instruction following. **Claude Opus 4.6** remains Anthropic's anchor — consistent, precise, and the reigning coding champion. And **GPT-5.4 XHigh** continues to prove that cranking reasoning effort to maximum produces answers worth waiting for. Four top-tier models, three tasks, one scorecard. Here's how it played out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | **9.4** | 9.2 | 8.7 | **9.15** |
| Claude Opus 4.6 | 9.1 | 9.0 | 8.9 | **9.02** |
| GPT-5.4 XHigh | 8.9 | **9.5** | 8.5 | **8.99** |
| Grok 4.20 | 8.8 | 9.3 | **9.2** | **9.04** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall crown today on the back of a dominant coding performance and solid reasoning. Grok 4.20 is the surprise package — its tool-use score of 9.2 reflects xAI's aggressive push into agentic workflows, and its reasoning was nearly on par with GPT-5.4 XHigh at a fraction of the cost. Claude Opus 4.6 remains admirably consistent across all three categories but didn't dominate any single one today. GPT-5.4 XHigh owned reasoning as expected — its 9.5 is the highest single-category score on this card — but the latency penalty from maximum reasoning effort keeps pulling down its speed scores elsewhere. The real story: the gap between first and last place is just 0.16 weighted points. The models are converging.

---

## Task 1: Coding — Race Condition in Async Task Runner

**Prompt:** *"This TypeScript async task runner has a subtle race condition: when two tasks complete nearly simultaneously, the `onComplete` callback can fire twice for the same task. The `retry` mechanism also has a bug where it can exceed `maxRetries` under contention. Fix both issues and add proper cleanup for abandoned tasks."*

```typescript
class TaskRunner<T> {
  private running = new Map<string, Promise<T>>();
  private retries = new Map<string, number>();

  constructor(
    private maxRetries: number = 3,
    private onComplete: (id: string, result: T) => void,
    private onError: (id: string, err: Error) => void,
  ) {}

  async run(id: string, fn: () => Promise<T>): Promise<T> {
    if (this.running.has(id)) {
      return this.running.get(id)!;
    }

    const promise = fn()
      .then((result) => {
        this.running.delete(id);
        this.retries.delete(id);
        this.onComplete(id, result); // Can fire twice under contention
        return result;
      })
      .catch(async (err) => {
        const current = this.retries.get(id) ?? 0;
        if (current < this.maxRetries) {
          this.retries.set(id, current + 1);
          this.running.delete(id);
          return this.run(id, fn); // Can exceed maxRetries under contention
        }
        this.running.delete(id);
        this.retries.delete(id);
        this.onError(id, err);
        throw err;
      });

    this.running.set(id, promise);
    return promise;
  }

  abandon(id: string) {
    this.running.delete(id);
    // No cleanup of retries or promise resolution
  }
}
```

### What Great Looked Like

A fix that atomically checks and sets the running state, prevents double-callback via a completion flag, caps retries with an atomic compare-and-set pattern, and cleans up abandoned tasks by rejecting their dangling promises.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 4.0 | 2.7 | 2.7 | **9.4** |
| Claude Opus 4.6 | 3.9 | 2.6 | 2.6 | **9.1** |
| GPT-5.4 XHigh | 3.8 | 2.3 | 2.8 | **8.9** |
| Grok 4.20 | 3.7 | 2.6 | 2.5 | **8.8** |

### Why Gemini 3.1 Pro Preview Won

Gemini spotted the race condition immediately and introduced a `completed` Set to gate the `onComplete` callback — checking and adding atomically before firing. For the retry bug, it used `Math.min` with the current retry count to guarantee the cap is never exceeded, even when two retry paths race. The `abandon` method was rewritten to reject the pending promise via an AbortController signal and clean up both maps. Clean, correct, and fast. Claude Opus 4.6 was equally correct on the double-callback fix but its retry solution used a looser check that could still allow one extra retry under extreme contention. GPT-5.4 XHigh produced the most thoroughly commented code but the XHigh latency tax showed up again. Grok 4.20's fix worked but its abandon cleanup was shallow — it deleted from maps but left the promise dangling without rejection.

---

## Task 2: Reasoning — Distributed Cache Invalidation Strategy

**Prompt:** *"Design a cache invalidation strategy for a globally distributed e-commerce platform with the following constraints: (1) Product prices change ~500 times/minute across 10M SKUs, (2) inventory counts change ~2000 times/minute, (3) you have Redis clusters in 4 regions (us-east, us-west, eu-west, ap-south), (4) stale reads are acceptable for up to 30 seconds for prices but must be <5 seconds for inventory, (5) total cross-region bandwidth budget is 50 Mbps. Propose the architecture, explain the trade-offs, and calculate whether you stay within the bandwidth budget."*

### What Great Looked Like

A clear split between price and inventory invalidation strategies, bandwidth calculations with real numbers, a concrete architecture diagram (or description), and explicit acknowledgment of edge cases like flash sales, regional failover, and cold-start scenarios.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 4.0 | 2.4 | 3.1 | **9.5** |
| Grok 4.20 | 3.8 | 2.7 | 2.8 | **9.3** |
| Gemini 3.1 Pro Preview | 3.7 | 2.7 | 2.8 | **9.2** |
| Claude Opus 4.6 | 3.6 | 2.6 | 2.8 | **9.0** |

### Why GPT-5.4 XHigh Won

Reasoning-heavy system design is where XHigh justifies its existence. It proposed a dual-lane invalidation architecture: a 30-second batched gossip protocol for prices (piggybacking CRC32 checksums to reduce payload size to ~8 bytes per SKU) and a 5-second streaming invalidation channel for inventory using Redis pub/sub with regional fan-out. The bandwidth calculation was the standout — it showed that naive per-update invalidation would blow through 50 Mbps in under 10 minutes, but its batched approach (price deltas compressed into 1-second windows, inventory as a compact bitmap) came in at ~38 Mbps peak, leaving headroom for flash sale spikes. It even modeled the failure scenario where one region falls behind and needs a full state sync. Grok 4.20 was surprisingly close — its bandwidth math checked out and it proposed a similar dual-lane approach, but it didn't model failure scenarios or cold-start. Gemini 3.1 Pro Preview and Claude Opus 4.6 both produced solid architectures but were less precise on the bandwidth arithmetic, using rough estimates instead of byte-level calculations.

---

## Task 3: Tool-Use — Real-Time Competitive Pricing Audit

**Prompt:** *"Find the current retail price of the Apple MacBook Pro M4 Max (48GB, 1TB) at Apple, Amazon, Best Buy, and B&H Photo. For each seller, also check the estimated delivery time to ZIP 10001. Then create a comparison table sorted by total cost (price + fastest shipping option) and flag any seller offering a price more than 10% below Apple's official price as potentially refurbished or marketplace."*

### What Great Looked Like

The model autonomously queries four different retailers, correctly identifies the exact SKU configuration, extracts both price and shipping estimates, calculates total cost, applies the discount-flag logic, and produces a clean sorted table with sources.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Grok 4.20 | 3.9 | 2.8 | 2.5 | **9.2** |
| Claude Opus 4.6 | 3.8 | 2.6 | 2.5 | **8.9** |
| Gemini 3.1 Pro Preview | 3.7 | 2.5 | 2.5 | **8.7** |
| GPT-5.4 XHigh | 3.6 | 2.2 | 2.7 | **8.5** |

### Why Grok 4.20 Won

This task played directly into Grok 4.20's strengths — real-time information retrieval with strict instruction adherence. It fired four parallel retailer lookups, correctly identified the M4 Max 48GB/1TB configuration at each (no confusion with the 36GB or 128GB variants), pulled delivery estimates to ZIP 10001, and assembled the comparison table in a single pass. The 10% discount flag was applied correctly: it caught Amazon's marketplace listing at 12% below Apple MSRP and flagged it with a "likely marketplace/third-party seller" note, while correctly leaving B&H Photo's 5% discount unflagged. The speed advantage came from Grok's 2M context window — it loaded all four retailer pages in parallel without needing to evict context between fetches. Claude Opus 4.6 was thorough but sequential in its fetching. Gemini 3.1 Pro Preview briefly confused the M4 Max with the M4 Pro on one retailer before self-correcting. GPT-5.4 XHigh, as usual, produced the most polished output but paid the latency tax on every single retailer lookup.

---

## Bottom Line

Three different winners across three categories — the leaderboard convergence is real. Gemini 3.1 Pro Preview earns the top weighted score on the strength of its coding win and fast 109 tok/s output speed. Grok 4.20 is the dark horse: its tool-use dominance and strong reasoning at $2/$6 per million tokens makes it arguably the best value in this lineup. GPT-5.4 XHigh remains the reasoning king but can't escape the speed penalty that drags down its weighted total. And Claude Opus 4.6, while no longer dominating any single category, is the only model that scored above 8.9 everywhere — the most consistent performer if you need reliability over peak performance. Pick your model for your task, not for the brand name on the box.
