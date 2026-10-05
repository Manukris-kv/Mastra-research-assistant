# Research Assistant (Mastra + LiteLLM)

Tutorial project built in stages, demoed entirely in **Mastra Studio**. `main` is the untouched output
of `npx create-mastra@latest`. After that there are two kinds of branch:

- **`checkpoint-N`** is the **exercise** for stage N: everything up to stage N-1 is done, the stage-N code is
  blanked out, and `// TODO(stage-N)` comments give hints. It compiles, so Studio runs even before you finish.
- **`stage-N`** is the **answer** for that exercise (and the starting point for `checkpoint-(N+1)`'s work).
  `stage-6` is the complete project.

| Exercise | Answer | You build | Try it in Studio |
|---|---|---|---|
| `checkpoint-1` | `stage-1` | The agent: write its instructions and register it (LiteLLM `model.ts` and the `lib/wikipedia.ts` helper are provided) | Agents → Research agent: ask about "solar energy" |
| `checkpoint-2` | `stage-2` | The lookup tool's description and `execute` (schemas are given), registration, and the tool rules | Same prompt; open the trace and see the tool call |
| `checkpoint-3` | `stage-3` | Memory | Ask "Make it shorter"; start a new chat (new thread) and it forgets |
| `checkpoint-4` | `stage-4` | The gather step and the workflow chain (plan and write are given) | Workflows → research-workflow, input `{ "topic": "solar energy" }` |
| `checkpoint-5` | `stage-5` | Human-in-the-loop: the `approve-plan` step and `requireApproval` | Workflow suspends at `approve-plan`; ask the agent to save a note and approve the tool call |
| `checkpoint-6` | `stage-6` | A built-in scorer (answer relevancy) | Run the agent, then check Scorers |

Hints name the Mastra APIs to use. Stuck? Compare with the matching `stage-N` branch.

## Setup
```bash
npm install
cp .env.example .env   # LITELLM_BASE_URL (ends in /v1), LITELLM_API_KEY, LITELLM_MODEL
npm run dev            # Studio at http://localhost:4111
```
The lookup tool queries the public Wikipedia API, so it needs internet access but no API key.
