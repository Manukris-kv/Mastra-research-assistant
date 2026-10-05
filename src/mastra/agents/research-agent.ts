import { Agent } from '@mastra/core/agent';
import { llm } from '../model';

export const researchAgent = new Agent({
  id: 'research-agent',
  name: 'Research agent',
  // TODO(stage-2): add tool rules to the instructions: always call the lookup tool first, use only its facts, cite the source field, say so if nothing is found
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
  // TODO(stage-2): register the tools: import lookupTool and add it to `tools`
  tools: {},
});
