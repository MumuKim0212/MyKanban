import type React from "react"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import styled from "styled-components"
import { fetchBoard, updateBoard } from "../../services/api/board"
import type { Board } from "../../types/kanban"
import KanbanColumn from "./KanbanColumn"
import ThemeSelector from "../ThemeSelector"
import { useTheme } from "../../contexts/ThemeContext"
import { type Project, Task, SubTask, type TaskStatus } from "../../types"

const BoardContainer = styled.div<{ theme: string }>`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  background-color: ${({ theme }) => {
    switch (theme) {
      case "light":
        return "#f4f5f7"
      case "dark":
        return "#2d2d2d"
      default:
        return "#e6e6fa"
    }
  }};
  min-height: 100vh;
`

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
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const queryClient = useQueryClient()
  const { data: board, isLoading, error } = useQuery<Board>("board", fetchBoard)
  const { theme } = useTheme()

  const updateBoardMutation = useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("board")
    },
  })

  const updateTaskStatus = (projectId: string, taskId: string, newStatus: TaskStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
            }
          : project,
      ),
    )
  }

  const addSubTask = (projectId: string, taskId: string, subTaskContent: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
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
          : project,
      ),
    )
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newBoard = { ...board }
    const sourceColumn = newBoard.columns?.find((col) => col.id === source.droppableId)
    const destColumn = newBoard.columns?.find((col) => col.id === destination.droppableId)

    if (sourceColumn && destColumn) {
      const [movedCard] = sourceColumn.cardIds.splice(source.index, 1)
      destColumn.cardIds.splice(destination.index, 0, movedCard)

      updateBoardMutation.mutate(newBoard)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {(error as Error).message}</div>
  if (!board) return <div>No board data available. Please check the backend.</div>

  return (
    <BoardContainer theme={theme}>
      <ThemeSelector />
      <DragDropContext onDragEnd={onDragEnd}>
        {board.columns?.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            projects={projects}
            updateTaskStatus={updateTaskStatus}
            addSubTask={addSubTask}
          />
        ))}
      </DragDropContext>
    </BoardContainer>
  )
}

export default KanbanBoard

