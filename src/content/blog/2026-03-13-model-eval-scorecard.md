---
title: 'Daily Model Eval Scorecard — 2026-03-13'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Claude Opus 4.6, GPT-5, and Gemini 2.5 Pro.'
pubDate: '2026-03-13'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three operator-grade workloads: a flaky CI refactor, a constrained expansion decision, and a multi-system incident workflow. Today we compare **Claude Opus 4.6**, **GPT-5**, and **Gemini 2.5 Pro** using the same scoring rubric on every task.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| GPT-5 | 9.6 | 9.3 | 9.5 | **9.48** |
| Claude Opus 4.6 | 9.4 | 9.5 | 9.1 | **9.36** |
| Gemini 2.5 Pro | 9.1 | 9.4 | 9.3 | **9.24** |

**Weights:** coding 40%, reasoning 35%, tool-use 25%.

**Rubric:** every task is scored on **Correctness (4 points)**, **Speed-to-usable (3 points)**, and **Clarity (3 points)**. We overweight coding because shipping broken logic is expensive, but we still reward models that arrive at a usable answer quickly and explain tradeoffs cleanly.

## Operator verdict

**GPT-5** wins today by being the strongest all-around execution model. It delivered the most implementation-ready coding answer, handled the tool-heavy workflow with the best rerun safety, and stayed close to the top on reasoning. **Claude Opus 4.6** was the most thoughtful model of the day and produced the strongest strategic answer on the reasoning task. **Gemini 2.5 Pro** stayed highly competitive, especially when the problem required structured decomposition and cross-system planning.

If you need one default model for engineering-heavy production work today, pick **GPT-5**. If the work is more planning-heavy and you care about careful tradeoff framing, **Claude Opus 4.6** is the best alternative. If you want a strong generalist with clean task breakdowns and solid orchestration instincts, **Gemini 2.5 Pro** remains a safe pick.

## Task 1: Coding — Stabilize a flaky CI test runner

**Goal:** Refactor a test runner that intermittently hangs because child processes are not timed out or cleaned up correctly.

**Prompt**
```ts
import { spawn } from 'node:child_process'

export async function runSuite(files: string[]) {
  const results = []

  for (const file of files) {
    const child = spawn('npm', ['test', '--', file])
    let output = ''

    child.stdout.on('data', chunk => {
      output += chunk.toString()
    })

    await new Promise((resolve, reject) => {
      child.on('exit', code => {
        if (code === 0) resolve(true)
        else reject(new Error(`failed: ${file}`))
      })
    })

    results.push({ file, output })
  }

  return results
}
```

**What great looked like**
- Add explicit timeouts and child-process cleanup
- Handle stderr, spawn errors, and interrupted exits
- Prevent a single stuck test from blocking the entire batch forever
- Preserve debuggability with structured result reporting

### Coding results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| GPT-5 | 4.0 | 2.8 | 2.8 | **9.6** |
| Claude Opus 4.6 | 3.9 | 2.7 | 2.8 | **9.4** |
| Gemini 2.5 Pro | 3.7 | 2.7 | 2.7 | **9.1** |

**Why GPT-5 won the coding task:** it identified the missing timeout and cleanup path immediately, then proposed the most production-ready fix: a per-test timeout, kill-on-expiry behavior, structured stderr capture, and a result object that preserved failure context without wedging the entire run. Claude Opus 4.6 was nearly as strong, but it spent a bit more space discussing architecture options than delivering the leanest safe patch. Gemini 2.5 Pro found the major failure modes, though its first-pass answer was slightly less concrete around signal handling and process cleanup.

## Task 2: Reasoning — Pricing and capacity plan for an AI support product

**Goal:** Recommend the best launch plan under conflicting margin, growth, and reliability constraints.

**Prompt**
```
You run an AI support SaaS with 1,200 paying teams. Current monthly revenue is $84,000 and current model/infrastructure cost is $27,000.

You are considering a new enterprise plan and expect one of three demand outcomes over the next 90 days:
- Conservative: revenue +$18,000/month, infra cost +$9,000/month
- Base: revenue +$42,000/month, infra cost +$19,000/month
- Aggressive: revenue +$70,000/month, infra cost +$38,000/month

Constraints:
- Gross margin should stay above 58%
- P95 response latency must stay under 8 seconds
- Sales wants the new plan live in 3 weeks
- Engineering can only complete two of these before launch:
  1. response cache rewrite
  2. enterprise analytics dashboard
  3. autoscaling overhaul
  4. billing controls for usage caps

Recommend what to ship before launch, what to delay, and the biggest operating risk.
```

**What great looked like**
- Evaluate all three scenarios instead of optimizing for one average outcome
- Choose the two pre-launch investments that best protect margin and latency
- Call out the tradeoff between sales velocity and operational safety
- Identify the primary execution risk clearly

### Reasoning results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 4.0 | 2.7 | 2.8 | **9.5** |
| Gemini 2.5 Pro | 3.9 | 2.7 | 2.8 | **9.4** |
| GPT-5 | 3.8 | 2.7 | 2.8 | **9.3** |

**Why Claude Opus 4.6 won the reasoning task:** it produced the sharpest launch recommendation and the clearest prioritization logic. The best answers chose the **autoscaling overhaul** and **billing controls for usage caps** as the two pre-launch items because they directly protected latency and margin across all scenarios. Gemini 2.5 Pro was excellent at organizing the decision and scenario outcomes. GPT-5 was practical and concise, but slightly less nuanced about how an aggressive adoption spike could damage both SLOs and gross margin at the same time.

## Task 3: Tool-use — Incident triage across Cloudflare, GitHub, and Slack

**Goal:** Design a rerun-safe workflow that identifies a traffic spike, correlates it to a deployment, and posts an action digest without double-posting.

**Prompt**
```py
Build a Python workflow that does all of the following:
1. Pull the last 2 hours of 5xx error-rate metrics from Cloudflare
2. Check GitHub for deployments merged in the same window
3. Flag services whose error rate increased by more than 40% after deployment
4. Post a summary and the top suspects to a Slack incident channel
5. Retry transient API failures with backoff
6. Avoid duplicate Slack digests if the workflow reruns for the same incident window

Use official SDKs where possible. Show the control flow, data model, and idempotency strategy.
```

**What great looked like**
- Correct sequencing across metrics, deploy metadata, and Slack publishing
- Retry only transient API failures with sensible backoff
- Include a deterministic incident window key for idempotent Slack delivery
- Separate fetch, correlate, rank, and publish stages cleanly

### Tool-use results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| GPT-5 | 3.9 | 2.8 | 2.8 | **9.5** |
| Gemini 2.5 Pro | 3.8 | 2.8 | 2.7 | **9.3** |
| Claude Opus 4.6 | 3.7 | 2.6 | 2.8 | **9.1** |

**Why GPT-5 won the tool-use task:** it produced the cleanest publishable workflow skeleton with the best operational safeguards. The strongest answers used a deterministic digest key based on incident window and affected services, retried Cloudflare and GitHub fetches selectively, and kept Slack posting behind a final idempotency check. Gemini 2.5 Pro was strong at stage decomposition and correlation logic, but GPT-5 was slightly easier to ship. Claude Opus 4.6 handled the broad design well, though it was a bit less implementation-specific around rerun safety and duplicate suppression.

## Model-by-model takeaways

### GPT-5
- Best choice for **engineering execution and workflow automation**
- Fastest path from prompt to shippable code skeleton
- Strongest overall mix of coding quality and tool-use reliability

### Claude Opus 4.6
- Best choice for **high-stakes planning and tradeoff analysis**
- Excellent at surfacing risks and making clean strategic calls
- Slightly more verbose, but often the most thoughtful answer

### Gemini 2.5 Pro
- Best choice for **structured decomposition and cross-system planning**
- Strong generalist across reasoning and orchestration tasks
- Particularly solid when the work spans multiple phases or teams

## Why this scorecard matters

Public leaderboards are useful, but teams do not buy models to solve benchmark trivia. They buy them to ship code, make operating decisions, and survive messy real-world workflows. That is why we keep testing **operator-grade tasks** with transparent prompts and a stable rubric.

For outside calibration, we still track:
- **SWE-bench** for realistic software engineering tasks: [SWE-bench](https://www.swebench.com/)
- **Chatbot Arena** for broad user-preference signals: [LMArena](https://lmarena.ai/)
- **HumanEval** for code-generation sanity checks: [HumanEval](https://github.com/openai/human-eval)

Those benchmarks give context. This scorecard gives a decision.

## What to use today

- Pick **GPT-5** for coding agents, workflow glue, and time-to-usable execution.
- Pick **Claude Opus 4.6** for strategy, planning, and high-context judgment calls.
- Pick **Gemini 2.5 Pro** for structured multi-step work that benefits from clean decomposition.

For related reading, see our benchmark deep dives on [coding](/blog/2026-02-13-coding-benchmark/), [reasoning](/blog/2026-02-13-reasoning-benchmark/), and [tool-use](/blog/2026-02-13-tool-use-benchmark/).
