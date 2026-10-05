import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { searchWikipedia } from '../../lib/wikipedia';

const planStep = createStep({
  id: 'plan',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({ topic: z.string(), questions: z.array(z.string()) }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra.getAgentById('research-agent');
    // Planning must not trigger the lookup tool or the summary format, so we forbid tools here.
    const res = await agent.generate(
      `List 2 or 3 short research sub-questions for the topic "${inputData.topic}". Reply with one per line, no numbering. Do not call any tools.`,
      { toolChoice: 'none' },
    );
    const questions = res.text
      .split('\n')
      .map((q) => q.replace(/^[-*\d.\s]+/, '').trim())
      .filter(Boolean)
      .slice(0, 3);
    return { topic: inputData.topic, questions };
  },
});

const gatherStep = createStep({
  id: 'gather',
  inputSchema: z.object({ topic: z.string(), questions: z.array(z.string()) }),
  outputSchema: z.object({ topic: z.string(), findings: z.string() }),
  execute: async ({ inputData }) => {
    // Plain code, not an LLM decision: the deterministic part of the flow.
    const parts: string[] = [];
    for (const q of inputData.questions) {
      const results = await searchWikipedia(q, 2);
      const lines = results.length
        ? results.map((r) => `- ${r.snippet} (${r.source})`).join('\n')
        : '- No results found.';
      parts.push(`Q: ${q}\n${lines}`);
    }
    return { topic: inputData.topic, findings: parts.join('\n\n') };
  },
});

const writeStep = createStep({
  id: 'write',
  inputSchema: z.object({ topic: z.string(), findings: z.string() }),
  outputSchema: z.object({ summary: z.string() }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra.getAgentById('research-agent');
    const res = await agent.generate(
      `Write the summary for "${inputData.topic}" using only these findings (cite the source ids; if there are no results, say you have no information):\n${inputData.findings}`,
      { toolChoice: 'none' },
    );
    return { summary: res.text };
  },
});

// TODO(stage-4): chain the three steps
export const researchWorkflow = createWorkflow({
  id: 'research-workflow',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({ summary: z.string() }),
})
  .then(planStep)
  .then(gatherStep)
  .then(writeStep)
  .commit();
