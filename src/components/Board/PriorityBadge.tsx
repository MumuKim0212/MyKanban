import type React from "react"
import styled from "styled-components"

const Badge = styled.span<{ priority: string }>`
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => {
    switch (props.priority) {
      case "high":
        return "red"
      case "medium":
        return "orange"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }};
`

interface Props {
  priority: "low" | "medium" | "high"
}

const PriorityBadge: React.FC<Props> = ({ priority }) => {
  return <Badge priority={priority}>{priority.toUpperCase()}</Badge>
}

export default PriorityBadge

