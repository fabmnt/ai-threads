import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import Chat from '@/src/threads/components/chat';

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

  return (
    <div className="container mx-auto px-4">
      <section>
        <Chat characterId={character._id} />
      </section>
    </div>
  );
}
