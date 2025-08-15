'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

interface ThreadChatProps {
  threadId: Id<'threads'>;
}

export function ThreadChat({ threadId }: ThreadChatProps) {
  const thread = useQuery(api.threads.getThreadById, {
    id: threadId,
  });

  const previousMessages =
    thread?.messages.map((message) => ({
      role: message.role,
      id: message._id,
      parts: [{ type: 'text' as const, text: message.content }],
    })) ?? [];

  const { messages, sendMessage, error } = useChat({
    id: threadId,
    transport: new DefaultChatTransport({
      body: {
        threadId,
      },
      prepareSendMessagesRequest({ messages: allMessages, id }) {
        return { body: { message: allMessages.at(-1), threadId: id } };
      },
    }),
    messages: previousMessages,
  });

  const [input, setInput] = useState('');

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'user'
            ? 'You: '
            : `@${thread.character?.character_username}: `}
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
      {error && <div>{error.message}</div>}
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
