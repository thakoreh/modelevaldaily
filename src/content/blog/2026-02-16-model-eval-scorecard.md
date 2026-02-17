---
title: 'Daily Model Eval Scorecard — 2026-02-16'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks with reproducible prompts. Today: Claude Opus 4.6, GPT-5.2, Claude Opus 4.5, GLM-5, and Gemini 3 Pro.'
pubDate: '2026-02-16'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a React state race condition, a capacity planning decision for a startup, and a multi-step GitHub Actions workflow. We test 5 frontier models on operator-grade workloads.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 (Adaptive) | 9.6 | 9.7 | 9.4 | **9.59** |
| GPT-5.2 (xhigh) | 9.6 | 9.5 | 9.5 | **9.54** |
| Claude Opus 4.5 | 9.4 | 9.5 | 9.2 | **9.39** |
| GLM-5 | 9.0 | 9.1 | 8.8 | **9.00** |
| Gemini 3 Pro | 9.3 | 9.3 | 9.1 | **9.27** |

**Weights:** coding 40%, reasoning 35%, tool-use 25%. We bias toward **code correctness and decision quality** because those errors are the most expensive in production.

## Today's winner

**Claude Opus 4.6 (Adaptive)** takes the top spot with exceptional reasoning capabilities. **GPT-5.2 (xhigh)** remains a close second with the best tool-use performance. **Claude Opus 4.5** continues to impress with consistent quality across all tasks.

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

- **Claude Opus 4.6 (Adaptive)** is the new intelligence leader. Exceptional for complex reasoning and critical decisions.
- **GPT-5.2 (xhigh)** excels at coding and agentic tasks with excellent tool integration.
- **Claude Opus 4.5** remains a top choice for reasoning-heavy workflows and consistent quality.
- **GLM-5** delivers top-tier intelligence at a fraction of the cost with strong bilingual support.
- **Gemini 3 Pro** leads multimodal understanding with superior search integration.

## Fact-check notes (updated February 16, 2026)

The model names on this page were validated against official provider documentation:

- Anthropic: [Model list](https://docs.anthropic.com/en/docs/about-claude/models/all-models), [Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)
- OpenAI: [Models](https://platform.openai.com/docs/models), [Pricing](https://platform.openai.com/docs/pricing)
- Google: [Gemini models](https://ai.google.dev/gemini-api/docs/models), [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing)
- Zhipu: [GLM-5](https://docs.bigmodel.cn/cn/guide/models/text/glm-5), [Pricing](https://open.bigmodel.cn/pricing)

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
