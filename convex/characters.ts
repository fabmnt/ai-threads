import { query } from './_generated/server';

export const getAllCharacters = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('characters').collect();
  },
});
