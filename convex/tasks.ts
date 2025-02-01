import { v } from "convex/values"
import { mutation, query } from "./_generated/server"



export const create = mutation({
    args: {
        title: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity()
        if(!userId) throw new Error("Unauthorized")

        await ctx.db.insert("tasks", {
            title: args.title,
            isDone: false,
            createdAt: Date.now(),
            userId: args.userId
        })
    }
})

export const getTasks= query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("tasks").withIndex("by_user_id", (q) => q.eq("userId", args.userId)).collect()
    }
})

export const deleteTask = mutation({
    args: {
        taskId: v.id("tasks"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.taskId)
    }
})

export const updateTask = mutation({
    args: {
        taskId: v.id("tasks"),
        title: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.taskId, {
            title: args.title
        })
    }
})

export const toggleTask = mutation({
    args: {
        taskId: v.id("tasks"),
        isDone: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.taskId, {
            isDone: args.isDone
        })
    }
})
