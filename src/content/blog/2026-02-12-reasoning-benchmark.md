---
title: 'Reasoning Benchmark: Build vs Buy Under Deadline'
description: 'We compared models on a high-pressure product decision with real constraints.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

We asked each model to decide build vs buy for a QA dashboard with 2 weeks to ship.

## Prompt
```
Your team of 8 needs a lightweight QA automation dashboard in 2 weeks. Off-the-shelf tools cost $600/mo and don't match your workflow. Recommend build vs buy, with a decision matrix.
```

## Results
- **Claude 3.5**: Strong decision matrix + recommends buy, then customize.
- **GPT-4.2**: Balanced but too cautious; recommendation unclear.
- **GLM-5**: Decisive build recommendation but underestimates maintenance.

## Rubric
- Mentions time-to-value, maintenance, opportunity cost
- Presents decision matrix or equivalent
- Concludes decisively

## Takeaways
Models that are decisive and transparent win in real leadership contexts.
