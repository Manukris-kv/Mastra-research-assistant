import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { llm } from '../model';
import { lookupTool } from '../tools/lookup-tool';
import { saveNoteTool } from '../tools/save-note-tool';

export const researchAgent = new Agent({
  id: 'research-agent',
  name: 'Research agent',
  instructions: `
You are a research assistant that gives concise, factual summaries.
Output format:
- A title
- 3 to 5 bullet points
- A one-line conclusion
- A sources list
Keep the summary under 150 words.
If the user asks you to change a previous answer (for example "make it shorter"), rewrite your previous summary.
Always call the lookup tool before answering a new research topic. Only use facts it returns.
Cite the source field. If it returns no results, say you have no information on that topic.
If the user asks you to save a note, use the save-note tool.
  `,
  model: llm,
  tools: { lookupTool, saveNoteTool },
  memory: new Memory({
    options: { lastMessages: 10 },
  }),
  // TODO(stage-6): attach a built-in scorer: createAnswerRelevancyScorer({ model: llm }) from '@mastra/evals/scorers/prebuilt', sampling { type: 'ratio', rate: 1 }. Results appear under Scorers in Studio
});
