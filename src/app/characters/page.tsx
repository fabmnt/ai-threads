'use client';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CharacterCard } from '@/src/characters/components/character-card';

export default function CharactersPage() {
  const characters = useQuery(api.characters.getAllCharacters);

  if (!characters) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-bold text-3xl">Characters</h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading characters...</div>
        </div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-bold text-3xl">Characters</h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">No characters found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">Characters</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard character={character} key={character._id} />
        ))}
      </div>
    </div>
  );
}
