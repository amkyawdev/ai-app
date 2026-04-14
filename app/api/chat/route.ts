import Groq from 'groq-sdk';
import { buildConversationWindow, composeSystemPrompt, type ChatMessage } from '@/lib/chat';
import { retrieveRelevantContext } from '@/lib/rag';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Advanced streaming configuration
const STREAM_CONFIG = {
  model: 'meta-llama/llama-4-scout-17b-16e-instruct',
  temperature: 0.7,
  max_tokens: 2048,
  top_p: 0.95,
  stop: null,
} as const;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json({ error: 'Missing GROQ_API_KEY.' }, { status: 500 });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Get latest user message for RAG context
    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');
    const retrievedContext = latestUserMessage
      ? retrieveRelevantContext(latestUserMessage.content)
      : '';

    // Build conversation with context window
    const conversationMessages = buildConversationWindow(messages);

    // Create streaming completion
    const stream = await groq.chat.completions.create({
      ...STREAM_CONFIG,
      messages: [
        {
          role: 'system',
          content: composeSystemPrompt(retrievedContext),
        },
        ...conversationMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    let tokenCount = 0;

    // Advanced ReadableStream with proper chunk handling
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          // Send start signal
          controller.enqueue(encoder.encode('【STREAM_START】\n'));

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? '';
            
            if (content) {
              tokenCount += content.split(/\b/).length;
              
              // Send token with metadata
              const streamData = JSON.stringify({
                type: 'token',
                content,
                tokens: tokenCount,
              });
              
              controller.enqueue(encoder.encode(`【DATA:${streamData}】`));
            }

            // Check for completion
            if (chunk.choices[0]?.finish_reason) {
              controller.enqueue(encoder.encode(`【DATA:${JSON.stringify({ type: 'done', tokens: tokenCount })}】`));
              break;
            }
          }
        } catch (error) {
          const errorData = JSON.stringify({
            type: 'error',
            message: error instanceof Error ? error.message : 'Streaming interrupted',
          });
          controller.enqueue(encoder.encode(`【DATA:${errorData}】`));
        } finally {
          controller.enqueue(encoder.encode('\n【STREAM_END】'));
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
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
