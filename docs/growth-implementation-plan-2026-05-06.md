# ModelEvalDaily Growth Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Grow AIModelBenchmarks.com / ModelEvalDaily traffic by turning it from a thin daily-scorecard archive into a useful LLM decision engine: fresh model data, query-targeted comparison pages, calculators, benchmark explainers, and developer workflow pages.

**Architecture:** Keep the current Astro static site. Add structured data files for models/pricing/benchmarks, generate SEO pages from templates, improve internal linking, and ship interactive client-side calculators where they create utility. Avoid fake benchmark claims; every model metric needs a source URL and verification date.

**Tech Stack:** Astro 5, MD/MDX content collections, TypeScript data modules, static XML sitemap, Vercel Analytics.

---

## Research summary

### Current site state verified locally/live

- Repo: `https://github.com/thakoreh/modelevaldaily.git`
- Local path: `/Users/hiren/Documents/hiren projects/modelevaldaily`
- Live domain in config: `https://aimodelbenchmarks.com`
- Framework: Astro static site.
- Current route count: 35 Astro routes.
- Blog posts in repo: 83 markdown posts.
- Live sitemap before fix: only 16 URLs.
- Local content filter excludes 46 blog posts because they contain unverified/blocked model names like `Claude Opus 4.6`, `Kimi K2.5`, or `5.3-Codex-Spark`.
- Model data is stale: `MODEL_DATA_VERIFIED_ON = 2026-03-10`; latest daily scorecard is `2026-04-11`; site updated constant was `2026-02-16` before this audit.

### Competitor signals verified from search/results

The LLM benchmark/search space is active and search-driven. Competitors rank by owning pages with utility and freshness:

- Artificial Analysis: leaderboard for 100+ models with intelligence, price, speed, latency, context window.
- BenchLM: 227 tracked models, 186 benchmarks, dedicated coding leaderboard with SWE-bench and LiveCodeBench.
- LLM Stats: 300+ models, intelligence/speed/price positioning.
- Vellum: LLM leaderboard with reasoning/coding/math/multilingual plus pricing/speed.
- LLM Price Check / PricePerToken: token pricing calculator and model cost comparison.
- SWE-bench: official leaderboard target for coding benchmark intent.

### Gaps that can bring visitors fastest

1. **Indexation gap:** Existing static pages were not all in sitemap. Fix immediately. More than half the current route inventory had weak sitemap discovery.
2. **Freshness gap:** Site says daily/model eval but has no recent daily scorecards after Apr 11 and model data verified Mar 10. This hurts trust and click-through.
3. **Utility gap:** Competitors win with sortable leaderboards, pricing calculators, and head-to-head comparisons. We have pages, but need stronger interactive utility and source-backed freshness.
4. **Long-tail SEO gap:** Existing pages cover broad terms but miss many high-intent queries:
   - `best llm for code review`
   - `best llm for agents`
   - `best cheap llm api`
   - `claude vs gpt for coding`
   - `gemini vs claude long context`
   - `open source llm coding leaderboard`
   - `llm cost calculator`
   - `swe-bench explained`
   - `mmlu vs gpqa`
   - `best model for cursor/cline/codex`
5. **Trust gap:** Some content was intentionally suppressed by fact-check filters. Good instinct, but the site needs a workflow to rewrite or archive unverified posts instead of silently losing indexable pages.

---

## Priority implementation roadmap

## Phase 0 — Immediate technical SEO repair

### Task 1: Expand sitemap static route coverage

**Objective:** Ensure all existing indexable static pages are discoverable.

**Files:**
- Modify: `src/pages/sitemap.xml.ts`
- Modify: `src/consts.ts`

**Implementation:**
- Add every real static route to `staticPages`.
- Use `SITE_UPDATED` as default lastmod.
- Update `SITE_UPDATED` to current audit date.

**Verification:**
```bash
npm run build
python3 - <<'PY'
from pathlib import Path
xml = Path('dist/sitemap.xml').read_text()
print(xml.count('<loc>'))
assert 'https://aimodelbenchmarks.com/best-ai-model-for-coding/' in xml
assert 'https://aimodelbenchmarks.com/cheapest-ai-models/' in xml
assert 'https://aimodelbenchmarks.com/use-cases/cost-optimization/' in xml
PY
```

**Status:** Implemented during this planning pass. Needs build verification and commit.

---

## Phase 1 — Freshness and trust reset

### Task 2: Add a visible data freshness system

**Objective:** Make freshness part of the product, not hidden metadata.

**Files:**
- Modify: `src/data/verified-models.ts`
- Modify: `src/data/pricing.ts`
- Modify: `src/pages/models.astro`
- Modify: `src/pages/model-data.astro`
- Create: `src/data/sources.ts`

**Implementation:**
- Add per-model `lastVerified`, `sourceType`, and `confidence` fields.
- Show `Last verified` and `Source` on model cards.
- Add badges: `Official docs`, `Benchmark source`, `Community leaderboard`, `Needs review`.
- Do not present unsupported model names as verified.

**Verification:**
```bash
npm run build
curl -s http://localhost:4321/models/ | grep -i 'Last verified'
```

### Task 3: Rewrite or quarantine unverified blog posts

**Objective:** Recover indexable content without making bad claims.

**Files:**
- Modify: `src/utils/fact-check.ts`
- Create: `scripts/audit-blog-facts.mjs`
- Modify: affected files under `src/content/blog/`

**Implementation:**
- Generate a CSV of posts excluded by fact-check rules.
- For each post, either:
  - rewrite unsupported future-model names into generic/provider-backed wording, or
  - add frontmatter `draft: true` / `noindex: true` and exclude intentionally.
- Update blog index to display only verified posts, but add an internal report for excluded posts.

**Verification:**
```bash
node scripts/audit-blog-facts.mjs
npm run build
```

---

## Phase 2 — Traffic pages with clear search intent

### Task 4: Create 10 programmatic comparison pages

**Objective:** Capture high-intent comparison queries.

**Create pages:**
- `src/pages/compare/claude-vs-gemini.astro`
- `src/pages/compare/gpt-vs-gemini.astro`
- `src/pages/compare/openai-vs-anthropic-api.astro`
- `src/pages/compare/gemini-vs-deepseek.astro`
- `src/pages/compare/qwen-vs-llama.astro`
- `src/pages/compare/deepseek-vs-qwen.astro`
- `src/pages/compare/claude-sonnet-vs-opus.astro`
- `src/pages/compare/gpt-5-vs-gpt-4-1.astro`
- `src/pages/compare/local-llm-vs-api.astro`
- `src/pages/compare/budget-vs-frontier-models.astro`

**Page structure:**
- Hero: explicit recommendation by use case.
- Decision matrix: coding, reasoning, context, latency, cost, tool use.
- Pricing block with per-1M token costs.
- Best for / avoid if.
- Source list and verification date.
- Links to cost calculator and model pages.

**Verification:**
- Each page builds.
- Each page is added to sitemap.
- No unsupported model names.

### Task 5: Create 12 use-case pages

**Objective:** Capture bottom-funnel queries from developers choosing a model for a real job.

**Create pages:**
- `/use-cases/code-review/`
- `/use-cases/unit-tests/`
- `/use-cases/refactoring/`
- `/use-cases/rag/`
- `/use-cases/customer-support/`
- `/use-cases/document-analysis/`
- `/use-cases/long-context/`
- `/use-cases/structured-output/`
- `/use-cases/tool-calling/`
- `/use-cases/data-extraction/`
- `/use-cases/math/`
- `/use-cases/low-latency/`

**Page structure:**
- Recommended model stack: premium / balanced / budget / local.
- Failure modes for the task.
- Cost example.
- Eval checklist.
- Suggested benchmark(s).

---

## Phase 3 — Utility features users will bookmark

### Task 6: Upgrade cost calculator into a shareable LLM cost planner

**Objective:** Compete with `LLM Price Check`, `PricePerToken`, and pricing calculators with a developer-first angle.

**Files:**
- Modify: `src/pages/cost-calculator.astro`
- Modify: `src/data/pricing.ts`
- Create: `src/components/CostScenarioCalculator.astro` or inline script.

**Features:**
- Inputs: requests/day, input tokens, output tokens, cache hit %, retry rate.
- Outputs: daily/monthly cost per model.
- Compare up to 4 models.
- Presets: coding agent, RAG chatbot, support bot, batch extraction.
- Copy/share URL with query params.

### Task 7: Add a model picker wizard

**Objective:** Convert generic visitors into users by answering: “which model should I use?”

**Create:**
- `src/pages/tools/model-picker.astro`

**Questions:**
- Task type.
- Budget sensitivity.
- Context length.
- Need tool calling?
- Need local/open weights?
- Latency sensitivity.

**Output:**
- Recommended model tier.
- Why.
- Cost estimate.
- Links to comparison pages.

---

## Phase 4 — Authority content clusters

### Task 8: Benchmark glossary cluster

**Objective:** Own beginner-to-intermediate benchmark education queries and internally link to leaderboard pages.

**Create/upgrade pages:**
- `/benchmarks/swe-bench/`
- `/benchmarks/livecodebench/`
- `/benchmarks/gpqa/`
- `/benchmarks/mmlu-pro/`
- `/benchmarks/humaneval/`
- `/benchmarks/aider-polyglot/`
- `/benchmarks/if-eval/`
- `/benchmarks/longbench/`

Each page should answer:
- What it measures.
- What it does not measure.
- Which models are strong.
- Why developers should/should not care.
- Links to use-case pages.

### Task 9: Weekly “Model Movement” page

**Objective:** Make the “daily” promise realistic and useful.

**Create:**
- `/model-movement/`

**Content:**
- New model releases.
- Price changes.
- Benchmark changes.
- Notable leaderboard movements.
- “What changed this week” summary.

If we cannot truly update daily, rename visible promise from “daily” to “weekly verified model changes” until automation exists.

---

## Phase 5 — Distribution loops

### Task 10: Add newsletter capture

**Objective:** Convert SEO visitors into owned audience.

**Files:**
- Modify: homepage, blog, comparison pages, calculator.

**Copy:**
- “Get weekly LLM leaderboard changes: price drops, benchmark moves, and model launches.”

### Task 11: Add shareable cards

**Objective:** Make pages worth sharing on X/Reddit/HN.

**Create:**
- OpenGraph images per comparison/use-case page.
- Copyable verdict snippets.
- “Embed this model cost table” HTML snippet.

### Task 12: Backlink targets

**Objective:** Earn links from developer resources.

**Targets:**
- GitHub README: `awesome-llm`, `awesome-ai-agents`, model comparison repos.
- Product Hunt / IndieHackers launch: cost calculator or model picker, not generic homepage.
- Reddit/HN: only share benchmark explainers where directly useful.
- Gumroad/Lead magnet: “LLM Cost Planning Sheet” linking back to calculator.

---

## First 7-day sprint

### Day 1
- Finish sitemap build verification.
- Commit/push sitemap and `SITE_UPDATED` fix.
- Add `/tools/model-picker/` scaffold.

### Day 2
- Upgrade cost calculator with scenario presets and shareable URL params.

### Day 3
- Create comparison template and ship 3 highest-intent comparisons:
  - Claude vs GPT
  - Claude vs Gemini
  - OpenAI vs Anthropic API

### Day 4
- Create use-case template and ship:
  - best LLM for code review
  - best LLM for tool calling
  - best cheap LLM API

### Day 5
- Create blog fact audit script.
- Rewrite/recover 10 excluded posts or explicitly noindex them.

### Day 6
- Add newsletter capture and “weekly model movement” CTA.

### Day 7
- Build + deploy + live QA.
- Submit sitemap to Google Search Console.
- Prepare X/Bluesky launch thread for model picker + calculator.

---

## Non-negotiable quality rules

- No fake benchmark numbers.
- No unsupported future model names unless clearly labeled as speculative/rumor and noindexed.
- Every pricing number needs a provider/source URL and last verified date.
- Every benchmark page must explain limitations, not just rankings.
- Pages must include internal links to the model picker, cost calculator, and related comparisons.
- Sitemap must include every indexable page.
