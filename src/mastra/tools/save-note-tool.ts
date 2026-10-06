import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { existsSync } from 'node:fs';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';

// `mastra dev` runs from a different working directory (src/mastra/public), so find the project
// root by walking up until we see src/mastra. Notes then always land in <project root>/notes/.
function findProjectRoot(start = process.cwd()): string {
  let dir = start;
  while (!existsSync(path.join(dir, 'src', 'mastra'))) {
    const parent = path.dirname(dir);
    if (parent === dir) return start;
    dir = parent;
  }
  return dir;
}

// TODO(stage-5): the save-note tool is new in this stage.
// Optional stretch goal: a tool with a real side effect (writes to a file).
export const saveNoteTool = createTool({
  id: 'save-note',
  description:
    'Save a short research note to disk when the user explicitly asks to save or remember a note. Do not call it otherwise.',
  // TODO(stage-5): Human-in-the-loop: the agent pauses and waits for approval before the file is written.
  requireApproval: true,
  inputSchema: z.object({
    topic: z.string().describe('Topic the note is about'),
    note: z.string().describe('The note text to save'),
  }),
  outputSchema: z.object({ saved: z.boolean(), file: z.string() }),
  execute: async ({ topic, note }) => {
    const dir = path.join(findProjectRoot(), 'notes');
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, 'notes.md');
    await appendFile(file, `## ${topic}\n${note}\n\n`);
    return { saved: true, file };
  },
});
