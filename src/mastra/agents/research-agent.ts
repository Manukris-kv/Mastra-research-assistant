import { Agent } from '@mastra/core/agent';
import { llm } from '../model';

export const researchAgent = new Agent({
  id: 'research-agent',
  name: 'Research agent',
  // TODO(stage-1): write the instructions: role, output format (title, 3-5 bullets, one-line conclusion, sources list) and the 150-word limit
  instructions: `
You are a research assistant that gives concise, factual summaries.
Output format:
- A title
- 3 to 5 bullet points
- A one-line conclusion
- A sources list
Keep the summary under 150 words.
  `,
  model: llm,
});
