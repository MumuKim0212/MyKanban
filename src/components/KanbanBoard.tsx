import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { type Project, Task, SubTask, type TaskStatus } from "../types"
import ProjectColumn from "./ProjectColumn"
import { fetchBoard } from "../services/api/board"
import { useQuery } from "react-query"

const initialProjects: Project[] = [
  {
    id: "1",
    name: "서버",
    tasks: [
      {
        id: "1-1",
        content: "리소스 조회 페이지 제작",
        status: "진행 중",
        subTasks: [
          {
            id: "1-1-1",
            content: "API 설계",
            status: "완료",
            startTime: new Date("2023-06-01"),
            endTime: new Date("2023-06-02"),
          },
          { id: "1-1-2", content: "프론트엔드 구현", status: "진행 중", startTime: new Date("2023-06-03") },
        ],
        startTime: new Date("2023-06-01"),
      },
    ],
  },
  {
    id: "2",
    name: "운영툴",
    tasks: [
      {
        id: "2-1",
        content: "로그인 API 구현",
        status: "할 일",
        subTasks: [],
      },
    ],
  },
]

const KanbanBoard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    // 여기서 프로젝트 데이터를 가져오는 로직을 구현합니다.
    // 실제 구현에서는 API 호출 등을 통해 데이터를 가져와야 합니다.
    const mockProject: Project = {
      id: projectId || "1", // Default to first project if projectId is not provided
      name: `프로젝트 ${projectId || "1"}`, // Default to first project name if projectId is not provided
      tasks: initialProjects.find((p) => p.id === (projectId || "1"))?.tasks || [], // Default to first project tasks if projectId is not provided
    }
    setProject(mockProject)
  }, [projectId])

  if (!project) {
    return <div>로딩 중...</div>
  }

  const updateTaskStatus = (projectId: string, taskId: string, newStatus: TaskStatus) => {
    setProject((prevProject) => {
      if (!prevProject) return prevProject
      return {
        ...prevProject,
        tasks: prevProject.tasks.map((task) =>
          task.id === taskId
            ? { ...task, status: newStatus, endTime: newStatus === "완료" ? new Date() : task.endTime }
            : task,
        ),
      }
    })
  }

  const addSubTask = (projectId: string, taskId: string, subTaskContent: string) => {
    setProject((prevProject) => {
      if (!prevProject) return prevProject
      return {
        ...prevProject,
        tasks: prevProject.tasks.map((task) =>
          task.id === taskId
            ? {
              ...task,
              subTasks: [
                ...task.subTasks,
                {
                  id: `${taskId}-${task.subTasks.length + 1}`,
                  content: subTaskContent,
                  status: "할 일",
                },
              ],
            }
            : task,
        ),
      }
    })
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <ProjectColumn project={project} updateTaskStatus={updateTaskStatus} addSubTask={addSubTask} />
      </div>
    </div>
  )
}

export default KanbanBoard

