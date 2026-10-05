import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { searchWikipedia } from '../../lib/wikipedia';

export const lookupTool = createTool({
  id: 'lookup',
  description:
    'Search Wikipedia for facts about a topic. Use this before answering any research question. Returns titles, snippets and source URLs.',
  inputSchema: z.object({
    query: z.string().describe('The topic or sub-question to search for'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), snippet: z.string(), source: z.string() })),
  }),
  execute: async ({ query }) => {
    return { results: await searchWikipedia(query) };
  },
});
