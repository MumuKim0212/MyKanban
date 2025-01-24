import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"
import type { Card } from "../../types/kanban"
import PriorityBadge from "./PriorityBadge"
import CardModal from "../Card/CardModal"
import { useMutation, useQueryClient } from "react-query"
import { updateCard, deleteCard } from "../../services/api/card"
import { useTheme } from "../../contexts/ThemeContext"
import type { Project, TaskStatus } from "../../types"

const CardContainer = styled.div<{ isDragging: boolean; theme: string }>`
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ddd")};
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => {
    if (props.isDragging) {
      return props.theme === "dark" ? "#4a4a4a" : "#e6e6e6"
    }
    switch (props.theme) {
      case "light":
        return "#ffffff"
      case "dark":
        return "#3a3a3a"
      default:
        return "#f8f0ff"
    }
  }};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`

const ActionButton = styled.button<{ theme: string }>`
  margin-left: 4px;
  padding: 2px 5px;
  background-color: ${({ theme }) => (theme === "dark" ? "#555" : "#f4f5f7")};
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#777" : "#dfe1e6")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  cursor: pointer;
`

interface Props {
  card: Card
  index: number
  projects: Project[]
  updateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void
  addSubTask: (projectId: string, taskId: string, subTaskContent: string) => void
}

const KanbanCard: React.FC<Props> = ({ card, index, projects, updateTaskStatus, addSubTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { theme } = useTheme()

  const updateCardMutation = useMutation(updateCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards", card.columnId])
    },
  })

  const deleteCardMutation = useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards", card.columnId])
    },
  })

  const handleUpdateCard = (updatedCard: Omit<Card, "id">) => {
    updateCardMutation.mutate({ ...updatedCard, id: card.id })
    // Also update the task status in the projects state
    const project = projects.find((p) => p.tasks.some((t) => t.id === card.id))
    if (project) {
      updateTaskStatus(project.id, card.id, updatedCard.status as TaskStatus)
    }
  }

  const handleDeleteCard = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCardMutation.mutate(card.id)
    }
  }

  const handleAddSubTask = (content: string) => {
    const project = projects.find((p) => p.tasks.some((t) => t.id === card.id))
    if (project) {
      addSubTask(project.id, card.id, content)
    }
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          theme={theme}
        >
          <h4>{card.title}</h4>
          <PriorityBadge priority={card.priority} />
          <div>Assignee: {card.assignee}</div>
          <div>
            {card.labels.map((label) => (
              <span
                key={label.id}
                style={{
                  marginRight: "4px",
                  backgroundColor: theme === "dark" ? "#555" : "#ddd",
                  color: theme === "dark" ? "#fff" : "#000",
                  padding: "2px 4px",
                  borderRadius: "2px",
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
          <CardActions>
            <ActionButton onClick={() => setIsModalOpen(true)} theme={theme}>
              Edit
            </ActionButton>
            <ActionButton onClick={handleDeleteCard} theme={theme}>
              Delete
            </ActionButton>
          </CardActions>
          {isModalOpen && (
            <CardModal
              card={card}
              onClose={() => setIsModalOpen(false)}
              onSave={handleUpdateCard}
              onAddSubTask={handleAddSubTask}
            />
          )}
        </CardContainer>
      )}
    </Draggable>
  )
}

export default KanbanCard

