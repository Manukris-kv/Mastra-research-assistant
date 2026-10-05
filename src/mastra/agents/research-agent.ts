import { Agent } from '@mastra/core/agent';
import { llm } from '../model';

export const researchAgent = new Agent({
  id: 'research-agent',
  name: 'Research agent',
  // TODO(stage-1): write the instructions: role, output format (title, 3-5 bullets, one-line conclusion, sources list) and the 150-word limit
  instructions: '',
  model: llm,
});
