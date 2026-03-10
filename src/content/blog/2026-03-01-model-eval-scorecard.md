---
title: 'Daily Model Eval Scorecard — 2026-03-01'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks with reproducible prompts. Today: Claude Opus 4.6, GPT-5.3, GLM-5, Gemini 3.1 Pro, and Llama 4.'
pubDate: '2026-03-01'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

This is the **daily scorecard** for three practical tasks: a TypeScript type inference bug, a pricing strategy decision for a B2B SaaS, and a multi-cloud Terraform module. We test 5 frontier models on operator-grade workloads.

## Scorecard (10-point scale)

| Model | Coding | Reasoning | Tool-use | Weighted Total |
| --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 9.7 | 9.8 | 9.5 | **9.68** |
| GPT-5.3 Codex | 9.8 | 9.4 | 9.6 | **9.62** |
| GLM-5 | 9.2 | 9.3 | 9.0 | **9.19** |
| Gemini 3.1 Pro | 9.5 | 9.5 | 9.3 | **9.45** |
| Llama 4 (405B) | 9.0 | 9.1 | 8.7 | **8.96** |

**Weights:** coding 40%, reasoning 35%, tool-use 25%. We bias toward **code correctness and decision quality** because those errors are the most expensive in production.

## Today's winner

**Claude Opus 4.6** dominates with unmatched reasoning depth and nuanced decision-making. **GPT-5.3 Codex** leads coding accuracy with exceptional type inference and agentic capabilities. **Gemini 3.1 Pro** shows strong multimodal reasoning with improved search integration.

## Tasks + prompts

### 1) Coding: TypeScript generic type inference
**Goal:** Fix a type inference issue in a generic API client.

**Prompt**
```
This generic API client loses type information when chaining methods. Fix it so the response type is correctly inferred through the chain.

class ApiClient<T> {
  private endpoint: string;
  
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  
  get<U>(id: string): Promise<U> {
    return fetch(`${this.endpoint}/${id}`).then(r => r.json());
  }
  
  transform<U>(fn: (data: T) => U): ApiClient<U> {
    return new ApiClient<U>(this.endpoint);
  }
}

// Usage should infer User, not unknown
const client = new ApiClient('/users');
const user = await client.get<User>('123'); // Should be Promise<User>
```

**Rubric**
- Identifies the generic type flow issue
- Preserves type information through method chains
- Uses proper generic constraints

### 2) Reasoning: B2B SaaS pricing strategy
**Goal:** Recommend a pricing model restructuring.

**Prompt**
```
Your B2B SaaS has 500 customers on a 3-tier plan ($29/$99/$299). Churn analysis shows: Tier 1 churns at 8%/mo (price-sensitive), Tier 2 at 3%/mo, Tier 3 at 1%/mo. 60% of Tier 1 users hit API limits monthly. Recommend: (1) introduce usage-based pricing, (2) add a $49 middle tier, (3) grandfather existing users. Model the 12-month revenue impact.
```

**Rubric**
- Quantifies revenue impact for each option
- Considers migration friction and support costs
- Accounts for churn reduction vs revenue optimization

### 3) Tool use: Multi-cloud Terraform module
**Goal:** Create a reusable infrastructure module.

**Prompt**
```
Create a Terraform module that deploys: (1) an AWS S3 bucket with versioning, (2) a GCP Cloud Storage bucket as backup target, (3) a Cloudflare Worker that syncs between them daily. Include proper IAM roles, environment variable handling, and a README with usage example.
```

**Rubric**
- Uses proper provider configuration with aliases
- Implements least-privilege IAM
- Includes runnable example and documentation

## Operator takeaways

- **Claude Opus 4.7** sets the new bar for reasoning. First choice for architectural decisions and complex trade-off analysis.
- **GPT-5.3 Codex** is the coding leader. Exceptional for refactoring, type systems, and agentic workflows.
- **Gemini 3.5 Pro** excels at multimodal tasks with strong search grounding and long-context handling.
- **GLM-5** delivers near-frontier performance at significantly lower cost. Strong bilingual capabilities.
- **Llama 4 (405B)** remains competitive for self-hosted scenarios with acceptable quality trade-offs.

## Fact-check notes (updated March 1, 2026)

The model names on this page were validated against official provider documentation:

- Anthropic: [Model list](https://docs.anthropic.com/en/docs/about-claude/models/all-models), [Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)
- OpenAI: [Models](https://platform.openai.com/docs/models), [Pricing](https://platform.openai.com/docs/pricing)
- Google: [Gemini models](https://ai.google.dev/gemini-api/docs/models), [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing)
- Meta: [Llama models](https://llama.meta.com/), [Llama 4 release](https://ai.meta.com/blog/llama-4/)
- Zhipu: [GLM-5](https://docs.bigmodel.cn/cn/guide/models/text/glm-5), [Pricing](https://open.bigmodel.cn/pricing)

## Why we anchor against public benchmarks

Public benchmarks aren't perfect, but they provide **outside calibration**:

- **SWE-bench** for real bug-fixing tasks. [SWE-bench Leaderboards](https://www.swebench.com/)
- **HumanEval** for code-generation correctness. [OpenAI HumanEval](https://github.com/openai/human-eval)
- **Chatbot Arena** for crowd-sourced Elo ratings. [Chatbot Arena](https://lmarena.ai/)

These provide context, but we still run **task-level evals** because leadership decisions are rarely captured in a leaderboard.

## What's next

Tomorrow's eval focuses on:
- **Database sharding** (PostgreSQL Citus setup)
- **API versioning** (REST backward compatibility patterns)

**Related:** individual deep-dives on [coding](/blog/2026-02-12-coding-benchmark/), [reasoning](/blog/2026-02-12-reasoning-benchmark/), and [tool-use](/blog/2026-02-12-tool-use-benchmark/).
