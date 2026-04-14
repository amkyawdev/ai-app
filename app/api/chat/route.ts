import Groq from 'groq-sdk';
import { buildConversationWindow, composeSystemPrompt, type ChatMessage } from '@/lib/chat';
import { retrieveRelevantContext } from '@/lib/rag';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json({ error: 'Missing GROQ_API_KEY.' }, { status: 500 });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');
    const retrievedContext = latestUserMessage
      ? retrieveRelevantContext(latestUserMessage.content)
      : '';

    const stream = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.65,
      max_completion_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'system',
          content: composeSystemPrompt(retrievedContext),
        },
        ...buildConversationWindow(messages).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          controller.enqueue(
            encoder.encode(`\n\n> Streaming interrupted: ${error instanceof Error ? error.message : 'Unknown error'}`),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Unexpected server error.',
      },
      { status: 500 },
    );
  }
}
