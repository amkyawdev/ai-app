import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Use Vercel AI SDK streamText
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // System prompt for context management
    const systemMessage = {
      role: 'system',
      content:
        'You are Amkyaw AI, a helpful and precise assistant. Focus strictly on answering the user\'s core intent with high accuracy. Keep responses concise but informative.',
    };

    // Get last 15 messages for context management
    const recentMessages = messages.slice(-15);
    
    // Build conversation with system prompt
    const conversation = [systemMessage, ...recentMessages];

    // Use Vercel AI SDK streamText with Groq model
    const result = streamText({
      model: groq('llama-4-scout-17b-8eq-2025-06-03'),
      messages: conversation,
      temperature: 0.5,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}