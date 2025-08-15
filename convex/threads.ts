import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getThreadById = query({
  args: {
    id: v.id('threads'),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.id);
    if (!thread) {
      throw new Error('Thread not found');
    }
    const messages = await ctx.db
      .query('messages')
      .filter((q) => q.eq(q.field('thread'), args.id))
      .collect();

    const character = await ctx.db.get(thread.character);

    return { ...thread, messages, character };
  },
});

export const getCharacterThreads = query({
  args: {
    characterId: v.id('characters'),
  },
  handler: async (ctx, args) => {
    const threads = await ctx.db
      .query('threads')
      .filter((q) => q.eq(q.field('character'), args.characterId))
      .collect();

    return threads;
  },
});

export const addMessage = mutation({
  args: {
    threadId: v.id('threads'),
    content: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.insert('messages', {
      thread: args.threadId,
      content: args.content,
      role: args.role,
    });
    return message;
  },
});
