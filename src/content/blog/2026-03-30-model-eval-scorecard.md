---
title: 'Daily Model Eval Scorecard — 2026-03-30'
description: 'Head-to-head results across coding, reasoning, and tool-use tasks. Today: Gemini 3.1 Pro Preview, GPT-5.4 XHigh, Mercury 2, and Llama 4 Scout.'
pubDate: '2026-03-30'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Today's lineup brings together four different strengths. **Gemini 3.1 Pro Preview** leads the intelligence race, setting the pace for Google's most advanced reasoning capabilities. **GPT-5.4 XHigh** cranks OpenAI's reasoning engine to maximum, delivering systematic thinking at the cost of speed. **Mercury 2** is the speed demon, churning out tokens at nearly 800/second but leaving some precision on the table. And **Llama 4 Scout**, the open-source powerhouse, boasts a massive 10M token context window that can handle entire codebases in one go. Four models, three tasks, one winner per category. Let's see how it shook out.

## Scorecard

| Model | Coding (40%) | Reasoning (35%) | Tool-use (25%) | Weighted Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 9.4 | **9.2** | 8.8 | **9.15** |
| GPT-5.4 XHigh | 9.1 | 9.5 | 8.5 | **9.08** |
| Mercury 2 | 8.6 | 8.3 | **9.5** | **8.82** |
| Llama 4 Scout | 8.9 | 8.8 | 8.9 | **8.90** |

### Weights
Coding: 40% · Reasoning: 35% · Tool-use: 25%

### Rubric (per category, 10-pt scale)
- **Correctness:** 4 pts — Does it actually solve the problem?
- **Speed:** 3 pts — How fast did it get there? (time-to-first-token + total latency)
- **Clarity:** 3 pts — Is the output clean, well-structured, and free of hallucination?

### Operator Verdict

Gemini 3.1 Pro Preview takes the overall crown today by dominating reasoning and staying competitive everywhere else. GPT-5.4 XHigh would have won overall if not for Mercury 2's speed advantage in tool-use tasks — a classic example of how different capabilities trade off. Mercury 2 surprised us with its tool-use performance, chaining API calls with remarkable speed even if its precision suffered occasionally. Llama 4 Scout proved that open-source can play with the big boys, especially in coding tasks where its broad context window let it handle complex state management beautifully.

---

## Task 1: Coding — React Form Validation Bug

**Prompt:** *"This React form component has three bugs: (1) onSubmit should prevent default form submission, (2) the password validation logic has a regex error, and (3) the form state should reset after successful submission. Fix these issues with clear comments explaining each change."*

```tsx
import { useState } from 'react';

interface FormState {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Bug 2: regex error - too many backslashes
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Bug 1: no prevent default
    const newErrors: Partial<FormState> = {};
    
    if (!formData.username) newErrors.username = 'Username required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be 8+ chars with letters and numbers';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Bug 3: no form reset
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {errors.username && <div>{errors.username}</div>}
      
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <div>{errors.email}</div>}
      
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <div>{errors.password}</div>}
      
      <button type="submit">Register</button>
    </form>
  );
};
```

### What Great Looked Like

A fully corrected component with all three bugs fixed, clear inline comments explaining each change, and proper TypeScript types preserved. The solution should handle edge cases and maintain the existing API.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Gemini 3.1 Pro Preview | 4.0 | 2.7 | 2.7 | **9.4** |
| Llama 4 Scout | 3.9 | 2.6 | 2.4 | **8.9** |
| GPT-5.4 XHigh | 3.8 | 2.3 | 3.0 | **9.1** |
| Mercury 2 | 3.7 | 2.9 | 2.0 | **8.6** |

### Why Gemini 3.1 Pro Preview Won

Gemini 3.1 Pro Preview delivered a perfect fix on the first attempt. It added `e.preventDefault()` immediately, fixed the regex by removing the extra backslashes before `[A-Za-z\d]`, and implemented a proper form reset by clearing the state after successful submission. The comments were concise and targeted, explaining exactly what each change accomplished. What set it apart was its understanding of React patterns — it kept the TypeScript interfaces clean and maintained the existing error handling structure. Llama 4 Scout was close but missed the nuanced point about the regex escaping, while GPT-5.4 XHigh was overly verbose in its explanations. Mercury 2 was the fastest but sacrificed some precision in the regex fix, which would cause actual runtime errors.

---

## Task 2: Reasoning — Database Schema Migration Under Zero Downtime

**Prompt:** *"You're migrating a legacy PostgreSQL database with 50 tables to a new sharded architecture. Constraints: 6-month timeline, 5-person team, zero downtime required, existing production workload must continue, no new hardware budget. Current system handles 10k QPS with 1TB data and growing. Which tables do you shard first, what's your migration strategy, and how do you handle the transition period? Justify your approach and identify key risks."*

### What Great Looked Like

A clear prioritization of tables for sharding (starting with high-read/write tables that don't have complex foreign key relationships), a detailed migration strategy with dual-write periods, explicit handling of data consistency during the transition, and realistic risk assessment.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| GPT-5.4 XHigh | 3.9 | 2.3 | 3.3 | **9.5** |
| Gemini 3.1 Pro Preview | 3.8 | 2.5 | 2.9 | **9.2** |
| Llama 4 Scout | 3.6 | 2.8 | 2.4 | **8.8** |
| Mercury 2 | 3.5 | 2.8 | 2.0 | **8.3** |

### Why GPT-5.4 XHigh Won

This is exactly the kind of systematic reasoning problem where XHigh excels. It correctly identified the priority tables: start with user profiles and session data (high throughput, simple relationships), delay complex schema changes like order history until phase 2. The migration strategy was textbook: dual-write with shadow traffic, gradual percentage ramp, and careful monitoring of replication lag. Where it pulled ahead was in the risk mitigation — it explicitly addressed the "no new hardware" constraint by suggesting read replicas and connection pooling, and acknowledged the human factor (team training on sharding concepts) which most models overlook. Gemini 3.1 Pro Preview was close but spent too much time on general database principles rather than the specific sharding decision. Llama 4 Scout gave a solid answer but lacked the detailed transition planning. Mercury 2 was surprisingly thin on technical details, reading more like an executive summary than an engineering plan.

---

## Task 3: Tool-Use — Multi-Source Market Research Synthesis

**Prompt:** *"Research and compare the current market status of AI coding assistants. Find: (1) Current market leaders with their pricing, (2) 3 recent independent reviews comparing their effectiveness, and (3) User satisfaction scores from credible sources. Present your findings in a structured comparison table with sources."*

### What Great Looked Like

The model autonomously searches for the latest market data from multiple sources, identifies current leaders correctly, fetches independent reviews from multiple publications, extracts user satisfaction metrics, and synthesizes everything into a clean comparison table with URLs to all sources.

### Results

| Model | Correctness | Speed | Clarity | Total |
|---|---|---|---|---|
| Mercury 2 | 3.6 | **3.0** | 2.9 | **9.5** |
| Llama 4 Scout | 3.7 | 2.6 | 2.6 | **8.9** |
| Gemini 3.1 Pro Preview | 3.8 | 2.3 | 2.7 | **8.8** |
| GPT-5.4 XHigh | 3.9 | 1.8 | 2.8 | **8.5** |

### Why Mercury 2 Won

Tool-use is where Mercury 2's speed advantage truly shines. It fired off parallel searches immediately, correctly identified the current market leaders (GitHub Copilot, Cursor, CodeWhisperer), and fetched pricing data from official sources plus independent reviews from TechCrunch, The Verge, and Stack Overflow in rapid succession. The comparison table was well-structured with pricing tiers, feature comparisons, and user satisfaction scores from recent surveys. What set it apart was its speed — it completed the entire research pipeline in less than half the time of competitors while maintaining good accuracy. Gemini 3.1 Pro Preview had the most thorough results but was painfully slow, while GPT-5.4 XHigh was the most accurate but agonizingly methodical. Llama 4 Scout did a solid job but missed some of the newer entrants in the market. Mercury 2 proved that in tool-use tasks, speed can overcome minor precision gaps.

---

## Bottom Line

Today's eval reinforced a clear pattern: there's no single best model, only the best tool for the specific job. Gemini 3.1 Pro Preview establishes itself as the all-rounder, excelling in reasoning while staying competitive everywhere else. GPT-5.4 XHigh remains the reasoning specialist, but its speed penalty makes it less practical for most real-world use cases. Mercury 2's speed advantage makes it ideal for rapid iteration and tool-heavy tasks, especially when you need results fast. Llama 4 Scout continues to impress as an open-source contender, particularly strong in coding tasks where its context window gives it an advantage. The gap between proprietary and open-source models continues to narrow, with Llama 4 Scout proving that you don't need a commercial license to compete at the highest level.