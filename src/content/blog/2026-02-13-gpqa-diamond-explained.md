---
title: 'What Is GPQA Diamond? The AI Scientific Reasoning Benchmark Explained'
description: 'GPQA Diamond tests AI models on PhD-level science questions. Learn how it works, current leaderboard scores, and what it reveals about AI reasoning capability.'
pubDate: '2026-02-13'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

**GPQA Diamond** is one of the hardest benchmarks in AI evaluation. It tests whether models can answer **PhD-level questions in biology, chemistry, and physics**—questions that most humans (including most PhDs outside their specialty) can't answer correctly.

If SWE-Bench tests engineering ability, GPQA Diamond tests **scientific reasoning depth**. Here's what it is and why it matters.

## What Is GPQA Diamond?

GPQA (Graduate-Level Google-Proof Q&A) is a dataset of 448 multiple-choice questions across biology, physics, and chemistry. The questions are designed to be:

1. **Google-proof**: You can't answer them by searching the web
2. **Expert-level**: Requires deep domain knowledge, not surface facts
3. **Validated**: Each question has been reviewed by domain experts

**GPQA Diamond** is the hardest subset: 198 questions where:
- Expert validators answered correctly
- Non-experts (even with web search) couldn't answer correctly
- Questions passed quality filters for clarity and accuracy

This is the "diamond" in the rough—questions that genuinely require expert-level reasoning.

## How It Works

Each GPQA Diamond question:
- Is multiple-choice (4 options)
- Covers biology, chemistry, or physics
- Requires reasoning, not recall
- Cannot be solved by simple web search

Example task types:
- Predicting the outcome of an organic synthesis
- Identifying the correct explanation for a quantum mechanics phenomenon
- Distinguishing between similar biological mechanisms

Models are evaluated in two settings:

1. **Zero-shot chain-of-thought**: Model explains reasoning, then answers
2. **Few-shot chain-of-thought**: Model sees 5 example Q&A pairs first

Scoring is strict: models must output the exact correct letter. Poor formatting can result in scores below random chance (25%).

## Current Leaderboard (Feb 2026)

| Rank | Model | Score |
|------|-------|-------|
| 1 | Claude Opus 4.6 | **71.8%** |
| 2 | GPT-5.2 | 69.4% |
| 3 | Gemini 2.5 Pro | 67.2% |
| 4 | Claude Sonnet 4.5 | 65.1% |
| 5 | GPT-4o | 59.8% |
| — | Expert human (PhD) | ~65-75%* |
| — | Non-expert human | ~25-30% |

*Human expert scores vary by domain. Physics PhDs do better on physics questions, etc.

**Key insight:** Top AI models now match or exceed human expert performance on GPQA Diamond. Claude Opus 4.6's 71.8% is within the range of domain experts.

## Why GPQA Diamond Matters

### Tests Deep Reasoning, Not Pattern Matching

Unlike benchmarks where models can memorize training data, GPQA Diamond requires:
- Understanding complex scientific concepts
- Applying reasoning to novel scenarios
- Distinguishing between plausible-but-wrong and correct answers

### Google-Proof by Design

Many benchmarks suffer from "data contamination"—models see test questions during training. GPQA was specifically constructed to avoid this by using novel, expert-written questions that don't appear in training corpora.

### Measures Scientific Capability

For teams building AI for research, healthcare, or scientific applications, GPQA Diamond is a useful proxy for:
- Can this model reason about complex technical domains?
- Will it hallucinate plausible-sounding but wrong scientific claims?
- Can it distinguish expert-level correct from incorrect answers?

## Limitations

GPQA Diamond isn't perfect:

1. **Small size**: Only 198 questions means high variance in scores
2. **Multiple-choice format**: Real scientific reasoning involves open-ended exploration
3. **Domain-limited**: Only biology, chemistry, physics—no social sciences or engineering
4. **Static**: Questions don't update as knowledge evolves

Also, some questions (~5-10%) may have issues—ambiguous wording, outdated assumptions, or multiple defensible answers. This is inherent to any expert-level benchmark.

## How to Interpret Scores

| Score Range | Interpretation |
|-------------|----------------|
| <30% | Model struggles with scientific reasoning; likely to hallucinate on technical topics |
| 30-50% | Can handle undergraduate-level science; unreliable for expert tasks |
| 50-65% | Solid general scientific reasoning; good for most applications |
| 65-75% | Expert-level performance; suitable for research assistance |
| >75% | Not yet achieved; would indicate superhuman scientific breadth |

## Practical Implications

### For Model Selection

If you're building tools for:
- **Scientific research**: Prioritize models with >65% GPQA Diamond scores
- **Medical/healthcare AI**: High GPQA scores correlate with better reasoning about clinical scenarios
- **Education (higher ed)**: Models with strong GPQA performance can tutor at advanced levels
- **General chatbots**: GPQA matters less; focus on other benchmarks

### For Understanding AI Progress

GPQA Diamond is one of the few benchmarks where AI has gone from "well below human" to "matching human" in under 2 years. In early 2024, top models scored ~35-40%. By early 2026, they're at 70%+.

This suggests AI scientific reasoning is advancing rapidly—faster than many expected.

## Related Benchmarks

| Benchmark | Focus | Difficulty |
|-----------|-------|------------|
| GPQA Diamond | PhD-level science | Very high |
| ARC-AGI | Abstract reasoning | Very high |
| MMLU-Pro | Professional knowledge | High |
| GPQA Extended | Same as Diamond, more questions | High |
| Humanity's Last Exam | Multi-domain expert reasoning | Extreme |

For a complete picture of model capability, evaluate across multiple benchmarks. GPQA Diamond alone doesn't tell the whole story.

## The Bottom Line

GPQA Diamond is the **gold standard for scientific reasoning benchmarks**. If you need an AI that can think like a scientist—understanding complex concepts, reasoning through novel problems, and avoiding hallucination on technical topics—look for models that score above 65%.

Current leaders (Claude Opus 4.6, GPT-5.2, Gemini 2.5 Pro) all clear this bar. The differences between them are small enough that other factors (cost, speed, ecosystem) may matter more for your use case.

---

**Related:**
- [GPT-5 vs Claude Opus 4 Comparison](/blog/2026-02-13-gpt5-vs-claude-opus/)
- [SWE-Bench Explained](/blog/2026-02-13-swebench-explained/)
- [Compare All Models](/compare/)
