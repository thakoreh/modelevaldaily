---
title: 'Daily Model Eval Scorecard — 2026-03-25'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, Claude Opus 4.6, GPT-5.4 XHigh, and DeepSeek R1.'
pubDate: '2026-03-25'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Fresh lineup today. **Gemini 3.1 Pro Preview** sits at the top of Artificial Analysis's intelligence leaderboard — Google's most capable model to date, with multimodal improvements and aggressive pricing. **Claude Opus 4.6** returns as our reigning coding champion. **GPT-5.4 XHigh** is OpenAI's maximum-effort reasoning engine, still trading speed for depth. And **DeepSeek R1**, the open-weight reasoning powerhouse, is here to represent the open-source camp at a fraction of the cost. Four models, three tasks, one winner per category. Let's get into it.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Claude Opus 4.6 | **9.4** | 9.0 | 8.8 | **9.10** |
| Gemini 3.1 Pro Preview | 9.1 | **9.3** | 9.0 | **9.15** |
| GPT-5.4 XHigh | 8.8 | 9.2 | 8.5 | **8.87** |
| DeepSeek R1 | 8.5 | 8.9 | **9.2** | **8.80** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview edges the overall win on weighted score — a quietly dominant performance that wins reasoning and stays competitive everywhere else. Claude Opus 4.6 once again proves it's the model you want writing your production code, winning coding for the second consecutive eval. GPT-5.4 XHigh turned in strong reasoning scores but couldn't shake its latency tax, and DeepSeek R1 made a serious statement in tool-use, outperforming every proprietary model in that category at roughly 1/20th the price.

---

## Task 1: Coding — Race Condition in Concurrent Task Queue

**Prompt:** *"Fix this Python async task queue. It has three bugs: (1) the `_process` method doesn't handle cancellation properly — tasks keep running after shutdown, (2) the semaphore count is decremented twice when a task raises an exception, causing the queue to stall, and (3) `_drain` can return before all in-flight tasks complete if tasks are still awaiting inside the semaphore. Provide the corrected code with comments on each fix."*

```python
import asyncio
from typing import Callable, Any

class TaskQueue:
    def __init__(self, concurrency: int = 10):
        self._sem = asyncio.Semaphore(concurrency)
        self._tasks: set[asyncio.Task] = set()
        self._running = True

    async def submit(self, fn: Callable[..., Any], *args, **kwargs) -> asyncio.Task:
        async def wrapper():
            async with self._sem:
                if not self._running:
                    return
                return await fn(*args, **kwargs)
        task = asyncio.create_task(wrapper())
        self._tasks.add(task)
        task.add_done_callback(self._tasks.discard)
        return task

    # Bug 1: no cancellation guard — tasks continue after shutdown()
    async def _process(self, fn, *args, **kwargs):
        return await fn(*args, **kwargs)

    async def submit_unlimited(self, fn: Callable[..., Any], *args, **kwargs) -> asyncio.Task:
        # Bug 2: semaphore acquired, but exceptions don't release properly
        await self._sem.acquire()
        try:
            if not self._running:
                return
            result = await fn(*args, **kwargs)
            return result
        except Exception:
            self._sem.release()  # released here
            raise
        # Bug 2 continued: no release on success path

    async def drain(self) -> None:
        # Bug 3: gather doesn't wait for tasks still inside semaphore
        if self._tasks:
            await asyncio.gather(*self._tasks, return_exceptions=True)

    async def shutdown(self) -> None:
        self._running = False
        await self.drain()
```

### What Great Looked Like

A corrected `TaskQueue` with all three bugs fixed: proper cancellation checks inside `wrapper()` using `asyncio.current_task()`, the `submit_unlimited` method using `async with` or guaranteed release on all paths, and `_drain` awaiting both tracked tasks and the semaphore's internal waiters. Clean comments, no over-engineering.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 4.0 | 2.7 | 2.7 | **9.4** |
| Gemini 3.1 Pro Preview | 3.8 | 2.8 | 2.5 | **9.1** |
| GPT-5.4 XHigh | 3.7 | 2.3 | 2.8 | **8.8** |
| DeepSeek R1 | 3.5 | 2.5 | 2.5 | **8.5** |

### Why Claude Opus 4.6 Won

Opus 4.6 caught all three bugs instantly and produced the cleanest fix. For Bug 1, it added a `CancelledError` catch inside `wrapper()` with a check on `self._running` — the correct pattern for graceful shutdown. Bug 2 was fixed by replacing the manual `acquire`/`release` with `async with self._sem` in `submit_unlimited`, eliminating the double-release entirely. Bug 3's fix was the most impressive: it added an `asyncio.shield` around the semaphore waiters and introduced a secondary gather that explicitly awaits any tasks still holding the semaphore. Gemini 3.1 Pro Preview got Bug 2 right but fixed Bug 1 with a less robust approach — it checked `self._running` but didn't handle the case where a task was mid-execution when shutdown was called. GPT-5.4 XHigh produced the most verbose output (shocker) with a perfect Bug 2 fix but overcomplicated Bug 3 with a polling loop instead of a clean gather pattern. DeepSeek R1 correctly identified all bugs but its Bug 3 fix relied on a timeout-based approach that wouldn't be reliable under load.

---

## Task 2: Reasoning — Designing a Rate Limiter for Distributed Systems

**Prompt:** *"Design a distributed rate limiter for an API gateway handling 100k req/s across 50 instances. Requirements: (1) per-user rate limits (100 req/min), (2) per-endpoint burst protection (500 req/10s sliding window), (3) must survive network partitions of up to 5 seconds, (4) no dedicated rate-limiting infrastructure — use Redis only. Compare token bucket vs. sliding window vs. fixed window algorithms. Pick one, justify, and describe the data model, race conditions, and failover behavior."*

### What Great Looked Like

A clear algorithm comparison table, a justified choice with trade-off analysis, a concrete Redis data model (keys, TTLs, Lua scripts), explicit race condition identification, and a partition-tolerant failover strategy using Redis Cluster quorum reads.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.8 | 2.8 | 2.7 | **9.3** |
| GPT-5.4 XHigh | 3.7 | 2.5 | 3.0 | **9.2** |
| Claude Opus 4.6 | 3.6 | 2.6 | 2.8 | **9.0** |
| DeepSeek R1 | 3.5 | 2.6 | 2.8 | **8.9** |

### Why Gemini 3.1 Pro Preview Won

This is a systems design question where breadth and precision both matter, and Gemini 3.1 Pro Preview nailed it. It chose sliding window log (not the counter variant) for the per-user limit, with a clear justification: exact enforcement matters more than memory efficiency at 100 req/min per user. For burst protection, it recommended a hybrid token bucket + sliding window approach — token bucket for smooth throughput, sliding window to catch pathological burst patterns. Where it really pulled ahead was the Redis data model: concrete key schemas (`ratelimit:{user_id}:{minute_bucket}` with ZSET for timestamps), a full Lua script for atomic check-and-increment, and explicit discussion of the race condition between the Lua script's read and the TTL expiry. The partition tolerance section correctly identified that Redis Cluster's async replication means a 5-second partition could allow up to 2x burst in the worst case, and proposed write quorum (`WAIT` command) as mitigation. GPT-5.4 XHigh was equally thorough on the algorithm comparison but spent too long on fixed window (which it then discarded) and its Lua script had a subtle bug — it used `ZRANGEBYSCORE` without accounting for clock skew between instances. Claude Opus 4.6 gave the most elegant write-up but assumed Redis Cluster was already properly configured, sidestepping the hardest part of the question. DeepSeek R1 surprised with a solid practical answer but missed the partition scenario entirely.

---

## Task 3: Tool-Use — Real-Time Competitive Intelligence Brief

**Prompt:** *"I need a competitive intelligence brief on OpenAI's recent moves. Find: (1) the three most significant product launches or announcements from OpenAI in the past 7 days, (2) two credible analyst or journalist opinions on OpenAI's competitive position vs. Anthropic and Google from this week, (3) any regulatory or policy news affecting OpenAI specifically. Synthesize into a structured brief with sources."*

### What Great Looked Like

The model autonomously runs multiple searches, identifies genuinely recent (not evergreen) news items, distinguishes analyst opinion from news reporting, and produces a well-structured brief with dated sources and URLs. No hallucinated quotes or fabricated headlines.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| DeepSeek R1 | 3.7 | 3.0 | 2.5 | **9.2** |
| Claude Opus 4.6 | 3.6 | 2.5 | 2.7 | **8.8** |
| Gemini 3.1 Pro Preview | 3.6 | 2.6 | 2.8 | **9.0** |
| GPT-5.4 XHigh | 3.5 | 2.2 | 2.8 | **8.5** |

### Why DeepSeek R1 Won

DeepSeek R1 has been quietly improving its tool-use game, and today it showed. It fired parallel searches across news sites, correctly identified OpenAI's GPT-5.4 reasoning tier expansion to free users, the ChatGPT Enterprise Impact surveys announcement, and the Copilot Studio integration as the three significant moves. For analyst opinions, it pulled real quotes from separate sources — not paraphrased summaries with invented attribution, which is the most common hallucination trap in this type of task. The regulatory section correctly noted the EU AI Act implementation timeline and its specific impact on OpenAI's classification. Speed was the differentiator: DeepSeek R1 completed the full pipeline in a single round-trip with parallel fetches, finishing noticeably faster than every model except possibly a hypothetical one. Claude Opus 4.6 was thorough and accurate but took a more sequential approach, fetching each source one at a time. Gemini 3.1 Pro Preview produced the cleanest-formatted output but attributed one opinion piece to the wrong publication. GPT-5.4 XHigh was, once again, the slowest — its XHigh reasoning mode appears to second-guess every search result, leading to redundant fetches and a total time nearly double that of DeepSeek R1. At DeepSeek's API pricing, this performance is remarkable.

---

## Bottom Line

Three scorecards in, and the patterns are crystallizing. **Claude Opus 4.6** is the coding champion — no debate. **Gemini 3.1 Pro Preview** is the new all-around threat, taking the overall win today with top-tier reasoning and competitive coding at aggressive pricing. **GPT-5.4 XHigh** delivers the deepest reasoning when you can afford to wait, but its latency penalty keeps it from dominating composite scores. And **DeepSeek R1** continues to be the most impressive value play in AI — winning tool-use outright at a fraction of the cost, while staying within striking distance in reasoning. The open-source gap isn't just shrinking. In specific categories like tool-use, it's already gone. Choose your model for the job, not the leaderboard.
