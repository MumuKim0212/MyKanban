import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Label } from "../../types/kanban"

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`

const LabelItem = styled.span`
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #888;
  margin-left: 5px;
  cursor: pointer;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`

interface LabelInputProps {
  labels: Label[]
  onChange: (labels: Label[]) => void
}

const LabelInput: React.FC<LabelInputProps> = ({ labels, onChange }) => {
  const [inputValue, setInputValue] = useState("")

  const handleAddLabel = () => {
    if (inputValue.trim()) {
      const newLabel: Label = {
        id: crypto.randomUUID(),
        name: inputValue.trim(),
      }
      onChange([...labels, newLabel])
      setInputValue("")
    }
  }

  const handleDeleteLabel = (id: string) => {
    onChange(labels.filter((label) => label.id !== id))
  }

  return (
    <div>
      <LabelContainer>
        {labels.map((label) => (
          <LabelItem key={label.id}>
            {label.name}
            <DeleteButton onClick={() => handleDeleteLabel(label.id)}>&times;</DeleteButton>
          </LabelItem>
        ))}
      </LabelContainer>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddLabel()}
        placeholder="Add a label and press Enter"
      />
    </div>
  )
}

export default LabelInput