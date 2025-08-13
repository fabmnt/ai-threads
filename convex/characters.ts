import { v } from 'convex/values';
import { query } from './_generated/server';

export const getAllCharacters = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('characters').collect();
  },
});

export const getCharacterById = query({
  args: {
    id: v.id('characters'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getCharacterBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('characters')
      .filter((q) => q.eq(q.field('slug'), args.slug))
      .first();
  },
});
