---
title: 'Coding Benchmark: Fixing a Pagination Bug'
description: 'A real, production-style bug-fix eval with rubric, diffs, and operator takeaways across 5 frontier models.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

Pagination bugs are boring until they ship to prod. This one's a classic off‑by‑one error that causes page 2+ to skip items. We used it as a **single‑task coding eval** because it's small, real, and highlights whether a model understands stateful APIs, indexing, and defensive coding.

This is **not** a leaderboard. It's one task, scored with a rubric. The goal is to capture *how a model thinks under real engineering constraints*.

## The prompt
```
You are given a Node/Express endpoint that returns paginated results. Users report missing items on page 2+. Identify the bug and provide a code diff.

app.get('/items', async (req, res) => {
  const page = Number(req.query.page || 1)
  const limit = Number(req.query.limit || 20)
  const offset = page * limit
  const items = await db.items.findMany({ skip: offset, take: limit })
  res.json({ items })
})
```

## Rubric (10 points)
- **4 pts** — Correctly identifies the bug: `offset` should be `(page - 1) * limit`.
- **3 pts** — Provides a concrete patch (diff or corrected snippet).
- **3 pts** — Mentions validation/guardrails (invalid page/limit, max cap, etc.).

## Results (single‑task eval)

| Model | Score | Notes |
| --- | --- | --- |
| 5.3‑Codex‑Spark | 9.6 | Cleanest diff + best guardrails. Top choice for code clarity. |
| Claude Opus 4.6 | 9.4 | Correct fix + thorough validation, slightly verbose. |
| Kimi K2.5 | 8.9 | Fix correct, good explanation, minor style issues. |
| MiniMax M2.5 | 8.7 | Correct fix, adequate guardrails. |
| GLM‑5 | 8.5 | Fix is correct, but skipped some guardrails. |

## What "great" looked like

A strong answer **fixes the math** and **hardens the endpoint** without overengineering.

**Corrected snippet**:
```js
const page = Math.max(1, Number(req.query.page || 1))
const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)))
const offset = (page - 1) * limit
const items = await db.items.findMany({ skip: offset, take: limit })
```

## Operator analysis

**Why this task matters:** Pagination bugs are easy to miss in code review and cause silent data loss. A strong model:
- spots the off‑by‑one immediately,
- gives you the exact fix,
- and suggests guardrails you'd implement in real production APIs.

**What separated the top answer:** clarity + defensiveness. 5.3‑Codex‑Spark scored highest because it paired the fix with the cleanest diff and comprehensive guardrails without extra noise. Claude Opus 4.6 was more thorough but slightly longer than needed.

## How this fits broader benchmarks

We anchor our internal evals against public benchmarks:
- **SWE‑bench** measures bug‑fixing on real GitHub issues. [SWE‑bench Leaderboards](https://www.swebench.com/)
- **HumanEval** is a classic code generation benchmark. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **Chatbot Arena** for crowd‑sourced quality ratings. [Chatbot Arena](https://lmarena.ai/)

Our task mirrors the *shape* of SWE‑bench problems but is intentionally smaller so we can evaluate reasoning quickly.

## Takeaways for builders

- **Best for crisp diffs:** 5.3‑Codex‑Spark led this task.
- **Best for thoroughness:** Claude Opus 4.6 adds extra context and validation.
- **Best value:** Kimi K2.5 delivers near‑top quality at a lower price point.

**Related:** full cross‑task summary in the [daily scorecard](/blog/2026-02-12-model-eval-scorecard/).
