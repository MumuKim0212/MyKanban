import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd"
import type { Card } from "../../types/kanban"
import PriorityBadge from "./PriorityBadge"
import CardModal from "../Card/CardModal"
import { useMutation, useQueryClient } from "react-query"
import { updateCard, deleteCard } from "../../services/api/card"

interface CardContainerProps {
  isDragging: boolean
}

const CardContainer = styled.div<CardContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`

const ActionButton = styled.button`
  margin-left: 4px;
  padding: 2px 5px;
  background-color: #f4f5f7;
  border: 1px solid #dfe1e6;
  cursor: pointer;
`

interface Props {
  card: Card
  index: number
}

const KanbanCard: React.FC<Props> = ({ card, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const updateCardMutation = useMutation(updateCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards", card.columnId])
    },
  })

  const deleteCardMutation = useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards", card.columnId])
    },
  // const updateCardMutation = useMutation(updateCard, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("board")
  //   },
  // })

  // const deleteCardMutation = useMutation(deleteCard, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("board")
  //   },
  })

  const handleUpdateCard = (updatedCard: Omit<Card, "id">) => {
    updateCardMutation.mutate({ ...updatedCard, id: card.id })
  }

  const handleDeleteCard = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCardMutation.mutate(card.id)
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
        >
          <h4>{card.title}</h4>
          <PriorityBadge priority={card.priority} />
          <div>Assignee: {card.assignee}</div>
          <div>
            {card.labels.map(label => (
              <span key={label.id} style={{ marginRight: '4px', backgroundColor: '#ddd', padding: '2px 4px', borderRadius: '2px' }}>
                {label.name}
              </span>
            ))}
          </div>
          <CardActions>
            <ActionButton onClick={() => setIsModalOpen(true)}>Edit</ActionButton>
            <ActionButton onClick={handleDeleteCard}>Delete</ActionButton>
          </CardActions>
          {isModalOpen && (
            <CardModal
              card={card}
              onClose={() => setIsModalOpen(false)}
              onSave={handleUpdateCard}
            />
          )}
        </CardContainer>
      )}
    </Draggable>
  );
};

export default KanbanCard;
