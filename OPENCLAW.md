# OpenClaw Autopilot Instructions — AIModelBenchmarks.com

## Mission

Grow AIModelBenchmarks.com to 1,000+ daily visitors through consistent, high-quality content production, SEO optimization, and site improvements. The site publishes daily AI model benchmark scorecards and in-depth evaluation articles targeting engineers, product teams, and technical leaders choosing AI models for production.

**Domain:** https://aimodelbenchmarks.com
**Stack:** Astro 5, MDX, deployed on Vercel
**Content directory:** `src/content/blog/`

---

## Content Production Playbook

### Daily Tasks (Priority: Critical)

**1. Publish a daily scorecard post**

Create a new file: `src/content/blog/YYYY-MM-DD-model-eval-scorecard.md`

Every scorecard must include:
- Frontmatter: `title`, `description` (SEO-optimized, 150-160 chars), `pubDate`, `heroImage`
- A cross-task comparison table (Coding / Reasoning / Tool-use scores for 3+ models)
- The exact prompt used for each task
- Scoring rubric (10-point scale: 4 pts correctness, 3 pts speed-to-usable, 3 pts clarity)
- Per-model analysis with strengths and weaknesses
- An "Operator Verdict" section with a clear winner and recommendation
- Links to individual deep-dive posts

Use this frontmatter format:
```yaml
---
title: 'Daily Model Eval Scorecard — YYYY-MM-DD'
description: 'Today Claude, GPT, and [Model] face off on [task type]. See who wins on correctness, cost, and latency.'
pubDate: 'YYYY-MM-DD'
heroImage: '../../assets/blog-placeholder-1.jpg'
---
```

**2. Publish 1-3 individual benchmark deep-dive posts per day**

For each task in the daily scorecard, create a separate deep-dive post:
- `YYYY-MM-DD-coding-benchmark.md` — coding task deep dive
- `YYYY-MM-DD-reasoning-benchmark.md` — reasoning task deep dive
- `YYYY-MM-DD-tool-use-benchmark.md` — tool-use task deep dive

Each deep dive should include:
- Full task context (scenario, goal, constraints)
- The verbatim prompt
- The 10-point rubric
- Results table with scores and notes
- A "What great looked like" section
- Operator analysis (why winner won, common failures)
- Reproduction steps

### Weekly Tasks (Priority: High)

**3. Publish 2-3 SEO-targeted long-form articles per week**

Target high-volume search keywords. Rotate through these content types:

**Comparison articles** (highest SEO value):
- "GPT-5 vs Claude Opus 4: [Specific Task] Benchmark"
- "Claude vs Gemini: Which Is Better for [Use Case]?"
- "[Model A] vs [Model B] for Coding: Complete 2026 Comparison"

**Best-of guides**:
- "Best LLM for Coding in 2026"
- "Best AI Model for [specific use case]"
- "Cheapest AI Models for Production in 2026"

**Benchmark explainers** (evergreen traffic):
- "What Is SWE-Bench? The AI Coding Benchmark Explained"
- "What Is GPQA Diamond? AI Reasoning Benchmark Explained"
- "What Is Chatbot Arena (LMSYS)? ELO Ratings Explained"
- "What Is ARC-AGI? The General Intelligence Benchmark"

**Pricing & cost articles**:
- "AI Model Pricing Comparison [Month] 2026"
- "How Much Does GPT-5 API Cost? Complete Pricing Guide"
- "How to Reduce AI API Costs: Prompt Caching, Batching, and Model Routing"

**Monthly roundups**:
- "State of AI Benchmarks: [Month] 2026"

Each long-form article should be 1,500-2,500 words with:
- Proper H2/H3 structure for featured snippets
- Comparison tables (Google loves tables)
- Internal links to scorecards, methodology, and other articles
- External references to authoritative sources (arXiv papers, official docs, SWE-Bench GitHub)

**4. Update the homepage leaderboard data**

Edit `src/pages/index.astro` — update the `models` array with the latest scores from the most recent scorecard.

### Monthly Tasks (Priority: Medium)

**5. Publish a monthly "State of AI Benchmarks" report**

Comprehensive analysis covering:
- New model releases and their benchmark performance
- Score movements (which models improved/declined)
- New benchmarks worth watching
- Pricing changes across providers
- Predictions for next month

**6. SEO audit and optimization**

- Check that all posts have proper meta descriptions (150-160 chars)
- Ensure all images have descriptive alt text (the post title works well)
- Verify internal linking between related posts
- Check that the sitemap is generated correctly
- Review Google Search Console for crawl errors (when available)

**7. Add new model profile content**

When a new model launches (GPT-5.x, Claude 4.x, Gemini 3.x, etc.), immediately create:
- A benchmark comparison post: "[New Model] vs [Current Leader]: First Benchmark Results"
- Update existing comparison articles with the new model's data

---

## Content Quality Standards

### Every blog post MUST have:
1. **SEO-optimized title** — include the target keyword, keep under 60 characters
2. **Meta description** — 150-160 characters, compelling, includes keyword
3. **Proper date** — `pubDate` in YYYY-MM-DD format, use the actual publication date
4. **Hero image** — use one of the available placeholder images:
   - `../../assets/blog-placeholder-1.jpg` (general/scorecard)
   - `../../assets/blog-placeholder-2.jpg` (tool-use/pricing)
   - `../../assets/blog-placeholder-3.jpg` (reasoning/benchmarks)
   - `../../assets/blog-placeholder-4.jpg` (coding)
   - `../../assets/blog-placeholder-5.jpg` (general/roundup)
5. **Minimum 800 words** for daily scorecards, **1,500+ words** for long-form articles
6. **At least one comparison table** — models, scores, pricing, or feature comparison
7. **Internal links** — link to at least 2 other posts and to `/scorecards` or `/about`
8. **Actionable conclusion** — tell the reader which model to pick and why

### Tone and voice:
- Write for senior engineers and technical leaders
- Be direct and opinionated — don't hedge. Pick a winner
- Use concrete numbers, not vague claims
- Avoid marketing language ("revolutionary", "game-changing")
- Reference specific tasks, prompts, and failure modes

### What NOT to do:
- Never publish template/placeholder content — every post must be complete and useful
- Never use `<Model A>`, `<Paste prompt here>`, or similar placeholders
- Never duplicate content between posts — each must be unique
- Never publish posts without proper frontmatter
- Never create files outside `src/content/blog/` for blog content

---

## SEO Strategy

### Target Keywords (in priority order):

**High volume, direct intent:**
1. "AI model benchmarks" / "LLM benchmarks"
2. "best LLM for coding"
3. "GPT vs Claude" / "[Model] vs [Model]" comparisons
4. "AI model pricing" / "LLM pricing comparison"
5. "SWE-Bench results" / "SWE-Bench leaderboard"

**Long-tail, high conversion:**
6. "best AI model for [specific task]"
7. "cheapest LLM API"
8. "fastest LLM for production"
9. "[model name] benchmark results"
10. "AI coding assistant comparison"

### Keyword targeting rules:
- Include the primary keyword in the H1 title
- Include it naturally in the first paragraph
- Use it in at least one H2 subheading
- Include related keywords (LSI) throughout the content
- Meta description must contain the primary keyword

### Internal linking strategy:
- Every post should link to `/scorecards` (the main conversion page)
- Comparison articles should link to individual model benchmark posts
- Daily scorecards should link to their deep-dive posts
- Explainer articles should link to comparison articles
- Always use descriptive anchor text, not "click here"

---

## Technical Guidelines

### File naming convention:
- Daily scorecards: `YYYY-MM-DD-model-eval-scorecard.md`
- Coding benchmarks: `YYYY-MM-DD-coding-benchmark.md`
- Reasoning benchmarks: `YYYY-MM-DD-reasoning-benchmark.md`
- Tool-use benchmarks: `YYYY-MM-DD-tool-use-benchmark.md`
- Long-form articles: `descriptive-slug-with-keywords.md`

### Models currently tracked:
- Claude Opus 4.6 (Anthropic)
- 5.3-Codex-Spark (OpenAI)
- Kimi K2.5 (Moonshot)
- MiniMax M2.5
- GLM-5 (Zhipu)
- Gemini 2.5 Pro (Google)
- Add new models as they reach production availability

### Scoring weights:
- Coding: 40%
- Reasoning: 35%
- Tool-use: 25%

### Site structure to maintain:
```
/                  — Homepage with leaderboard + recent posts
/scorecards        — Browse all scorecards by category
/blog              — All posts chronologically
/blog/[slug]       — Individual post pages
/about             — Methodology page
/rss.xml           — RSS feed
/sitemap.xml       — Auto-generated sitemap
```

---

## Growth Milestones

### Phase 1: Foundation (Months 1-2) — Target: 50 daily visitors
- [x] Publish 10+ high-quality blog posts
- [x] Set up proper SEO (meta tags, JSON-LD, sitemap, robots.txt)
- [x] Dark mode, modern design
- [ ] Publish daily scorecards consistently for 30 days
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics tracking

### Phase 2: Content velocity (Months 2-4) — Target: 200 daily visitors
- [ ] Reach 50+ published posts
- [ ] Publish 5+ "vs" comparison articles (highest SEO value)
- [ ] Publish 5+ benchmark explainer articles (evergreen traffic)
- [ ] Get indexed for "AI model benchmarks" related queries
- [ ] Establish daily publishing cadence

### Phase 3: Authority (Months 4-8) — Target: 500 daily visitors
- [ ] Reach 150+ published posts
- [ ] Rank on page 1 for 3+ target keywords
- [ ] Publish model profile pages for every major model
- [ ] Add interactive comparison tools (client-side JS)
- [ ] Launch email newsletter / RSS subscriber base
- [ ] Get backlinks from AI/tech publications

### Phase 4: Scale (Months 8-12) — Target: 1,000+ daily visitors
- [ ] Reach 300+ published posts covering every major model and benchmark
- [ ] Rank on page 1 for 10+ target keywords
- [ ] Launch API or embeddable widget for benchmark data
- [ ] Publish weekly email digest
- [ ] Guest posts and PR in AI/dev communities
- [ ] Consider adding Gemini, Llama, Mistral, Grok to regular evals

---

## Quick Reference: New Post Checklist

Before publishing any post, verify:

- [ ] Title under 60 chars, includes target keyword
- [ ] Description is 150-160 chars, includes target keyword
- [ ] `pubDate` is set to today's date
- [ ] `heroImage` path is valid
- [ ] Content is complete — no placeholders, no `<Model A>` text
- [ ] At least one data table included
- [ ] Internal links to 2+ other pages on the site
- [ ] Content is 800+ words (scorecard) or 1,500+ words (article)
- [ ] Conclusion includes a clear recommendation
- [ ] File saved to `src/content/blog/` with a descriptive slug

---

## Competitors to Monitor

| Site | Strength | Our differentiator |
|---|---|---|
| [artificialanalysis.ai](https://artificialanalysis.ai) | Live operational metrics, 100+ models | Real engineering tasks, not synthetic benchmarks |
| [lmarena.ai](https://lmarena.ai) (Chatbot Arena) | Crowdsourced ELO from millions of votes | Transparent rubrics, reproducible evals |
| [vellum.ai/llm-leaderboard](https://www.vellum.ai/llm-leaderboard) | Multiple benchmark aggregation, pricing data | Daily publishing cadence, task-level deep dives |
| [huggingface.co/open-llm-leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) | Open-source model focus | Production-grade commercial models, operator focus |

Differentiate by being **the only daily-updated, task-level benchmark site with full prompt and rubric transparency**. No one else publishes the exact prompts, scoring criteria, and failure documentation we do.
