import type React from "react"
import Task from "./Task"

interface ColumnProps {
  title: string
  tasks: { id: number; content: string }[]
  columnId: string
  moveTask: (taskId: number, sourceColumn: string, targetColumn: string) => void
}

const Column: React.FC<ColumnProps> = ({ title, tasks, columnId, moveTask }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = Number(e.dataTransfer.getData("taskId"))
    const sourceColumn = e.dataTransfer.getData("sourceColumn")
    moveTask(taskId, sourceColumn, columnId)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        minWidth: "200px",
        backgroundColor: "#f4f5f7",
        borderRadius: "5px",
        padding: "10px",
        marginRight: "10px",
      }}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} columnId={columnId} />
      ))}
    </div>
  )
}

export default Column

