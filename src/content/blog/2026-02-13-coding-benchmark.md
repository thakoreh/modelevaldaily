---
title: 'Coding Benchmark Deep Dive — Race Condition Fix (Feb 13)'
description: 'Full breakdown of how Claude, Codex-Spark, and Kimi handled a race condition bug in async Node.js handlers. Includes prompts, rubric, and failure modes.'
pubDate: '2026-02-13'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

This deep dive expands on the coding task from today's [daily scorecard](/blog/2026-02-13-model-eval-scorecard/). We examine exactly how Claude Opus 4.6, 5.3-Codex-Spark, and Kimi K2.5 handled a real-world race condition bug.

## Task Context

**Scenario:** A B2B SaaS product has a Node.js async handler that updates a user record and sends a notification email. Under load, some users receive duplicate emails. The engineering team needs a minimal, production-ready fix.

**Constraints:**
- Must handle concurrent requests safely
- Must include proper error handling
- Should be minimal and readable
- Must suggest tests

## The Prompt

> You have a Node.js async handler that updates a user record and sends a notification email. Under load, some users receive duplicate emails. Diagnose the race condition and provide a minimal, production-ready fix with proper error handling.

## Scoring Rubric (10 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Correctness | 4 | Fixes the race condition, handles errors, no new bugs |
| Speed-to-usable | 3 | Solution is minimal, readable, deployable as-is |
| Clarity | 3 | Explanation is clear, identifies root cause, suggests tests |

## Results Table

| Model | Score | Correctness | Speed | Clarity |
|-------|-------|-------------|-------|---------|
| Claude Opus 4.6 | 9.6 | 4.0 | 3.0 | 2.6 |
| 5.3-Codex-Spark | 9.5 | 4.0 | 3.0 | 2.5 |
| Kimi K2.5 | 8.9 | 3.8 | 2.8 | 2.3 |

## What Great Looked Like

**Claude Opus 4.6** identified the missing idempotency key as the root cause within the first sentence. The solution was a 15-line middleware that:

1. Generated a deterministic idempotency key from `userId + action`
2. Checked Redis for existing key before processing
3. Set key with 5-minute TTL on first request
4. Returned cached response if key existed

The explanation was concise:
> "The race occurs when two concurrent requests for the same user both pass the 'has email been sent?' check before either completes. The fix is to check-and-set an idempotency key atomically before processing."

Claude also suggested:
- Integration test with 10 concurrent requests
- Load test with 100 RPS
- Monitor for duplicate email metrics

## Common Failure Modes

**Over-engineering:** Kimi K2.5 suggested a distributed lock pattern with Redlock when a simple idempotency key would suffice. This adds operational complexity (Redis cluster) without benefit for this use case.

**Missing error handling:** Some runs didn't handle the case where Redis is unavailable. The fix should fall back to processing (with logging) rather than failing closed.

**No test suggestions:** Models that didn't suggest tests lost points in the Clarity criterion.

## Code Comparison

### Claude Opus 4.6 (Recommended)

```javascript
// middleware/idempotency.js
const redis = require('../lib/redis');

module.exports = (action) => async (req, res, next) => {
  const key = `idempotency:${req.user.id}:${action}`;
  const cached = await redis.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  res.originalJson = res.json;
  res.json = async (body) => {
    await redis.setex(key, 300, JSON.stringify(body));
    res.originalJson(body);
  };
  
  next();
};
```

### Kimi K2.5 (Over-engineered)

Kimi's solution used Redlock for distributed locking:

```javascript
// Requires Redis cluster + Redlock library
const Redlock = require('redlock');
const redlock = new Redlock([redis]);

module.exports = (action) => async (req, res, next) => {
  const lock = await redlock.lock(`locks:${req.user.id}:${action}`, 5000);
  try {
    // ... process request
  } finally {
    await lock.unlock();
  }
};
```

This works but adds operational burden (Redis cluster, lock monitoring) for a problem that doesn't require distributed coordination.

## Reproduction Steps

To reproduce this eval:

1. Set up a Node.js Express handler that updates a user and sends email
2. Use `ab` or `wrk` to send 10 concurrent requests for the same user
3. Observe duplicate emails in logs
4. Apply idempotency middleware fix
5. Re-run load test, verify single email per user

## Takeaways

- Claude and Codex-Spark both provided production-ready fixes
- Kimi's solution was correct but over-engineered for the problem
- Clear explanation of root cause separated top performers from the pack
- Test suggestions are table stakes for production readiness

---

Back to [today's scorecard](/blog/2026-02-13-model-eval-scorecard/).
