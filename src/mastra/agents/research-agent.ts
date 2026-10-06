import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { llm } from '../model';
import { lookupTool } from '../tools/lookup-tool';

export const researchAgent = new Agent({
  id: 'research-agent',
  name: 'Research agent',
  // TODO(stage-5): add a rule to the instructions: if the user asks to save a note, use the save-note tool
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
  `,
  model: llm,
  // TODO(stage-5): register saveNoteTool next to lookupTool
  tools: { lookupTool },
  memory: new Memory({
    options: { 
      lastMessages: 10,
      workingMemory: {
        enabled: true,
      }
    },
  }),
});
