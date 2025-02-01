'use client'

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Doc } from "@/convex/_generated/dataModel"

interface TaskProgressCardProps {
  tasks: Doc<'tasks'>[]
}

const TaskProgressCard = ({ tasks }: TaskProgressCardProps) => {
  const completedTasks = tasks.filter(task => task.isDone).length
  const completionPercentage = (completedTasks / tasks.length) * 100 || 0 // Added fallback for 0

  return (
    <Card className="mb-6 shadow-lg rounded-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Task Progress</h2>
        <Progress value={completionPercentage} className="h-2 bg-gray-200" />
        <p className="text-sm mt-2">
          {completedTasks} of {tasks.length} tasks completed
        </p>
      </div>
    </Card>
  )
}

export default TaskProgressCard