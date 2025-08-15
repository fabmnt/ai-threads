import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, type UIMessage } from 'ai';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { env } from '@/env';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const openrouter = createOpenRouter({
    apiKey: env.OPENROUTER_API_KEY,
  });
  const { message, threadId }: { message: UIMessage; threadId: string } =
    await req.json();

  if (message.role === 'user') {
    const text = message.parts.find((part) => part.type === 'text')?.text;
    if (!text) {
      return new Response('No content provided in user message', {
        status: 400,
      });
    }

    await fetchMutation(api.threads.addMessage, {
      threadId: threadId as Id<'threads'>,
      content: text,
      role: 'user',
    });
  }

  const populatedThread = await fetchQuery(api.threads.getThreadById, {
    id: threadId as Id<'threads'>,
  });

  if (!populatedThread) {
    return new Response('Thread not found', { status: 404 });
  }

  const previousMessages = populatedThread.messages;

  const result = streamText({
    model: openrouter(
      'cognitivecomputations/dolphin-mistral-24b-venice-edition:free'
    ),
    system: `
    You are a character in a chat thread.
    You must follow the following instructions for playing the character:
    ${populatedThread.character?.systemPrompt}
    `,
    messages: previousMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  return result.toUIMessageStreamResponse({
    onFinish: async ({ responseMessage }) => {
      const responseText = responseMessage.parts.find(
        (part) => part.type === 'text'
      )?.text;

      if (!responseText) {
        return;
      }

      await fetchMutation(api.threads.addMessage, {
        threadId: populatedThread._id,
        content: responseText,
        role: 'assistant',
      });
    },
  });
}
