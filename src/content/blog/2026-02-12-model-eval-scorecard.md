---
title: 'Daily Model Scorecard — 2026-02-12'
description: 'Head‑to‑head results across coding, reasoning, and tool‑use tasks with reproducible prompts.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a real pagination bug, a build‑vs‑buy decision under a two‑week deadline, and a Stripe webhook setup. The goal is not to declare a universal winner — it’s to show **how models behave under real operator pressure** and **how we score them**.

## Scorecard (10‑point scale)

| Model | Coding | Reasoning | Tool‑use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude 3.5 | 8.6 | 9.2 | 8.8 | **8.9** |
| GPT‑4.2 | 9.1 | 8.4 | 7.6 | **8.4** |
| GLM‑5 | 7.8 | 8.1 | 7.2 | **7.7** |

**Weights:** coding 40%, reasoning 35%, tool‑use 25%. We bias toward **code correctness and decision quality** because those errors are the most expensive in production.

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
- **Claude** is the most consistent across reasoning + tool‑use.
- **GPT‑4.2** is the best at clean, correct diffs.
- **GLM‑5** is fast, but skips guardrails.

## Why we anchor against public benchmarks
Public benchmarks aren’t perfect, but they provide **outside calibration** and catch drift:
- **SWE‑bench** for real bug‑fixing tasks. [SWE‑bench Leaderboards](https://www.swebench.com/)
- **HumanEval** for code‑generation correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **HELM** for transparent, multi‑metric evaluation. [Stanford HELM](https://github.com/stanford-crfm/helm)
- **Chatbot Arena** for crowd‑sourced Elo ratings. [Chatbot Arena](https://openlm.ai/chatbot-arena/)

These provide context, but we still run **task‑level evals** because leadership decisions are rarely captured in a leaderboard.

## What’s next
Tomorrow’s eval focuses on:
- **Front‑end bug triage** (real UI regression)
- **Agentic research** (docs + vendor comparison)

**Related:** individual deep‑dives on [coding](/blog/2026-02-12-coding-benchmark/), [reasoning](/blog/2026-02-12-reasoning-benchmark/), and [tool‑use](/blog/2026-02-12-tool-use-benchmark/).
