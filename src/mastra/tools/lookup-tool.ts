import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { searchWikipedia } from '../../lib/wikipedia';

// TODO(stage-2): finish the tool: write its description and its execute function.
// The schemas are given. Hint: searchWikipedia(query) is provided and returns [{ title, snippet, source }].
export const lookupTool = createTool({
  id: 'lookup',
  // TODO(stage-2): the description is what the model reads to decide whether to call this tool.
  description: '',
  inputSchema: z.object({
    query: z.string().describe('The topic or sub-question to search for'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), snippet: z.string(), source: z.string() })),
  }),
  // TODO(stage-2): execute: call searchWikipedia with the query and return { results }
  execute: async ({ query }) => {
    return { results: [] };
  },
});
