export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
}

const MAX_CONTEXT_MESSAGES = 10;

export const BASE_SYSTEM_PROMPT = `You are Amkyaw AI, a fast, polished assistant running inside a premium web application. Follow these rules:
- Respond in clean Markdown.
- Use short sections and code fences when useful.
- If retrieval context is provided, prioritize it when it is relevant.
- Be concise first, then detailed when asked.
- If the user asks for code, give production-friendly examples.
- Maintain a modern, helpful, confident tone.`;

export function buildConversationWindow(messages: ChatMessage[]) {
  const withoutSystem = messages.filter((message) => message.role !== 'system');
  return withoutSystem.slice(-MAX_CONTEXT_MESSAGES);
}

export function composeSystemPrompt(retrievedContext: string) {
  if (!retrievedContext) return BASE_SYSTEM_PROMPT;

  return `${BASE_SYSTEM_PROMPT}\n\nRetrieved product knowledge:\n${retrievedContext}`;
}
