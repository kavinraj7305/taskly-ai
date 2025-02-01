'use client'

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { api } from "@/convex/_generated/api"
import { useAuth } from "@clerk/nextjs"
import { useQuery } from "convex/react"

const TaskProgressedCard = () => {
    const { userId } = useAuth()
    const tasks = useQuery(api.tasks.getTasks, {
        userId: userId || ''
    })
    if (!tasks) {
        return <div>Loading...</div>
    }
    const completedTasks = tasks.filter(task => task.isDone).length
    const completionPercentage = (completedTasks / tasks.length) * 100
    return(
        <Card className="mb-6 shadow-lg rounded-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold  mb-4">Task Progress</h2>
        <Progress value={completionPercentage} className="h-2 bg-gray-200" />
        <p className="text-sm mt-2">
          {completedTasks} of {tasks.length} tasks completed
        </p>
      </div>
    </Card>
    )
}

export default TaskProgressedCard