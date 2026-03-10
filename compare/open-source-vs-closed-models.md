# Open Source vs Closed Source AI Models (2026)

*Last updated: March 2026 | All data from verified benchmarks*

## Quick Verdict

**Closed-source models** lead in Chatbot Arena ELO (top scores 1490-1505). **Open-source models** offer 10-100x cost savings with competitive performance (GLM-5 at ELO 1452, DeepSeek V3 at ELO 1418).

---

## Top Models Comparison

| Rank | Model | ELO | License | Org | Source |
|------|-------|-----|---------|-----|--------|
| 1 | Gemini 3.1 Pro | 1505 | Proprietary | Google | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 2 | Claude Opus 4.6 Thinking | 1503 | Proprietary | Anthropic | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 3 | Grok 4.20 | 1493 | Proprietary | xAI | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 4 | Gemini 3 Pro | 1492 | Proprietary | Google | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 5 | Claude Opus 4.6 | 1490 | Proprietary | Anthropic | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 19 | **GLM-5** | 1452 | **MIT** | Zhipu AI | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 21 | **GLM-4.7** | 1445 | **MIT** | Zhipu AI | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 23 | **GLM-4.6** | 1441 | **MIT** | Zhipu AI | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 27 | **Qwen3.5-397B** | 1451 | **Apache 2.0** | Alibaba | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 29 | **Mistral Large 3** | 1428 | **Apache 2.0** | Mistral | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |
| 36 | **DeepSeek-R1-0528** | 1426 | **MIT** | DeepSeek | [OpenLM.ai](https://openlm.ai/chatbot-arena/) |

---

## Best Open-Source Models (March 2026)

| Model | ELO | License | Parameters | Source |
|-------|-----|---------|------------|--------|
| **GLM-5** | 1452 | MIT | 744B (44B active) | [Zhipu AI](https://z.ai/blog/glm-5) |
| **Qwen3.5-397B-A17B** | 1451 | Apache 2.0 | 397B (17B active) | [HuggingFace](https://huggingface.co/Qwen/Qwen3.5-397B-A17B) |
| **GLM-4.7** | 1445 | MIT | - | [Zhipu AI](https://z.ai/blog/glm-4.7) |
| **Mistral Large 3** | 1428 | Apache 2.0 | - | [Mistral](https://mistral.ai/news/mistral-3) |
| **DeepSeek-R1-0528** | 1426 | MIT | - | [DeepSeek](https://api-docs.deepseek.com/news/news250528) |
| **DeepSeek-V3.2-Thinking** | 1422 | MIT | - | [DeepSeek](https://api-docs.deepseek.com/news/news250929) |

---

## SWE-Bench Coding Benchmark

| Model | Score | License | Source |
|-------|-------|---------|--------|
| Claude Opus 4.6 Thinking | 79.2% | Proprietary | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |
| GPT-5.4 | 77.2% | Proprietary | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |
| Gemini 3 Flash | 76.2% | Proprietary | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |
| Claude Sonnet 4.6 | 76.2% | Proprietary | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |
| **GLM-5 Thinking** | 67.8% | **MIT** | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |
| **GLM-4.7** | 67.0% | **MIT** | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |
| **DeepSeek V3.2** | 68.4% | **MIT** | [Vals.ai](https://www.vals.ai/benchmarks/swebench) |

---

## Pricing Comparison

| Model | Input ($/1M) | Output ($/1M) | License | Source |
|-------|-------------|---------------|---------|--------|
| **DeepSeek V3.2** | $0.28 | $0.42 | MIT | [DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing) |
| **GLM-5** | $1.00 | $3.20 | MIT | [Techloy](https://www.techloy.com/chinas-zhipu-ai-launches-glm-5-with-30-price-increase-as-stock-jumps-34/) |
| Claude Opus 4.6 | $5.00 | $25.00 | Proprietary | [Anthropic Pricing](https://www.anthropic.com/pricing) |
| GPT-5.4 | $2.50 | $15.00 | Proprietary | [OpenAI Pricing](https://openai.com/api/pricing) |

### Cost Savings: Open Source vs Closed

For 10M tokens (5M input + 5M output):
- **DeepSeek V3.2**: $3.50 (baseline)
- **GLM-5**: $21.00 (6x DeepSeek)
- **GPT-5.4**: $87.50 (25x DeepSeek)
- **Claude Opus 4.6**: $150.00 (43x DeepSeek)

---

## When to Choose Open Source

**Choose Open Source when:**
- Cost is a primary concern (10-100x cheaper)
- You need to run models locally or on-premise
- You want to fine-tune without restrictions
- Data privacy requires local inference
- You need model weights for research

**Choose Closed Source when:**
- You need maximum benchmark performance (top ELO scores)
- SWE-Bench coding accuracy above 75% required
- You need latest frontier capabilities
- Managed infrastructure preferred

---

## Official Links

### Open Source Models
- [GLM-5 on HuggingFace](https://huggingface.co/models?search=glm-5)
- [Qwen3.5 on HuggingFace](https://huggingface.co/Qwen/Qwen3.5-397B-A17B)
- [DeepSeek V3 API](https://api-docs.deepseek.com/)
- [Mistral Large 3](https://mistral.ai/news/mistral-3)

### Closed Source Models
- [OpenAI GPT-5.4](https://platform.openai.com/docs/models/gpt-5.4)
- [Anthropic Claude](https://www.anthropic.com/)
- [Google Gemini](https://ai.google.dev/)

---

## Data Sources

1. **Chatbot Arena ELO** - [OpenLM.ai](https://openlm.ai/chatbot-arena/) - 6M+ crowdsourced votes
2. **SWE-Bench Verified** - [Vals.ai](https://www.vals.ai/benchmarks/swebench) - Real-world coding tasks
3. **Pricing** - Official API documentation pages

*All data verified from primary sources. No opinions - just benchmarks.*
