---
title: 'Coding Benchmark: Fixing a Pagination Bug'
description: 'A fast, real bug-fix eval across top models.'
pubDate: '2026-02-12'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

A single, real bug: offset math in pagination.

## Prompt
```
You are given a Node/Express endpoint that returns paginated results. Users report missing items on page 2+. Identify the bug and provide a code diff.

app.get('/items', async (req, res) => {
  const page = Number(req.query.page || 1)
  const limit = Number(req.query.limit || 20)
  const offset = page * limit
  const items = await db.items.findMany({ skip: offset, take: limit })
  res.json({ items })
})
```

## Results
- **Claude 3.5**: Correctly identified offset bug + validation notes.
- **GPT-4.2**: Correct code diff; best code clarity.
- **GLM-5**: Correct bug, but skipped validation.

## Rubric
- Fixes `(page - 1) * limit`
- Includes corrected snippet
- Mentions validation

## Takeaway
GPT leads when clarity matters; Claude leads on completeness.
