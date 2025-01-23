import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd"
import KanbanCard from "./KanbanCard"
import type { Column, Card } from "../../types/kanban"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { fetchCards, createCard } from "../../services/api/card"
import CardModal from "../Card/CardModal"

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  padding: 8px;
`

interface CardListProps {
  isDraggingOver: boolean;
}

const CardList = styled.div<CardListProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "lightgrey" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`

const AddCardButton = styled.button`
  margin: 8px;
  padding: 5px 10px;
  background-color: #0052cc;
  color: white;
  border: none;
  cursor: pointer;
`

interface Props {
  column: Column
}

const KanbanColumn: React.FC<Props> = ({ column }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data: cards, isLoading, error } = useQuery(["cards", column.id], () => fetchCards(column.id))

  const createCardMutation = useMutation(createCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards", column.id])
    },
  })

  const handleCreateCard = (cardData: Omit<Card, "id">) => {
    createCardMutation.mutate({ ...cardData, columnId: column.id })
  }

  if (isLoading) return <div>Loading cards...</div>
  if (error) return <div>Error loading cards</div>

  return (
    <ColumnContainer>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <CardList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            {cards && cards.map((card, index) => <KanbanCard key={card.id} card={card} index={index} />)}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
      <AddCardButton onClick={() => setIsModalOpen(true)}>Add Card</AddCardButton>
      {isModalOpen && <CardModal onClose={() => setIsModalOpen(false)} onSave={handleCreateCard} />}
    </ColumnContainer>
  )
}

export default KanbanColumn

