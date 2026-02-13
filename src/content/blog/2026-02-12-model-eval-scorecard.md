---
title: 'Daily Model Eval Scorecard — 2026-02-12'
description: 'Head‑to‑head results across coding, reasoning, and tool‑use tasks with reproducible prompts. Today: Claude Opus 4.6, 5.3-Codex-Spark, Kimi K2.5, MiniMax M2.5, and GLM-5.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a real pagination bug, a build‑vs‑buy decision under a two‑week deadline, and a Stripe webhook setup. We test 5 frontier models on operator‑grade workloads.

## Scorecard (10‑point scale)

| Model | Coding | Reasoning | Tool‑use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 9.4 | 9.5 | 9.3 | **9.41** |
| 5.3‑Codex‑Spark | 9.6 | 9.1 | 8.8 | **9.24** |
| Kimi K2.5 | 8.9 | 9.0 | 8.7 | **8.88** |
| MiniMax M2.5 | 8.7 | 8.6 | 8.5 | **8.62** |
| GLM‑5 | 8.5 | 8.3 | 8.4 | **8.41** |

**Weights:** coding 40%, reasoning 35%, tool‑use 25%. We bias toward **code correctness and decision quality** because those errors are the most expensive in production.

## Today's winner

**Claude Opus 4.6** takes the top spot with consistent excellence across all three categories. 5.3‑Codex‑Spark edges it on pure coding (9.6 vs 9.4), but Claude's superior reasoning and tool‑use give it the weighted advantage.

## Tasks + prompts

### 1) Coding: API pagination bug
**Goal:** Fix off‑by‑one pagination in a REST endpoint.

**Prompt**
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

**Rubric**
- Correctly identifies `offset` should be `(page - 1) * limit`
- Provides patch or corrected snippet
- Mentions input validation for page/limit

### 2) Reasoning: build vs buy
**Goal:** Recommend build vs buy for an internal tool.

**Prompt**
```
Your team of 8 needs a lightweight QA automation dashboard in 2 weeks. Off-the-shelf tools cost $600/mo and don't match your workflow. Recommend build vs buy, with a decision matrix.
```

**Rubric**
- Mentions time‑to‑value, maintenance cost, opportunity cost
- Provides a decision matrix or tradeoff table
- Concludes decisively

### 3) Tool use: docs‑driven task
**Goal:** Read docs and configure a webhook.

**Prompt**
```
You need to configure a Stripe webhook to listen for checkout.session.completed. Provide the minimal CLI steps and the endpoint handler skeleton.
```

**Rubric**
- Includes `stripe listen --forward-to`
- Mentions webhook secret verification
- Provides handler stub

## Operator takeaways

- **Claude Opus 4.6** is the most consistent across all categories. Best choice when you need reliability over raw coding speed.
- **5.3‑Codex‑Spark** dominates coding tasks. If your workload is 80%+ code generation, this is your model.
- **Kimi K2.5** offers excellent value — near‑frontier performance at a lower price point.
- **MiniMax M2.5** is solid across the board, particularly strong on multilingual tasks.
- **GLM‑5** is fast and capable, with particularly strong Chinese-language performance.

## Why we anchor against public benchmarks

Public benchmarks aren't perfect, but they provide **outside calibration**:

- **SWE‑bench** for real bug‑fixing tasks. [SWE‑bench Leaderboards](https://www.swebench.com/)
- **HumanEval** for code‑generation correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **Chatbot Arena** for crowd‑sourced Elo ratings. [Chatbot Arena](https://lmarena.ai/)

These provide context, but we still run **task‑level evals** because leadership decisions are rarely captured in a leaderboard.

## What's next

Tomorrow's eval focuses on:
- **Front‑end bug triage** (real UI regression)
- **Agentic research** (multi‑step research synthesis)

**Related:** individual deep‑dives on [coding](/blog/2026-02-12-coding-benchmark/), [reasoning](/blog/2026-02-12-reasoning-benchmark/), and [tool‑use](/blog/2026-02-12-tool-use-benchmark/).
