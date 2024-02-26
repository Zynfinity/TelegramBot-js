import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listBot = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bots").collect();
  },
});
export const newBot = mutation({
  args: { name: v.string(), token: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bots", { name: args.name, token: args.token });
    // do something with `taskId`
  },
});
export const deleteBot = mutation({
  args: { id: v.id("bots") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
    // do something with `taskId`
  },
})