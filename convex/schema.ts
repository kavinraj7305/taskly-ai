import { v } from "convex/values";
import { defineTable, defineSchema } from "convex/server";

export default defineSchema({
    tasks: defineTable({
        title: v.string(),
        isDone: v.boolean(),
        createdAt: v.number(),
        userId: v.string(),
    }).index("by_user_id", ["userId"])
})