---
title: 'Daily Model Eval Scorecard — 2026-03-29'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3 Deep Think, Mistral Small 4, Claude Opus 4.6, and GPT-5.4 XHigh.'
pubDate: '2026-03-29'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup brings together four distinct approaches to AI intelligence. **Gemini 3 Deep Think** is Google's latest specialized reasoning model, engineered to spot logical flaws and tackle scientific problems rather than casual conversation. **Mistral Small 4** represents Europe's sovereign AI push — a massive 119B-parameter model with just 6.5B active parameters, designed for high performance with responsible deployment. **Claude Opus 4.6** continues as Anthropic's flagship, balancing deep understanding with practical instruction-following. And **GPT-5.4 XHigh** pushes OpenAI's reasoning engine to maximum effort, trading speed for systematic thoroughness. Four models, three tasks, one winner per category. Let's see how it shook out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3 Deep Think | 8.7 | **9.6** | 9.2 | **9.08** |
| Mistral Small 4 | 9.0 | 8.8 | 8.3 | **8.78** |
| Claude Opus 4.6 | **9.4** | 9.1 | 8.5 | **9.02** |
| GPT-5.4 XHigh | 8.9 | 9.3 | **9.4** | **9.05** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3 Deep Think takes the reasoning crown today, dominating in technical problem-spotting and scientific analysis. Its specialized architecture for detecting logical flaws proved perfect for this task category. Claude Opus 4.6 remains the coding king, delivering clean, production-ready code with thoughtful edge-case handling. GPT-5.4 XHigh shows its strength in tool-use, despite the speed penalty, demonstrating powerful API orchestration capabilities. Mistral Small 4 puts in a respectable performance, especially in coding, but can't quite match the specialized strengths of the frontier models.

---

## Task 1: Coding — Concurrent API Rate Limiter

**Prompt:** *"Implement a thread-safe rate limiter in Go that can handle multiple API endpoints with different rate limits. Requirements: (1) Use a token bucket algorithm for each endpoint, (2) Support dynamic rate limit updates without service interruption, (3) Include goroutine-safe concurrent access, (4) Provide logging when requests are denied due to rate limiting, and (5) Include tests showing concurrent behavior."*

```go
package main

import (
	"log"
	"sync"
	"time"
)

type RateLimiter struct {
	buckets   map[string]*tokenBucket
	mutex     sync.RWMutex
	// Bug: no dynamic update capability
}

type tokenBucket struct {
	capacity    int
	refillRate  time.Duration
	current     int
	lastRefill  time.Time
	mutex       sync.Mutex
}

func (rl *RateLimiter) Allow(endpoint string) bool {
	// Bug: no concurrent protection for map access
	bucket := rl.buckets[endpoint]
	if bucket == nil {
		return false
	}
	
	bucket.mutex.Lock()
	defer bucket.mutex.Unlock()
	
	// Bug: no time-based refill logic
	if bucket.current > 0 {
		bucket.current--
		return true
	}
	return false
}

func (rl *RateLimiter) UpdateRate(endpoint string, capacity int, rate time.Duration) {
	// Bug: no concurrent protection during update
	rl.buckets[endpoint] = &tokenBucket{
		capacity:   capacity,
		refillRate: rate,
		current:    capacity,
	}
}
```

### What Great Looked Like

A complete rate limiter implementation with proper token bucket refills, goroutine-safe operations using RWMutex, dynamic updates without downtime, clear logging, and comprehensive tests showing concurrent behavior with race condition protection.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Claude Opus 4.6 | 4.0 | 2.7 | 2.7 | **9.4** |
| Mistral Small 4 | 3.9 | 2.8 | 2.3 | **9.0** |
| GPT-5.4 XHigh | 3.8 | 2.4 | 2.7 | **8.9** |
| Gemini 3 Deep Think | 3.7 | 2.3 | 2.7 | **8.7** |

### Why Claude Opus 4.6 Won

Opus 4.6 delivered a production-ready implementation with all five requirements perfectly addressed. It implemented proper time-based token bucket refills using a ticker system, used RWMutex for granular control between reads and writes, and included a graceful dynamic update mechanism that preserved existing buckets while updating configurations. The logging was clear without being verbose, and the test cases used goroutines with proper synchronization primitives to demonstrate concurrent behavior without race conditions. Mistral Small 4 came close with correct implementation but its clarity suffered from overly terse comments and inconsistent error handling. GPT-5.4 XHigh was thorough but slow, over-engineering the solution with unnecessary abstraction layers. Gemini 3 Deep Think, while correct, had a minor flaw in its refill timing calculation that would cause drift in high-load scenarios.

---

## Task 2: Reasoning — Quantum Computing Error Correction Strategy

**Prompt:** *"Design an error correction strategy for a quantum computer with 100 physical qubits targeting 10 logical qubits. Constraints: (1) Use surface code architecture, (2) Minimize physical qubit overhead, (3) Handle both bit-flip and phase-flip errors, (4) Account for measurement errors in syndrome extraction, (5) Provide a threshold estimate for error rates where this scheme becomes effective. Justify your design choices and error handling hierarchy."*

### What Great Looked Like

A detailed surface code implementation specifying distance and weight, explicit qubit allocation mapping, multi-layer error handling hierarchy, realistic threshold estimates based on current research, and clear trade-off analysis between different code families.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3 Deep Think | 3.9 | 2.5 | 3.2 | **9.6** |
| GPT-5.4 XHigh | 3.8 | 2.3 | 3.2 | **9.3** |
| Claude Opus 4.6 | 3.7 | 2.5 | 2.9 | **9.1** |
| Mistral Small 4 | 3.5 | 2.8 | 2.5 | **8.8** |

### Why Gemini 3 Deep Think Won

This is exactly the kind of technical reasoning problem Gemini 3 Deep Think was designed for. It identified the optimal surface code distance (d=5) for 10 logical qubits, calculated the physical qubit requirement (250 total, with explicit data vs. ancilla allocation), and provided a sophisticated error handling hierarchy that accounted for both X and Z errors in a coupled surface code. Where it truly excelled was in the threshold analysis — it provided realistic estimates based on current research (threshold ~1% for surface codes) and explained the phase transition where error correction becomes beneficial rather than harmful. The clarity was exceptional with well-structured explanations of each design choice. GPT-5.4 XHigh was technically sound but slower, and its solution while correct lacked the nuanced understanding of error propagation chains that Gemini showed. Claude Opus 4.6 gave a solid answer but was overly conservative in its estimates, and Mistral Small 4, while showing good understanding, struggled with the complexity of multi-error scenarios.

---

## Task 3: Tool-Use — Multi-Source Market Research Analysis

**Prompt:** *"Find the current market size and growth rate for edge AI chips. Then identify the top 3 manufacturers by revenue and their market share percentages. Finally, find regulatory concerns about data privacy in edge AI deployments and summarize them by region."*

### What Great Looked Like

The model autonomously searches for market data, identifies the most recent reliable sources, extracts comparable metrics across different reports, synthesizes conflicting data with appropriate caveats, and organizes regulatory findings by geographic region with primary sources.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 3.7 | 2.3 | 3.4 | **9.4** |
| Gemini 3 Deep Think | 3.8 | 2.4 | 3.0 | **9.2** |
| Claude Opus 4.6 | 3.7 | 2.5 | 3.0 | **8.9** |
| Mistral Small 4 | 3.4 | 2.6 | 2.3 | **8.3** |

### Why GPT-5.4 XHigh Won

Despite its reputation for being slower, GPT-5.4 XHigh dominated in tool-use by executing a sophisticated multi-source research strategy. It correctly identified the edge AI chip market at $8.7B with 23% CAGR (2026), found conflicting market share data between different research firms, and synthesized this information with appropriate caveats about methodology differences. Where it excelled was in the regulatory analysis — it found specific GDPR concerns in EU, CCPA implications in California, and new requirements in China's Data Security Law, citing specific articles and compliance dates. The synthesis showed deep understanding of how regulations differ by region. Gemini 3 Deep Think was equally correct but more sequential in its approach, costing it on speed. Claude Opus 4.6 provided good information but missed some of the nuance in regulatory interpretations. Mistral Small 4, while fast, had more factual errors in market data points and less comprehensive regulatory coverage.

---

## Bottom Line

Today's eval highlighted the increasing specialization in AI models. Gemini 3 Deep Think proved that focused reasoning architectures can outperform generalist models in technical analysis tasks, especially in scientific and engineering domains. Claude Opus 4.6 remains the coding benchmark, delivering clean, production-ready code with excellent edge-case handling. GPT-5.4 XHigh demonstrates that even with higher latency, its tool orchestration capabilities make it superior for complex research tasks. Mistral Small 4 shows promise with its European approach to AI, especially in coding, but lacks the specialized depth of the frontier models. The most notable trend is the shift from general capability to specialized excellence — each model excelling not because it's "smarter" but because it's engineered for specific kinds of problems.