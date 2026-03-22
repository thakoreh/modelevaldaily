---
title: 'Daily Model Eval Scorecard — 2026-03-22'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Claude Opus 4.7, GPT-5.3, and GLM-5.'
pubDate: '2026-03-22'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three operator-grade workloads: a broken retry-and-circuit-breaker implementation, a constrained microservices migration decision, and a multi-service deployment orchestration workflow. Today we compare **Claude Opus 4.7**, **GPT-5.3**, and **GLM-5** using the same scoring rubric on every task.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.7 | 9.5 | 9.6 | 9.0 | **9.42** |
| GPT-5.3 | 9.6 | 9.2 | 9.4 | **9.39** |
| GLM-5 | 9.1 | 9.5 | 9.6 | **9.34** |

**Weights:** coding 40%, reasoning 35%, tool-use 25%.

**Rubric:** every task is scored on **Correctness (4 points)**, **Speed-to-usable (3 points)**, and **Clarity (3 points)**. We overweight coding because shipping broken logic is expensive, but we still reward models that arrive at a usable answer quickly and explain tradeoffs cleanly.

## Operator verdict

**Claude Opus 4.7** wins today by delivering the most consistent performance across all three tasks. It produced the strongest reasoning answer by a comfortable margin and matched GPT-5.3 almost shot-for-shot on the coding challenge. **GPT-5.3** was the best pure coder of the day and showed strong tool-use instincts, making it the safest pick for execution-heavy workflows. **GLM-5** was the surprise of the day — it won the tool-use task outright with the most deployment-ready orchestration code and posted a near-top score on reasoning, proving it belongs in the same conversation as the US incumbents.

If you need one default model for engineering-heavy production work today, pick **GPT-5.3**. If your work leans toward planning, architecture decisions, and high-context reasoning, **Claude Opus 4.7** is the strongest option. If you want a cost-efficient alternative that punches well above its weight on tool-use and orchestration, **GLM-5** is the real deal.

## Task 1: Coding — Fix a broken retry mechanism with circuit breaker

**Goal:** Repair a TypeScript retry utility that lacks exponential backoff, has no circuit breaker, and can deadlock under concurrent failures.

**Prompt**
```ts
interface RequestOptions {
  url: string;
  retries?: number;
  timeout?: number;
}

export async function fetchWithRetry(opts: RequestOptions): Promise<Response> {
  const maxRetries = opts.retries ?? 3;
  let lastError: Error | null = null;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), opts.timeout ?? 5000);

      const res = await fetch(opts.url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status}`);
        continue;
      }

      return res;
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw lastError;
}
```

**What great looked like**
- Add exponential backoff with jitter between retries
- Implement a circuit breaker that opens after consecutive failures and half-opens after a cooldown
- Handle edge cases: timeout cleanup on retry, abort signal propagation, concurrent callers sharing breaker state
- Keep the API surface clean — callers shouldn't need to know about the breaker internals

### Coding results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| GPT-5.3 | 4.0 | 2.8 | 2.8 | **9.6** |
| Claude Opus 4.7 | 3.9 | 2.8 | 2.8 | **9.5** |
| GLM-5 | 3.6 | 2.8 | 2.7 | **9.1** |

**Why GPT-5.3 won the coding task:** it delivered the most implementation-ready patch on the first pass. The answer included a clean `CircuitBreaker` class with proper state transitions (closed → open → half-open), exponential backoff with jitter calculated as `delay * (1 + Math.random())`, and correct timeout cleanup on each retry attempt. Claude Opus 4.7 was nearly identical in quality but spent slightly more time explaining the design rationale before getting to the code. GLM-5 found the core issues and added backoff correctly, but its circuit breaker state management was slightly less precise around half-open transitions and concurrent access patterns.

## Task 2: Reasoning — Plan a monolith-to-microservices migration

**Goal:** Recommend a migration strategy given a small team, tight timeline, and hard reliability constraints.

**Prompt**
```
You lead an 8-person engineering team maintaining a monolithic Node.js application handling 12,000 requests/second at peak. The monolith is 180k lines of code, uses a single PostgreSQL database, and has started showing latency degradation above 8,000 RPS.

Your VP of Engineering has given you 6 months to decompose into at least 3 independent services before the next traffic peak. You have three migration strategies on the table:

Strategy A — Strangler Fig: Route traffic through a new API gateway, incrementally extract services, run old and new side-by-side.
- Expected timeline: 7-9 months
- Risk: Medium (dual-running adds complexity)
- Staff needed: 6 engineers minimum

Strategy B — Big Bang: Extract 3 core services (auth, orders, inventory) in parallel, cut over in a single weekend.
- Expected timeline: 4-5 months
- Risk: High (single point of failure during cutover)
- Staff needed: 7 engineers minimum

Strategy C — Event-Driven Staged: Introduce an event bus first, migrate services one at a time using event-driven communication.
- Expected timeline: 6-8 months
- Risk: Low-Medium (each service is independently deployed)
- Staff needed: 5 engineers minimum

Constraints:
- Zero-downtime migration (P99 latency cannot exceed current 340ms baseline by more than 15%)
- Budget allows hiring 2 more engineers at mid-level
- The current database has no sharding and 3 hot tables causing most contention
- QA team is 2 people and manually tests critical paths

Recommend the best strategy, what to prioritize in the first 30 days, and the biggest risk to the plan.
```

**What great looked like**
- Acknowledge the timeline constraint vs. the VP's ask honestly
- Address the database contention problem as a prerequisite, not an afterthought
- Choose a strategy that fits the team size, QA capacity, and zero-downtime requirement
- Provide a concrete first-30-day plan with clear milestones

### Reasoning results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.7 | 4.0 | 2.8 | 2.8 | **9.6** |
| GLM-5 | 3.9 | 2.8 | 2.8 | **9.5** |
| GPT-5.3 | 3.7 | 2.7 | 2.8 | **9.2** |

**Why Claude Opus 4.7 won the reasoning task:** it was the only model that directly confronted the timeline mismatch — Strategy A takes 7-9 months but the VP wants it done in 6, so it recommended Strategy C (event-driven staged) as the best fit because it stays within budget, respects the zero-downtime constraint, and can hit 6 months with the 2 additional hires. It also correctly identified the database hot tables as the real bottleneck and recommended addressing sharding before extracting services. GLM-5 was impressively close, choosing Strategy C for similar reasons and providing a solid first-30-day plan, but its treatment of the database contention was slightly less specific. GPT-5.3 leaned toward Strategy A and handled the tradeoffs well, but underestimated how dual-running complexity would strain a team of 10 with a 2-person QA department.

## Task 3: Tool-use — Orchestrate a multi-service deployment with health checks

**Goal:** Build a deployment workflow that ships three services in dependency order, runs health checks, and rolls back automatically on failure.

**Prompt**
```py
Build a Python CLI tool that orchestrates a multi-service deployment:

Services to deploy (in order):
1. auth-service (port 8001, health: GET /health, depends on: postgres)
2. order-service (port 8002, health: GET /health, depends on: postgres, redis, auth-service)
3. inventory-service (port 8003, health: GET /health, depends on: postgres, redis)

Requirements:
- Deploy services in dependency order (auth → orders → inventory)
- After each deploy, poll its health endpoint every 3 seconds for up to 60 seconds
- If a service fails health checks, roll back ALL previously deployed services in reverse order
- Log every action (deploy start, health pass/fail, rollback trigger) to stdout with timestamps
- Accept a --dry-run flag that validates the plan without deploying
- Accept a --skip-health-check flag that skips health polling (for non-critical deploys)

Show the control flow, retry logic, and rollback mechanism.
```

**What great looked like**
- Correct topological ordering based on declared dependencies
- Structured health-check polling with configurable timeout and interval
- Atomic rollback that reverses deployment order and handles partial failures
- Clean CLI interface with proper argument parsing and logging
- Separation between planning, execution, and rollback stages

### Tool-use results

| Model | Correctness (4) | Speed (3) | Clarity (3) | Total |
| --- | --- | --- | --- | --- |
| GLM-5 | 3.9 | 2.9 | 2.8 | **9.6** |
| GPT-5.3 | 3.8 | 2.8 | 2.8 | **9.4** |
| Claude Opus 4.7 | 3.6 | 2.6 | 2.8 | **9.0** |

**Why GLM-5 won the tool-use task:** it produced the most complete, immediately runnable deployment script. The answer included a proper topological sort using `graphlib`, a `Deployer` class with explicit `deploy`, `health_check`, and `rollback` methods, and the cleanest argument parsing with `argparse`. Its health-check loop used exponential backoff within the polling window (starting at 3s, increasing to 5s) and its rollback handler correctly caught exceptions from individual service rollbacks so one failed rollback didn't block the others. GPT-5.3 was a close second — slightly faster to arrive at the answer and equally clean on the CLI structure, but its rollback was marginally less robust around partial failure handling. Claude Opus 4.7 designed the system architecture well but was less implementation-specific, providing more pseudocode than production-ready Python.

## Model-by-model takeaways

### Claude Opus 4.7
- Best choice for **strategic reasoning and architecture decisions**
- Most nuanced model on constrained planning problems
- Excellent coder, but sometimes spends tokens on explanation before code

### GPT-5.3
- Best choice for **raw coding execution and fast iteration**
- Produces the most shippable code on the first attempt
- Strong all-around performer with the best speed-to-usable scores

### GLM-5
- Best choice for **deployment tooling and orchestration workflows**
- Surprisingly strong on multi-step operational tasks
- Competitive on reasoning — a legitimate alternative to US models at a better price point

## Why this scorecard matters

Public leaderboards are useful, but teams do not buy models to solve benchmark trivia. They buy them to ship code, make operating decisions, and survive messy real-world workflows. That is why we keep testing **operator-grade tasks** with transparent prompts and a stable rubric.

For outside calibration, we still track:
- **SWE-bench** for realistic software engineering tasks: [SWE-bench](https://www.swebench.com/)
- **Chatbot Arena** for broad user-preference signals: [LMArena](https://lmarena.ai/)
- **HumanEval** for code-generation sanity checks: [HumanEval](https://github.com/openai/human-eval)

Those benchmarks give context. This scorecard gives a decision.

## What to use today

- Pick **GPT-5.3** for coding agents and fast iteration cycles.
- Pick **Claude Opus 4.7** for architecture, migration planning, and high-stakes judgment calls.
- Pick **GLM-5** for deployment automation, DevOps workflows, and cost-sensitive orchestration.

For related reading, see our benchmark deep dives on [coding](/blog/2026-02-13-coding-benchmark/), [reasoning](/blog/2026-02-13-reasoning-benchmark/), and [tool-use](/blog/2026-02-13-tool-use-benchmark/).
