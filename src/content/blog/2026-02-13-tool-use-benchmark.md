---
title: 'Tool-use Benchmark Deep Dive — Stripe Webhooks (Feb 13)'
description: 'Production-ready Stripe webhook integration with signature verification, idempotency, and retries. How Claude, Codex-Spark, and Kimi compared on docs-driven tasks.'
pubDate: '2026-02-13'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

This deep dive expands on the tool-use task from today's [daily scorecard](/blog/2026-02-13-model-eval-scorecard/). We examine how Claude Opus 4.6, 5.3-Codex-Spark, and Kimi K2.5 handled a docs-driven Stripe webhook integration.

## Task Context

**Scenario:** Set up Stripe webhook handling for subscription events in a Node.js/Express app.

**Requirements:**
- Verify Stripe signatures
- Handle idempotency (prevent duplicate processing)
- Log all events to Postgres
- Retry on transient failures

**Constraints:**
- Must follow Stripe's best practices
- Must be production-ready (error handling, logging)
- Should not over-engineer

## The Prompt

> Set up Stripe webhook handling for subscription events. Requirements: verify signatures, handle idempotency, log all events to Postgres, retry on transient failures. Provide production-ready code.

## Scoring Rubric (10 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Correctness | 4 | Signature verification, idempotency, error handling, retries |
| Speed-to-usable | 3 | Code is deployable, follows best practices |
| Clarity | 3 | Explains security considerations, edge cases |

## Results Table

| Model | Score | Correctness | Speed | Clarity |
|-------|-------|-------------|-------|---------|
| Claude Opus 4.6 | 9.2 | 3.8 | 3.0 | 2.4 |
| 5.3-Codex-Spark | 9.1 | 3.8 | 2.9 | 2.4 |
| Kimi K2.5 | 8.9 | 3.7 | 2.8 | 2.4 |

## What Great Looked Like

**Claude Opus 4.6** provided a solution that followed Stripe's best practices without over-engineering:

### 1. Signature Verification with Timestamp Tolerance

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const payload = req.body;

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Log raw event before processing
  await logEventToPostgres(event);

  // Process with built-in idempotency
  await handleEvent(event);

  res.json({ received: true });
});
```

Claude's key insight: **Use Stripe's built-in idempotency keys**, not custom dedup tables.

### 2. Built-in Idempotency

Claude noted that Stripe includes an `id` field on every event object, which serves as a natural idempotency key:

```javascript
async function handleEvent(event) {
  // Check if we've already processed this event
  const existing = await db.query(
    'SELECT id FROM processed_events WHERE stripe_event_id = $1',
    [event.id]
  );

  if (existing.rows.length > 0) {
    console.log(`Event ${event.id} already processed, skipping`);
    return;
  }

  // Process event
  await processEvent(event);

  // Mark as processed
  await db.query(
    'INSERT INTO processed_events (stripe_event_id, processed_at) VALUES ($1, NOW())',
    [event.id]
  );
}
```

### 3. Exponential Backoff for Retries

```javascript
async function processEventWithRetry(event, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await processEvent(event);
      return;
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
}
```

### 4. Timestamp Tolerance

Claude mentioned Stripe's default 5-minute tolerance for timestamp checks in signature verification:

> Stripe's webhook signatures include a timestamp. The `constructEvent` method checks this timestamp with a 5-minute tolerance by default. If your server clock drifts or requests are delayed, this prevents false rejections.

## Common Failure Modes

**Over-engineering custom dedup:** Kimi K2.5 implemented a custom deduplication table with hash-based fingerprinting when Stripe's event ID is sufficient. This adds complexity without benefit.

**Missing timestamp tolerance context:** 5.3-Codex-Spark implemented signature verification correctly but didn't explain the 5-minute tolerance window, leaving engineers confused if they encounter clock drift issues.

**Not logging raw payloads:** Some runs jumped straight to processing without logging the raw event for debugging. Claude logged before processing, which is critical for troubleshooting webhook issues.

## Code Comparison

### Claude Opus 4.6 (Recommended)

Claude's solution was ~80 lines, included all requirements, and followed Stripe's documented patterns. It used Stripe's event ID for idempotency, logged raw payloads, and explained the timestamp tolerance.

### Kimi K2.5 (Over-engineered)

Kimi's solution was ~150 lines and included:
- Custom hash-based event fingerprinting
- A separate `event_dedup` table with TTL management
- Redundant signature verification logic

This works but adds operational overhead (TTL cleanup jobs, additional indexes) without clear benefit.

## Security Considerations

All three models correctly implemented signature verification, but only Claude and Codex-Spark mentioned:

1. **Webhook secret rotation:** Rotate secrets periodically and support multiple secrets during rotation
2. **Timing attacks:** Use constant-time comparison (Stripe's SDK handles this)
3. **Replay attacks:** Stripe's timestamp check prevents replays outside the 5-minute window

## Reproduction Steps

To reproduce this eval:

1. Present the prompt to each model
2. Score on:
   - Correct signature verification using Stripe SDK
   - Idempotency using Stripe's event ID (not over-engineered)
   - Raw event logging before processing
   - Retry logic with exponential backoff
3. Deduct points for over-engineering (custom dedup tables, redundant logic)

## Takeaways

- Use Stripe's built-in idempotency keys — don't roll custom dedup
- Log raw payloads before processing for debugging
- Explain timestamp tolerance so engineers understand clock drift edge cases
- Keep it simple: ~80 lines > ~150 lines if both meet requirements

---

Back to [today's scorecard](/blog/2026-02-13-model-eval-scorecard/).
