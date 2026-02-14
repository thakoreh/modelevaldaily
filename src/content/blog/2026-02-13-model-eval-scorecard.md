---
title: 'Daily Model Eval Scorecard — 2026-02-13'
description: 'Head‑to‑head results across coding, reasoning, and tool‑use tasks with reproducible prompts. Today: GPT‑5, Gemini 2.5 Pro, and DeepSeek R1 go head‑to‑head.'
pubDate: '2026-02-13'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a React state bug, a capacity‑planning decision for Q3, and a GitHub Actions workflow setup. We test 3 frontier models on operator‑grade workloads.

## Scorecard (10‑point scale)

| Model | Correctness | Speed | Clarity | Weighted Total |
| --- | --- | --- | --- | --- |
| GPT‑5 | 9.2 | 8.9 | 9.4 | **9.18** |
| Gemini 2.5 Pro | 9.0 | 9.3 | 8.8 | **9.04** |
| DeepSeek R1 | 9.4 | 8.2 | 8.5 | **8.74** |

**Weights:** correctness 45%, speed 25%, clarity 30%. We prioritize **code correctness and decision quality** because those errors are the most expensive in production.

## Today's winner

**GPT‑5** edges ahead with the best balance of correctness and clarity. DeepSeek R1 leads on correctness (9.4), but its slower inference and slightly lower clarity hurt its weighted score. Gemini 2.5 Pro is the speed demon — fastest response times by a clear margin.

## Tasks + prompts

### 1) Coding: React state bug
**Goal:** Fix stale closure issue in a useEffect hook.

**Prompt**
```
You have a React component with a button that increments a counter. Users report the count resets to 0 when the component re‑renders. Identify the bug and fix it.

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Count is:', count)
    }, 1000)
    return () => clearInterval(timer)
  }, []) // Missing dependency?

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Rubric**
- Identifies stale closure: `count` captured at initial render
- Correctly adds `count` to dependency array OR uses functional update `setCount(c => c + 1)`
- Explains why the fix works

### 2) Reasoning: capacity planning decision
**Goal:** Recommend infrastructure scaling for Q3 traffic growth.

**Prompt**
```
Your SaaS platform currently handles 50k daily active users on 3 m5.xlarge EC2 instances. Projected growth is 3x by Q3. You have a $15k/month infrastructure budget. Evaluate: vertical scaling vs horizontal scaling vs managed services (ECS/Fargate). Provide a decision matrix and final recommendation.
```

**Rubric**
- Covers cost, scalability, operational overhead, and risk
- Provides a decision matrix or tradeoff table
- Makes a clear recommendation with justification

### 3) Tool‑use: CI/CD workflow setup
**Goal:** Set up a GitHub Actions workflow for a Node.js API.

**Prompt**
```
Create a GitHub Actions workflow that: (1) runs tests on Node 18 and 20, (2) caches npm dependencies, (3) deploys to AWS Elastic Beanstalk on main branch push. Provide the minimal YAML configuration.
```

**Rubric**
- Uses `actions/setup-node` with matrix strategy
- Includes dependency caching
- Has correct EB deploy action or custom script

## Operator takeaways

- **GPT‑5** is the all‑rounder. Best when you need balanced performance across correctness, speed, and clarity. Ideal for mixed workloads.
- **Gemini 2.5 Pro** shines on speed. Best for high‑throughput scenarios where response latency matters more than marginal correctness gains.
- **DeepSeek R1** leads on correctness. Choose this when accuracy is non‑negotiable and you can tolerate slightly slower responses.

## Why we run task‑level evals

Public benchmarks are useful for **outside calibration**, but they don't capture real‑world production decisions:

- **SWE‑bench** for real bug‑fixing. [SWE‑bench Leaderboards](https://www.swebench.com/)
- **HumanEval** for code generation correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **Chatbot Arena** for crowd‑sourced preferences. [Chatbot Arena](https://lmarena.ai/)

We run our own evals because **leadership decisions and production bugs** aren't captured in leaderboards.

## What's next

Tomorrow's eval focuses on:
- **Database migration** (PostgreSQL → CockroachDB)
- **Multi‑step research** (agentic synthesis)

**Related:** individual deep‑dives on [coding](/blog/2026-02-12-coding-benchmark/), [reasoning](/blog/2026-02-12-reasoning-benchmark/), and [tool‑use](/blog/2026-02-12-tool-use-benchmark/).
