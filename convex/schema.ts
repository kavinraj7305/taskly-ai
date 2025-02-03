import { v } from "convex/values";
import { defineTable, defineSchema } from "convex/server";

export default defineSchema({
    tasks: defineTable({
        title: v.string(),
        isDone: v.boolean(),
        createdAt: v.number(),
        userId: v.string(),
        status: v.union(v.literal("pending"), v.literal("completed")),
    }).index("by_user_id", ["userId"])
})