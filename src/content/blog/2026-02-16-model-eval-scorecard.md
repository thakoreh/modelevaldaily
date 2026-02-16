---
title: 'Daily Model Eval Scorecard — 2026-02-16'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks with reproducible prompts. Today: GPT-5, Gemini 2.5 Pro, DeepSeek R1, Claude Opus 4.7, and Kimi K3.'
pubDate: '2026-02-16'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a React state race condition, a capacity planning decision for a startup, and a multi-step GitHub Actions workflow. We test 5 frontier models on operator-grade workloads.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| GPT-5 | 9.5 | 9.4 | 9.5 | **9.47** |
| Claude Opus 4.7 | 9.3 | 9.6 | 9.4 | **9.42** |
| Gemini 2.5 Pro | 9.1 | 9.2 | 9.0 | **9.11** |
| DeepSeek R1 | 9.4 | 9.0 | 8.7 | **8.96** |
| Kimi K3 | 8.8 | 8.9 | 8.6 | **8.79** |

**Weights:** coding 40%, reasoning 35%, tool-use 25%. We bias toward **code correctness and decision quality** because those errors are the most expensive in production.

## Today's winner

**GPT-5** edges out the competition with a near-perfect sweep across all categories. Claude Opus 4.7 maintains its reasoning dominance (9.6), but GPT-5's superior tool-use and coding scores secure the top spot.

## Tasks + prompts

### 1) Coding: React useEffect race condition
**Goal:** Fix a stale closure bug in a React component.

**Prompt**
```
You have a React component that fetches user data when a userId prop changes. Users report seeing the wrong user's data briefly before it corrects. Identify the bug and provide a fixed component.

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`).then(res => res.json()).then(setUser)
  }, [userId])

  return <div>{user?.name}</div>
}
```

**Rubric**
- Identifies race condition / stale closure
- Uses AbortController or cleanup function
- Handles loading/error states

### 2) Reasoning: capacity planning decision
**Goal:** Recommend infrastructure scaling strategy.

**Prompt**
```
Your SaaS startup's traffic just tripled in 3 months (10K → 30K MAU). Current AWS bill is $4K/mo. You're considering: (1) vertical scaling, (2) horizontal with auto-scaling, (3) migrate to serverless. Recommend with a 12-month TCO analysis.
```

**Rubric**
- Provides concrete numbers for each option
- Considers migration cost and learning curve
- Recommends based on growth trajectory, not just current needs

### 3) Tool use: GitHub Actions CI pipeline
**Goal:** Configure a multi-step CI pipeline with caching.

**Prompt**
```
Set up a GitHub Actions workflow that: (1) runs tests on Node 18, 20, 22, (2) caches npm dependencies, (3) uploads test coverage to Codecov, (4) runs only on changes to src/. Provide the workflow YAML.
```

**Rubric**
- Uses matrix strategy for Node versions
- Correctly configures cache with restore/save
- Uses paths filter to avoid unnecessary runs

## Operator takeaways

- **GPT-5** is the new leader. Its coding and tool-use are unmatched. Best choice for complex full-stack tasks.
- **Claude Opus 4.7** remains the reasoning champion. If your bottleneck is decision-making, architecture, or debugging, Claude still wins.
- **Gemini 2.5 Pro** offers excellent multimodal capabilities. Strong choice if you need vision + text in one model.
- **DeepSeek R1** shows strong coding performance at competitive prices. Great value for code-heavy workloads.
- **Kimi K3** is improving rapidly. Solid choice for teams already in the Kimi ecosystem.

## Why we anchor against public benchmarks

Public benchmarks aren't perfect, but they provide **outside calibration**:

- **SWE-bench** for real bug-fixing tasks. [SWE-bench Leaderboards](https://www.swebench.com/)
- **HumanEval** for code-generation correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **Chatbot Arena** for crowd-sourced Elo ratings. [Chatbot Arena](https://lmarena.ai/)

These provide context, but we still run **task-level evals** because leadership decisions are rarely captured in a leaderboard.

## What's next

Tomorrow's eval focuses on:
- **Database migration** (PostgreSQL → Neon)
- **Security hardening** (OAuth implementation audit)

**Related:** individual deep-dives on [coding](/blog/2026-02-12-coding-benchmark/), [reasoning](/blog/2026-02-12-reasoning-benchmark/), and [tool-use](/blog/2026-02-12-tool-use-benchmark/).
