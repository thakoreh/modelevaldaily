---
title: 'Reasoning Benchmark: Build vs Buy Under Deadline'
description: 'A high-pressure product decision scored on clarity, tradeoffs, and decisiveness.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

This is a **real leadership decision** we see constantly: build vs buy under a hard deadline. The task isn’t to be safe; it’s to be decisive with tradeoffs.

We tested three models on a **two‑week delivery scenario** with costs, constraints, and ambiguity. Scoring emphasized **decision quality** (not just verbosity): can the model pick a path, articulate tradeoffs, and give a credible execution plan?

## The prompt
```
Your team of 8 needs a lightweight QA automation dashboard in 2 weeks. Off-the-shelf tools cost $600/mo and don't match your workflow. Recommend build vs buy, with a decision matrix.
```

## Rubric (10 points)
- **4 pts** — Mentions time‑to‑value, maintenance cost, and opportunity cost.
- **3 pts** — Provides a decision matrix or clear tradeoff table.
- **3 pts** — Concludes decisively (not “it depends”).

## Results (single‑task eval)
| Model | Score | Notes |
| --- | --- | --- |
| Claude 3.5 | 9.2 | Strong matrix + buy‑then‑customize recommendation. |
| GPT‑4.2 | 8.4 | Balanced reasoning, but recommendation was soft. |
| GLM‑5 | 8.1 | Decisive build call, underestimates maintenance. |

## What “great” looked like
A strong answer makes the decision **explicit**, then backs it with a tradeoff matrix and a credible plan.

**Example decision matrix (simplified):**

| Factor | Build | Buy |
| --- | --- | --- |
| Time to value (2 weeks) | Risky | Strong ✅ |
| Fit to workflow | High | Medium |
| Ongoing maintenance | High cost | Low‑medium cost ✅ |
| Opportunity cost | High | Low ✅ |
| Long‑term flexibility | High ✅ | Medium |

**Winning pattern:** recommend **buy now + customize** while maintaining a path to build later if the tool becomes strategic.

## Operator analysis
- **Claude won** because it treated the deadline as binding and shifted optimization to *time‑to‑value*, not ideological purity. That’s how real teams win.
- **GPT‑4.2** did a good analysis but hedged. In leadership contexts, hedging loses time.
- **GLM** was decisive but naive on maintenance and resourcing costs, which matters when you only have 2 weeks.

## How this maps to public benchmarks
Real‑world decision quality doesn’t show up in raw test scores. But it correlates with **reasoning consistency** in public evaluations:
- **Chatbot Arena** (crowdsourced Elo ratings across model responses). [Chatbot Arena](https://openlm.ai/chatbot-arena/)
- **HELM** (multi‑metric evaluation with transparency). [Stanford HELM](https://github.com/stanford-crfm/helm)

Our reasoning task is intentionally short and high‑pressure to simulate leadership choices under constraint rather than academic proofs.

## Takeaways for builders
- **If you need decisive leadership answers:** Claude is the safest bet here.
- **If you need balanced analysis:** GPT‑4.2 is solid, but you must force a decision.
- **If you want speed and boldness:** GLM can help, but validate assumptions.

## How to re‑run this eval
1. Use the exact prompt above.
2. Score against the rubric (10 points).
3. Keep a decision matrix artifact for audit.

**Related:** full cross‑task summary in the [daily scorecard](/blog/2026-02-12-model-eval-scorecard/).
