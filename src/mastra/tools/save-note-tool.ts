import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';

// Optional stretch goal: a tool with a real side effect (writes to a file).
export const saveNoteTool = createTool({
  id: 'save-note',
  description:
    'Save a short research note to disk when the user explicitly asks to save or remember a note. Do not call it otherwise.',
  requireApproval: true,
  inputSchema: z.object({
    topic: z.string().describe('Topic the note is about'),
    note: z.string().describe('The note text to save'),
  }),
  outputSchema: z.object({ saved: z.boolean(), file: z.string() }),
  execute: async ({ topic, note }) => {
    const dir = path.resolve(process.cwd(), 'notes');
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, 'notes.md');
    await appendFile(file, `## ${topic}\n${note}\n\n`);
    return { saved: true, file };
  },
});
