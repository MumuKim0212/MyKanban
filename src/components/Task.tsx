import React from "react"

interface TaskProps {
  task: { id: number; content: string }
  columnId: string
}

const Task: React.FC<TaskProps> = ({ task, columnId }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id.toString())
    e.dataTransfer.setData("sourceColumn", columnId)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        backgroundColor: "white",
        padding: "10px",
        marginBottom: "5px",
        borderRadius: "3px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        cursor: "move",
      }}
    >
      {task.content}
    </div>
  )
}

export default Task

