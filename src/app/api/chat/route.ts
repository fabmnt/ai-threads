import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { env } from '@/env';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const openrouter = createOpenRouter({
    apiKey: env.OPENROUTER_API_KEY,
  });
  const {
    messages,
    characterId,
  }: { messages: UIMessage[]; characterId: string } = await req.json();

  const character = await fetchQuery(api.characters.getCharacterById, {
    id: characterId as Id<'characters'>,
  });

  if (!character) {
    return new Response('Character not found', { status: 404 });
  }

  const result = streamText({
    model: openrouter(
      'cognitivecomputations/dolphin-mistral-24b-venice-edition:free'
    ),
    system: character.systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
