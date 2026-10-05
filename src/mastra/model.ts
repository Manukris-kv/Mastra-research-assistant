// TODO(stage-1): check the LiteLLM settings (.env) that this file reads.
// The ONE place the LLM is configured. LiteLLM exposes an OpenAI-compatible API,
// so we use Mastra's custom `url` model config. The base URL must end in /v1.
export const llm = {
  id: `custom/${process.env.LITELLM_MODEL!}` as `${string}/${string}`,
  url: process.env.LITELLM_BASE_URL!,
  apiKey: process.env.LITELLM_API_KEY!,
};

// Fallback if the custom config misbehaves on your version:
//   npm install @ai-sdk/openai-compatible
//
// import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
// const litellm = createOpenAICompatible({
//   name: 'litellm',
//   baseURL: process.env.LITELLM_BASE_URL!,
//   apiKey: process.env.LITELLM_API_KEY!,
// });
// export const llm = litellm(process.env.LITELLM_MODEL!);
