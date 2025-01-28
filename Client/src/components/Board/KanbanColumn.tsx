import type React from "react"
import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd"
import KanbanCard from "./KanbanCard"
import { type Column, Card } from "../../types/kanban"
import { useQuery } from "react-query"
import { fetchCards } from "../../services/api/card"
import { useTheme } from "../../contexts/ThemeContext"
import type { Project, TaskStatus } from "../../types"

const ColumnContainer = styled.div<{ theme: string }>`
  margin: 8px;
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ddd")};
  background-color: ${({ theme }) => {
    switch (theme) {
      case "light":
        return "#ffffff"
      case "dark":
        return "#2d2d2d"
      default:
        return "#f0f0ff"
    }
  }};
  border-radius: 2px;
  width: 280px;
  display: flex;
  flex-direction: column;
`

const AddCardButton = styled.button`
  margin-top: 8px;
  padding: 8px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`

const Title = styled.h3<{ theme: string }>`
  padding: 8px;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`

const CardList = styled.div<{ isDraggingOver: boolean; theme: string }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? (props.theme === "dark" ? "#3a3a3a" : "#e0e0e0") : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`

interface Props {
  column: Column
  projects: Project[]
  updateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void
  addSubTask: (projectId: string, taskId: string, subTaskContent: string) => void
  onAddCard: () => void
}

const KanbanColumn: React.FC<Props> = ({ column, projects, updateTaskStatus, addSubTask, onAddCard }) => {
  const { theme } = useTheme()
  const { data: cards, isLoading, error } = useQuery(["cards", column.id], () => fetchCards(column.id))

  if (isLoading) return <div>Loading cards...</div>
  if (error) return <div>Error loading cards</div>

  return (
    <ColumnContainer theme={theme}>
      <Title theme={theme}>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <CardList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            theme={theme}
          >
            {cards &&
              cards.map((card, index) => (
                <KanbanCard
                  key={card.id}
                  card={card}
                  index={index}
                  projects={projects}
                  updateTaskStatus={updateTaskStatus}
                  addSubTask={addSubTask}
                />
              ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
      <AddCardButton onClick={onAddCard}>Add Card</AddCardButton>
    </ColumnContainer>
  )
}

export default KanbanColumn

