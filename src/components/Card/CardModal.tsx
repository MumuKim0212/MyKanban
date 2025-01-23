import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Card } from "../../types/kanban"
import CardForm from "./CardForm"

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
`

interface Props {
  card?: Card
  onClose: () => void
  onSave: (card: Omit<Card, "id">) => void
}

const CardModal: React.FC<Props> = ({ card, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Card, "id">>(
    card || {
      title: "",
      description: "",
      priority: "low",
      assignee: "",
      labels: [],
      columnId: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{card ? "Edit Card" : "Create New Card"}</h2>
        <CardForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      </ModalContent>
    </ModalBackground>
  )
}

export default CardModal

