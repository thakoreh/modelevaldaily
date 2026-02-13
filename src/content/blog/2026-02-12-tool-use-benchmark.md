---
title: 'Tool‑Use Benchmark: Who Actually Follows the Docs?'
description: 'Stripe webhook setup as a real-world test of CLI fluency and security hygiene across 5 frontier models.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

Tool use is where models quietly fail in production. It's easy to sound correct and still **miss the one step that prevents a security incident**. So we used a Stripe webhook setup task to measure **doc‑faithfulness** and **security hygiene**.

This is a single‑task eval, scored on a tight rubric. The goal is to see whether a model can follow docs, include key steps, and not skip verification.

## The prompt
```
You need to configure a Stripe webhook to listen for checkout.session.completed. Provide the minimal CLI steps and the endpoint handler skeleton.
```

## Rubric (10 points)
- **4 pts** — Includes correct CLI listen command (`stripe listen --forward-to`).
- **3 pts** — Mentions webhook secret verification.
- **3 pts** — Provides a handler stub with event parsing.

## Results (single‑task eval)

| Model | Score | Notes |
| --- | --- | --- |
| Claude Opus 4.6 | 9.3 | Complete instructions + best verification emphasis. |
| Kimi K2.5 | 8.7 | Strong doc alignment, good security notes. |
| 5.3‑Codex‑Spark | 8.8 | Correct CLI steps, adequate verification. |
| MiniMax M2.5 | 8.5 | Solid flow, minor gaps in security emphasis. |
| GLM‑5 | 8.4 | Fast response, but slight gaps in CLI pre‑steps. |

## What "great" looked like

A top answer **matches Stripe's doc flow** and includes signature verification.

**Minimal CLI flow (docs‑aligned):**
```bash
stripe login
stripe listen --forward-to localhost:3000/webhooks/stripe
```

**Handler skeleton (Node/Express style):**
```js
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    // handle event
  }

  res.json({ received: true })
})
```

## Operator analysis

- **Claude Opus 4.6** was the only model that consistently highlighted signature verification as non‑optional and emphasized security throughout.
- **Kimi K2.5** delivered strong doc‑faithful output with good security awareness at a competitive price.
- **5.3‑Codex‑Spark** gave correct steps but treated verification as slightly optional — a potential security miss.
- **GLM‑5** optimized for speed and slightly glossed over CLI pre‑steps, which can cause developer friction.

## Doc grounding (why this task is real)

We anchor doc‑based tool‑use evals against canonical sources:
- **Stripe Webhooks**: official webhook setup and event flow. [Stripe Webhooks](https://docs.stripe.com/webhooks)
- **Stripe CLI**: official CLI usage and listen command. [Stripe CLI](https://docs.stripe.com/stripe-cli)

This isn't theory — this is the exact onboarding many teams do in week one.

## Takeaways for builders

- **Best for secure, doc‑faithful output:** Claude Opus 4.6 wins here.
- **Best value:** Kimi K2.5 delivers strong quality at a lower price.
- **Fast drafts:** 5.3‑Codex‑Spark is fine, but audit security steps.
- **Never ship webhook code without signature verification.**

**Related:** full cross‑task summary in the [daily scorecard](/blog/2026-02-12-model-eval-scorecard/).
