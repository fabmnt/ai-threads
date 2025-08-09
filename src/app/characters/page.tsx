'use client';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Doc } from '../../../convex/_generated/dataModel';

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
        {characters.map((character: Doc<'characters'>) => (
          <div
            className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
            key={character._id}
          >
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 text-xl dark:text-white">
                {character.name}
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="mb-1 font-medium text-gray-500 text-sm dark:text-gray-400">
                  Description
                </p>
                <p className="text-gray-700 text-sm dark:text-gray-300">
                  {character.description}
                </p>
              </div>
              {character.context && (
                <div>
                  <p className="mb-1 font-medium text-gray-500 text-sm dark:text-gray-400">
                    Context
                  </p>
                  <p className="text-gray-700 text-sm dark:text-gray-300">
                    {character.context}
                  </p>
                </div>
              )}
              <div>
                <p className="mb-1 font-medium text-gray-500 text-sm dark:text-gray-400">
                  System Prompt
                </p>
                <p className="truncate text-gray-700 text-sm dark:text-gray-300">
                  {character.systemPrompt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
