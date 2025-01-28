import type React from "react"
import type { Project, TaskStatus } from "../types"
import TaskCard from "./TaskCard"

interface ProjectColumnProps {
  project: Project
  updateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void
  addSubTask: (projectId: string, taskId: string, subTaskContent: string) => void
}

const ProjectColumn: React.FC<ProjectColumnProps> = ({ project, updateTaskStatus, addSubTask }) => {
  return (
    <div
      style={{
        minWidth: "300px",
        backgroundColor: "#f4f5f7",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px",
      }}
    >
      <h2>{project.name}</h2>
      {project.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateStatus={(newStatus) => updateTaskStatus(project.id, task.id, newStatus)}
          addSubTask={(content) => addSubTask(project.id, task.id, content)}
        />
      ))}
    </div>
  )
}

export default ProjectColumn

