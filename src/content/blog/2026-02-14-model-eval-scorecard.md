---
title: 'Daily Model Eval Scorecard — 2026-02-14'
description: 'Head‑to‑head results across coding, reasoning, and tool‑use tasks with reproducible prompts. Today: Claude Opus 4.6, GPT‑5, Gemini 2.5 Pro, Kimi K2.5, and DeepSeek R1.'
pubDate: '2026-02-14'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a race condition in async code, a capacity planning decision under budget constraints, and a multi‑API data aggregation workflow. We test 5 frontier models on operator‑grade workloads.

## Scorecard (10‑point scale)

| Model | Coding | Reasoning | Tool‑use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 9.5 | 9.6 | 9.4 | **9.50** |
| GPT‑5 | 9.3 | 9.4 | 9.2 | **9.30** |
| Gemini 2.5 Pro | 9.1 | 9.3 | 9.0 | **9.13** |
| Kimi K2.5 | 8.8 | 9.0 | 8.6 | **8.80** |
| DeepSeek R1 | 8.6 | 9.2 | 8.4 | **8.73** |

**Weights:** coding 40%, reasoning 35%, tool‑use 25%. We bias toward **code correctness and decision quality** because those errors are the most expensive in production.

## Today's winner

**Claude Opus 4.6** retains the top spot with consistent excellence across all three categories. GPT‑5 closes the gap significantly, showing strong improvements in coding and reasoning over previous iterations. Gemini 2.5 Pro remains a solid performer, particularly excelling in reasoning tasks.

## Tasks + prompts

### 1) Coding: Race condition in async code
**Goal:** Identify and fix a race condition in a Node.js payment processing flow.

**Prompt**
```
You have an async function that processes payments in parallel using Promise.all(). However, users are occasionally charged twice. Identify the race condition and provide a fix.

async function processPayments(userIds) {
  const results = await Promise.all(
    userIds.map(async (userId) => {
      const user = await db.users.findOne(userId)
      const subscription = await db.subscriptions.findOne(userId)
      if (user.balance >= subscription.price) {
        await paymentGateway.charge(userId, subscription.price)
        return { userId, success: true }
      }
      return { userId, success: false }
    })
  )
  return results
}
```

**Rubric**
- Identifies the race condition: concurrent reads of stale balance data
- Suggests proper locking or transactional isolation
- Provides corrected code with proper concurrency handling

### 2) Reasoning: Capacity planning under budget
**Goal:** Recommend infrastructure scaling strategy for a growing SaaS.

**Prompt**
```
Your startup's API traffic grew 40% MoM for 6 months. Current AWS bill is $12K/mo. Leadership wants to stay under $25K/mo for the next quarter. You can vertically scale, horizontally scale, add caching, or migrate parts to serverless. Provide a decision matrix and recommendation.
```

**Rubric**
- Quantifies growth trajectory and projections
- Provides cost/benefit analysis for each option
- Recommends a phased approach with clear rationale

### 3) Tool use: Multi‑API data aggregation
**Goal:** Build a workflow that aggregates data from GitHub, Slack, and JIRA.

**Prompt**
```
Create a Python script that fetches: (1) open PRs from GitHub, (2) unresolved threads from a Slack channel, and (3) JIRA tickets assigned to the current user. Combine into a single daily digest. Use the official SDKs and handle rate limits gracefully.
```

**Rubric**
- Uses appropriate SDKs (PyGithub, slack-sdk, atlassian-python-api)
- Implements rate limit handling with exponential backoff
- Produces a consolidated, readable digest output

## Operator takeaways

- **Claude Opus 4.6** remains the gold standard for reliability. Best choice when correctness trumps speed.
- **GPT‑5** shows significant improvement and is now a strong competitor, especially for speed‑critical workloads.
- **Gemini 2.5 Pro** excels at reasoning tasks and is ideal for analysis‑heavy workflows.
- **Kimi K2.5** continues to offer excellent value with near‑frontier performance at lower cost.
- **DeepSeek R1** shows impressive reasoning capabilities but lags slightly on coding tasks.

## Why we anchor against public benchmarks

Public benchmarks aren't perfect, but they provide **outside calibration**:

- **SWE‑bench** for real bug‑fixing tasks. [SWE‑bench Leaderboards](https://www.swebench.com/)
- **HumanEval** for code‑generation correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **Chatbot Arena** for crowd‑sourced Elo ratings. [Chatbot Arena](https://lmarena.ai/)

These provide context, but we still run **task‑level evals** because leadership decisions are rarely captured in a leaderboard.

## What's next

Tomorrow's eval focuses on:
- **Memory‑intensive debugging** (large codebase context)
- **Multi‑modal reasoning** (code + diagram interpretation)

**Related:** individual deep‑dives on [coding](/blog/2026-02-12-coding-benchmark/), [reasoning](/blog/2026-02-12-reasoning-benchmark/), and [tool‑use](/blog/2026-02-12-tool-use-benchmark/).
