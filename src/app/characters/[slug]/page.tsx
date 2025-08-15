import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { ThreadChat } from '@/src/threads/components/thread-chat';

interface CharacterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  const character = await fetchQuery(api.characters.getCharacterBySlug, {
    slug,
  });

  if (!character) {
    return <div>Character not found</div>;
  }

  const threads = await fetchQuery(api.threads.getCharacterThreads, {
    characterId: character._id,
  });

  return (
    <div className="container mx-auto px-4">
      <section>
        {threads.map((thread) => (
          <ThreadChat key={thread._id} threadId={thread._id} />
        ))}
      </section>
    </div>
  );
}
