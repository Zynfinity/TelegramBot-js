import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        password: v.string(),
    }),
    bots: defineTable({
        name: v.string(),
        token: v.string()
    })
});