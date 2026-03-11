---
title: 'Daily Model Eval Scorecard — 2026-03-11'
description: "Claude Opus 4.6, GPT-5, and Gemini 2.5 Pro face off on coding, reasoning, and tool-use in today's AI model eval scorecard."
pubDate: '2026-03-11'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three operator-grade tasks: a concurrency-safe billing fix, a reasoning-heavy inference routing decision, and a multi-step incident workflow with external tools. Today we compare **Claude Opus 4.6**, **GPT-5**, and **Gemini 2.5 Pro** using the same rubric on every task.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 9.4 | 9.4 | 9.2 | **9.35** |
| GPT-5 | 9.3 | 9.1 | 9.4 | **9.26** |
| Gemini 2.5 Pro | 8.9 | 9.2 | 9.4 | **9.13** |

**Weights:** coding 40%, reasoning 35%, tool-use 25%.

**Rubric:** each task is scored on **Correctness (4 points)**, **Speed-to-usable (3 points)**, and **Clarity (3 points)**. We overweight coding in the final score because production bugs are expensive, but we still reward models that get to a usable answer quickly and explain themselves cleanly.

## Operator Verdict

**Claude Opus 4.6** wins today by being the most reliable across all three categories. It did not post the single best tool-use score, but it had the fewest weak spots and the strongest reasoning output. **GPT-5** remains the fastest path to a deployable answer on code and workflow tasks. **Gemini 2.5 Pro** performed best when the task looked like structured orchestration with multiple moving parts.

If you need one default model for high-stakes decisions, pick **Claude Opus 4.6**. If you care more about getting to a strong first draft fast, **GPT-5** is still a killer operator model. If your workload is API-heavy and workflow-centric, **Gemini 2.5 Pro** deserves serious consideration.

## Task 1: Coding — Idempotent billing webhook fix

**Goal:** Patch a webhook handler so retried payment events do not double-apply credits.

**Prompt**
```ts
You receive Stripe-style webhook events. Under retries and network timeouts, some accounts get credited twice. Identify the bug and propose a safe fix.

app.post('/webhooks/billing', async (req, res) => {
  const event = req.body

  if (event.type === 'invoice.paid') {
    const account = await db.account.findUnique({ where: { id: event.data.accountId } })
    await db.account.update({
      where: { id: account.id },
      data: { credits: account.credits + event.data.credits }
    })
  }

  res.status(200).json({ ok: true })
})
```

**What great looked like**
- Recognize that webhook retries make the handler non-idempotent
- Recommend storing and checking a unique event ID before applying state changes
- Use a transaction or atomic update to avoid read-modify-write races
- Mention replay safety and observable failure handling

### Coding results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 3.9 | 2.6 | 2.9 | **9.4** |
| GPT-5 | 3.8 | 2.8 | 2.7 | **9.3** |
| Gemini 2.5 Pro | 3.6 | 2.7 | 2.6 | **8.9** |

**Why Claude won the coding task:** it consistently called out both failure modes: duplicate event delivery **and** the read-modify-write race in the current balance update. GPT-5 was nearly as strong and got to a safe implementation faster, but Claude gave the cleaner explanation of why idempotency keys need to live in durable storage. Gemini 2.5 Pro identified the main bug, but its first-pass fix leaned more on dedupe logic than on transaction safety.

## Task 2: Reasoning — Inference routing under budget and SLA pressure

**Goal:** Recommend how to route production traffic across premium and lower-cost models over the next quarter.

**Prompt**
```
You run an AI support product handling 2 million requests per month. Today 100% of traffic goes to a premium frontier model costing $0.018 per request all-in. Gross margin is getting squeezed.

Constraints:
- Maintain CSAT within 2 percentage points of current baseline
- P95 latency must stay under 4.5 seconds
- Monthly model spend target: under $24,000
- 15% of conversations are high-stakes account or billing issues
- 35% are moderate-complexity product questions
- 50% are routine FAQ / retrieval-heavy requests

Recommend a routing strategy across three model tiers. Include a simple cost model, fallback rules, and the biggest execution risk.
```

**What great looked like**
- Segment requests by risk and complexity rather than average them together
- Produce a concrete routing mix and monthly cost estimate
- Explain fallback and escalation rules
- Identify operational risk: bad classification, silent quality drift, or latency spikes

### Reasoning results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 3.9 | 2.6 | 2.9 | **9.4** |
| GPT-5 | 3.7 | 2.7 | 2.7 | **9.1** |
| Gemini 2.5 Pro | 3.8 | 2.6 | 2.8 | **9.2** |

**Why Claude won the reasoning task:** it made the cleanest executive decision, pushed high-stakes traffic to the premium tier, and still gave a believable path to the spend target through aggressive routing of FAQ traffic. GPT-5 was more concise and operationally oriented, but it was slightly less nuanced around how misclassification risk compounds when the classifier and router drift together. Gemini 2.5 Pro produced a strong quantitative answer, though its fallback policy was a little less conservative than ideal for billing-sensitive conversations.

## Task 3: Tool-use — Incident digest across GitHub, PagerDuty, and Slack

**Goal:** Design a tool-using workflow that assembles a useful engineering incident brief.

**Prompt**
```py
Create a Python workflow that does all of the following:
1. Pull open Sev-1 and Sev-2 incidents from PagerDuty
2. Fetch linked GitHub pull requests for repositories mentioned in the incident notes
3. Post a summarized status update to a Slack channel
4. Retry transient failures with backoff
5. Avoid posting duplicate summaries if the workflow reruns

Use official SDKs where possible. Show the control flow, data model, and error handling strategy.
```

**What great looked like**
- Correct API sequencing and reasonable SDK choices
- Backoff and retry only where failures are transient
- Explicit dedupe or idempotency guard for Slack posting
- Clear separation between fetch, enrich, summarize, and publish steps

### Tool-use results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| GPT-5 | 3.9 | 2.9 | 2.6 | **9.4** |
| Gemini 2.5 Pro | 3.8 | 2.9 | 2.7 | **9.4** |
| Claude Opus 4.6 | 3.7 | 2.6 | 2.9 | **9.2** |

**Why GPT-5 and Gemini tied:** both were excellent at turning the prompt into a practical workflow quickly. GPT-5 had the crispest control flow and the most implementation-ready skeleton. Gemini 2.5 Pro was especially good at decomposing the pipeline into fetch/enrich/publish phases and calling out rerun safety. Claude Opus 4.6 was still strong, but it spent more tokens on explanation and slightly less on the concrete operational details that make tool-using systems easy to ship.

## Model-by-model takeaways

### Claude Opus 4.6
- Best choice for **high-stakes reasoning and policy-heavy operator work**
- Most reliable at surfacing second-order risks, not just first-order fixes
- Slightly slower to a shippable workflow skeleton than GPT-5 on tool-use tasks

### GPT-5
- Best choice for **fast implementation work**
- Extremely strong on turning prompts into code structure, retries, and control flow
- Slightly less exhaustive than Claude when risk framing matters more than speed

### Gemini 2.5 Pro
- Best choice for **workflow decomposition and structured orchestration**
- Strong balance of quantitative reasoning and tool-use planning
- A bit more variable than Claude on code-level robustness details

## Why this scorecard matters

Public benchmarks remain useful, but production teams do not buy models to ace trivia. They buy them to patch bugs, make decisions, and drive workflows across messy systems. That is why we keep anchoring on **operator-grade tasks** with transparent prompts and a stable rubric.

For outside calibration, we still keep an eye on:
- **SWE-bench** for real coding performance: [SWE-bench](https://www.swebench.com/)
- **Chatbot Arena** for broad user preference signals: [LMArena](https://lmarena.ai/)
- **HumanEval** for code generation sanity checks: [HumanEval](https://github.com/openai/human-eval)

Those benchmarks give context. This scorecard gives a decision.

## What to use today

- Pick **Claude Opus 4.6** for architecture reviews, sensitive support decisions, and tasks where a wrong answer creates downstream pain.
- Pick **GPT-5** for coding agents, workflow glue, and tasks where time-to-usable matters most.
- Pick **Gemini 2.5 Pro** for API-heavy orchestration and structured multi-step execution.

For related reading, see our earlier posts on [coding benchmarks](/blog/2026-02-12-coding-benchmark/), [reasoning benchmarks](/blog/2026-02-12-reasoning-benchmark/), and [tool-use benchmarks](/blog/2026-02-12-tool-use-benchmark/).