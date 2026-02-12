---
title: 'Daily Model Eval Scorecard — 2026-02-12'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks with reproducible prompts.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

**Summary:** Claude leads in reasoning, GPT leads in code correctness, and GLM is fastest on tool-use tasks. Below are the exact prompts and rubric so you can re-run everything.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude 3.5 | 8.6 | 9.2 | 7.8 | **8.6** |
| GPT-4.2 | 9.1 | 8.4 | 7.4 | **8.4** |
| GLM-5 | 7.8 | 8.1 | 8.9 | **8.2** |

## Tasks + prompts

### 1) Coding: API pagination bug
**Goal:** Fix off-by-one pagination in a REST endpoint.

**Prompt**
```
You are given a Node/Express endpoint that returns paginated results. Users report missing items on page 2+. Identify the bug and provide a code diff.

Here is the endpoint:

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
- Provides patch or clear corrected snippet
- Mentions input validation for page/limit

### 2) Reasoning: build vs buy
**Goal:** Recommend build vs buy for an internal tool.

**Prompt**
```
Your team of 8 needs a lightweight QA automation dashboard in 2 weeks. Off-the-shelf tools cost $600/mo and don't match your workflow. Recommend build vs buy, with a decision matrix.
```

**Rubric**
- Mentions time-to-value, maintenance cost, opportunity cost
- Provides a decision matrix or clear tradeoff table
- Concludes with a decisive recommendation

### 3) Tool use: docs-driven task
**Goal:** Read docs and configure a webhook.

**Prompt**
```
You need to configure a Stripe webhook to listen for checkout.session.completed. Provide the minimal CLI steps and the endpoint handler skeleton.
```

**Rubric**
- Includes `stripe listen --forward-to`
- Mentions webhook secret verification
- Provides handler stub

## Takeaways
- Claude is the most consistent under vague specs.
- GPT is best when code correctness is the primary metric.
- GLM is fastest when tooling is required.

## What’s next
Tomorrow’s eval focuses on **front-end bug triage** and **agentic research tasks**.
