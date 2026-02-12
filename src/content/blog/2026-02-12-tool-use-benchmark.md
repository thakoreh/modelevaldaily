---
title: 'Tool-Use Benchmark: Who Actually Follows the Docs?'
description: 'A practical benchmark on webhook setup and CLI fluency across top models.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

Most benchmarks ignore tool use. We tested three models on a real Stripe webhook setup task.

## Prompt
```
You need to configure a Stripe webhook to listen for checkout.session.completed. Provide the minimal CLI steps and the endpoint handler skeleton.
```

## Results
- **Claude 3.5**: Complete, clean instructions + verification step.
- **GPT-4.2**: Correct CLI steps but omitted signature verification.
- **GLM-5**: Fastest response, but skipped CLI install step.

## Rubric (10 points)
- 4 points: correct CLI command
- 3 points: verification step included
- 3 points: handler skeleton present

## Takeaways
If you only care about speed, GLM is fine. If you care about secure setup, Claude wins.
