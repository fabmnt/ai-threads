'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

interface ChatProps {
  characterId: string;
}

export default function Chat({ characterId }: ChatProps) {
  const [input, setInput] = useState('');
  const character = useQuery(api.characters.getCharacterById, {
    id: characterId as Id<'characters'>,
  });
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      body: {
        characterId,
      },
    }),
  });
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((message) => (
        <div className="whitespace-pre-wrap" key={message.id}>
          {message.role === 'user'
            ? 'User: '
            : `@${character?.character_username}: `}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
              default:
                return null;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-zinc-300 p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Say something..."
          value={input}
        />
      </form>
    </div>
  );
}
