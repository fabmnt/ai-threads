import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  characters: defineTable({
    name: v.string(),
    character_username: v.string(),
    description: v.string(),
    context: v.string(),
    systemPrompt: v.string(),
    slug: v.string(),
    visibility: v.union(v.literal('public'), v.literal('private')),
    total_threads: v.optional(v.number()),
    total_messages: v.optional(v.number()),
  }),
  threads: defineTable({
    title: v.string(),
    slug: v.string(),
    character: v.id('characters'),
    messages: v.array(v.id('messages')),
    visibility: v.union(v.literal('public'), v.literal('private')),
  }),
  messages: defineTable({
    thread: v.id('threads'),
    content: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
  }),
});
