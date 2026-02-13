---
title: 'Coding Benchmark: Fixing a Pagination Bug'
description: 'A real, production-style bug-fix eval with rubric, diffs, and operator takeaways.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

Pagination bugs are boring until they ship to prod. This one’s a classic off‑by‑one error that causes page 2+ to skip items. We used it as a **single‑task coding eval** because it’s small, real, and highlights whether a model understands stateful APIs, indexing, and defensive coding.

This is **not** a leaderboard. It’s one task, scored with a rubric. The goal is to capture *how a model thinks under real engineering constraints*, not to claim global superiority.

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
| Claude 3.5 | 8.6 | Correct fix + validation notes, good explanation. |
| GPT‑4.2 | 9.1 | Clean diff + clear reasoning; strongest code clarity. |
| GLM‑5 | 7.8 | Fix is correct, but skipped guardrails. |

## What “great” looked like
A strong answer **fixes the math** and **hardens the endpoint** without overengineering.

**Corrected snippet**:
```js
const page = Math.max(1, Number(req.query.page || 1))
const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)))
const offset = (page - 1) * limit
const items = await db.items.findMany({ skip: offset, take: limit })
```

## Operator analysis
**Why this task matters:** pagination bugs are easy to miss in code review and cause silent data loss. A strong model:
- spots the off‑by‑one immediately,
- gives you the exact fix,
- and suggests guardrails you’d implement in real production APIs.

**What separated the top answer:** clarity + defensiveness. GPT‑4.2 scored highest because it paired the fix with a concise diff and avoided extra noise. Claude was more thorough, but a touch longer than needed. GLM landed the fix but ignored validation, which is a real production risk.

## How this fits broader benchmarks
We anchor our internal evals against public benchmarks that test coding reliability and reproducibility:
- **SWE‑bench** measures bug‑fixing on real GitHub issues (software engineering realism). [SWE‑bench Leaderboards](https://www.swebench.com/)
- **HumanEval** is a classic code generation benchmark for correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **HELM** emphasizes transparency and multiple metrics across tasks. [Stanford HELM](https://github.com/stanford-crfm/helm)

Our task mirrors the *shape* of SWE‑bench problems but is intentionally smaller so we can evaluate reasoning and implementation details quickly.

## Takeaways for builders
- **If you want crisp diffs and clear patches:** GPT‑4.2 led.
- **If you want extra guardrails and explanation:** Claude is a safe pick.
- **If you only care about speed:** GLM can work, but needs review.

## How to re‑run this eval
1. Use the exact prompt above.
2. Score answers against the rubric (10 points).
3. Keep a copy of the diff and a short rationale.

**Related:** full cross‑task summary in the [daily scorecard](/blog/2026-02-12-model-eval-scorecard/).
