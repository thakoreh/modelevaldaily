---
title: 'Daily Model Eval Scorecard — 2026-03-28'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Claude Opus 4.6, GPT-5.4 XHigh, Gemini 3.1 Pro Preview, and MiniMax 2.7.'
pubDate: '2026-03-28'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup brings together four very different philosophies. **Claude Opus 4.6** is Anthropic's flagship, betting everything on deep understanding and precise instruction-following. **GPT-5.4 XHigh** pushes OpenAI's reasoning engine to maximum effort — slower token-by-token, but systematically thorough. **Gemini 3.1 Pro Preview** from Google represents the search giant's latest attempt to unseat the leaders, with enhanced multimodal capabilities and aggressive optimization. And **MiniMax 2.7**, the open-weight contender, continues to prove that you don't need a walled garden to compete. Four models, three tasks, one winner per category. Let's see how it shook out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Claude Opus 4.6 | **9.4** | 9.2 | 8.8 | **9.13** |
| GPT-5.4 XHigh | 9.1 | **9.6** | 8.6 | **9.07** |
| Gemini 3.1 Pro Preview | 8.9 | 9.1 | **9.2** | **8.98** |
| MiniMax 2.7 | 8.8 | 9.3 | 8.7 | **8.83** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Claude Opus 4.6 takes the overall crown today by winning coding outright and staying competitive everywhere else. GPT-5.4 XHigh dominated reasoning — as expected when you crank the effort dial to max — but its latency cost it in the other categories. Gemini 3.1 Pro Preview made a strong showing in tool-use, leveraging Google's search infrastructure with impressive parallelization. And MiniMax 2.7? For a model you can run yourself, it's terrifyingly close to the proprietary leaders — especially in reasoning, where it nearly matched GPT-5.4 while being significantly faster.

---

## Task 1: Coding — React Component Memory Leak

**Prompt:** *"Fix the memory leak in this React component. The issue: when the component unmounts, the interval doesn't get cleared, and the state updates continue to happen. Provide the corrected code with comments explaining the fix, plus a brief test to verify the cleanup works."*

```jsx
import React, { useState, useEffect } from 'react';

function Timer({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Bug: no cleanup on unmount
    return () => {
      // Missing: clearInterval(timer)
    };
  }, [seconds]);
  
  return (
    <div className="timer">
      {timeLeft} seconds remaining
    </div>
  );
}

export default Timer;
```

### What Great Looked Like

A corrected component with proper cleanup, clear comments explaining why the cleanup is necessary, and a test that verifies the interval is properly cleared when the component unmounts.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 4.0 | 2.7 | 2.7 | **9.4** |
| GPT-5.4 XHigh | 3.9 | 2.3 | 2.9 | **9.1** |
| MiniMax 2.7 | 3.8 | 2.5 | 2.5 | **8.8** |
| Gemini 3.1 Pro Preview | 3.7 | 2.7 | 2.5 | **8.9** |

### Why Claude Opus 4.6 Won

Opus 4.6 nailed the memory leak fix immediately, adding `clearInterval(timer)` in the cleanup function. But what set it apart was the explanation — it noted that while the existing code does clear the interval when `prev <= 1`, it only happens *during* execution, not on unmount. The test was clever, creating a component that mounts and unmounts rapidly and checking that no pending state updates occur after unmount. GPT-5.4 XHigh was equally correct but slower, overthinking the edge cases. MiniMax 2.7's fix worked but the test was incomplete — it didn't account for race conditions between unmount and interval triggers. Gemini 3.1 Pro Preview got the fix right but the explanation was generic React boilerplate rather than specific to memory leaks.

---

## Task 2: Reasoning — API Service Architecture Trade-offs

**Prompt:** *"You're designing an API service that will handle both read-heavy (90% read, 10% write) and write-heavy (50% read, 50% write) workloads. Your team has experience with relational databases (PostgreSQL) but not NoSQL. Constraints: must support ACID transactions, have predictable latency (<50ms p95), and scale to 10M users with 10k RPS. Which database architecture do you choose, and why? Consider: (1) single instance vs read replicas, (2) connection pooling strategy, (3) indexing approach for mixed workloads. Trade off complexity vs performance."*

### What Great Looked Like

A clear architectural decision with trade-off analysis, specific implementation recommendations, and explicit acknowledgment of what's being sacrificed for performance. The answer should acknowledge the team's PostgreSQL expertise while suggesting the right balance of simplicity and scalability.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 3.9 | 2.5 | 3.2 | **9.6** |
| MiniMax 2.7 | 3.7 | 2.8 | 2.6 | **9.3** |
| Claude Opus 4.6 | 3.8 | 2.4 | 2.9 | **9.2** |
| Gemini 3.1 Pro Preview | 3.6 | 2.6 | 2.9 | **9.1** |

### Why GPT-5.4 XHigh Won

This was a textbook reasoning problem for XHigh. It identified PostgreSQL with read replicas as the right starting point, then broke down the trade-offs beautifully: "read replicas solve the 90/10 problem but create consistency complexity for the 50/50 case — here's how you mitigate that." The connection pooling recommendation was specific (PgBouncer with 2-3x max connections vs expected queries) and acknowledged the team's PostgreSQL expertise while nudging toward modern practices. What sealed it was the indexing strategy — it suggested a hybrid approach with covering indexes for read-heavy paths and partial indexes for write-heavy ones, with clear benchmarks showing expected performance impact. MiniMax 2.7 was close on the architecture choice but thin on implementation details. Claude Opus 4.6 was thorough but overly conservative, suggesting more complexity than necessary for the team's experience level.

---

## Task 3: Tool-Use — Competitive Product Analysis

**Prompt:** *"Find the current top 3 competitors to GitHub Copilot. For each, get: (1) pricing per developer per month, (2) key features differentiating them from Copilot, (3) at least 2 user reviews mentioning code quality improvement. Present this in a comparison table with sources."*

### What Great Looked Like

The model autonomously searches for GitHub Copilot alternatives, identifies accurate pricing, finds recent reviews, and presents a clean comparison table with proper citations. Should show awareness of both direct competitors (like Cursor) and adjacent tools (like CodeSandbox).

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 3.8 | 2.9 | 2.5 | **9.2** |
| Claude Opus 4.6 | 3.7 | 2.5 | 2.6 | **8.8** |
| MiniMax 2.7 | 3.5 | 2.8 | 2.4 | **8.7** |
| GPT-5.4 XHigh | 3.7 | 2.1 | 2.8 | **8.6** |

### Why Gemini 3.1 Pro Preview Won

Google's latest model leveraged its search infrastructure brilliantly, finding pricing information from official sources, recent reviews from developer forums, and differentiators from product documentation. It correctly identified Cursor ($20/month), CodeSandbox Teams ($12/month), and Tabnine ($8-15/month tiered) as the top competitors, with specific features like Cursor's "AI-first IDE" approach and CodeSandbox's browser-based environment. The review snippets were particularly well-chosen — real quotes about code quality from Reddit and Hacker News rather than generic marketing copy. GPT-5.4 XHigh was thorough but painfully slow, re-searching and second-guessing its results. Claude Opus 4.6 did everything right but sequentially, costing it on speed. MiniMax 2.7 mixed up some pricing tiers and included outdated information about Tabnine's free tier.

---

## Bottom Line

Today's eval reinforced a pattern we keep seeing: there is no single best model, only the best model for the job. Claude Opus 4.6 remains the coding king, with its surgical precision in debugging and architectural fixes. GPT-5.4 XHigh earns its weight in reasoning-heavy tasks — if you can afford the latency. Gemini 3.1 Pro Preview shows that Google's search integration pays dividends in tool-use tasks, especially when research speed matters. MiniMax 2.7 continues to impress as an open-weight model that punches well above its weight, particularly in reasoning where it nearly matched the proprietary leaders. The gap between open and closed is shrinking fast, and the competition is driving innovation across all dimensions.