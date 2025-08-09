import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  characters: defineTable({
    name: v.string(),
    description: v.string(),
    context: v.string(),
    systemPrompt: v.string(),
    slug: v.string(),
  }),
  threads: defineTable({
    character: v.id('characters'),
    messages: v.array(v.id('messages')),
  }),
  messages: defineTable({
    thread: v.id('threads'),
    content: v.string(),
  }),
});
