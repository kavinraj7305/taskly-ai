import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getConvexClient } from "@/lib/convex";
import { auth } from "@clerk/nextjs/server";
import { tool } from "ai";
import zod from "zod";

const convex = getConvexClient()
export const taskTools = {
    createTask: tool({
        description: "Create a new task",
        parameters: zod.object({
            title: zod.string().describe("The title of the task"),
    }),
    execute:async({title} : {title:string})=>{
        const {userId} = await auth()
        if(!userId){
            return { success: false, error: "User not found" }
        }
        const taskId = await convex.mutation(api.tasks.create, {
            title,
            userId
        })
        return { success: true, message: `Task created with id: ${taskId}` }
}
}),
getTasks: tool({
    description: "Get task from database",
    parameters: zod.object({}),
    execute: async()=>{
        const {userId} = await auth()
        if(!userId){
            return { success: false, error: "User not found" }
        }
        const tasks = await convex.query(api.tasks.getTasks, {userId:userId})
        return { success: true, tasks }
    }
}),
deleteTask: tool({
    description: "Delete a task",
    parameters: zod.object({
        taskId: zod.string().describe("The id of the task to delete"),
    }),
    execute: async({taskId}: {taskId:string})=>{
        await convex.mutation(api.tasks.deleteTask, {taskId:taskId as Id<"tasks"> })
        return { success: true, message: `Task deleted with id: ${taskId}` }
    }
}),
updateTask: tool({
    description: "Update a task",
    parameters: zod.object({
        taskId: zod.string().describe("The id of the task to update"),
        title: zod.string().describe("The new title of the task"),
    }),
    execute: async({taskId, title}: {taskId:string, title:string})=>{
        await convex.mutation(api.tasks.updateTask, {taskId:taskId as Id<"tasks">, title});
        return { success: true, message: `Task updated with id: ${taskId}` }
    }
}),
}