import type React from "react"
import styled from "styled-components"
import { useTheme } from "../../contexts/ThemeContext"

const Badge = styled.span<{ priority: string; theme: string }>`
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => (theme === "dark" ? "#000" : "#fff")};
  background-color: ${(props) => {
    const baseColor = props.theme === "dark" ? "255, 255, 255," : "0, 0, 0,"
    switch (props.priority) {
      case "high":
        return `rgba(${baseColor} 0.8)`
      case "medium":
        return `rgba(${baseColor} 0.6)`
      case "low":
        return `rgba(${baseColor} 0.4)`
      default:
        return `rgba(${baseColor} 0.2)`
    }
  }};
`

interface Props {
  priority: "low" | "medium" | "high"
}

const PriorityBadge: React.FC<Props> = ({ priority }) => {
  const { theme } = useTheme()
  return (
    <Badge priority={priority} theme={theme}>
      {priority.toUpperCase()}
    </Badge>
  )
}

export default PriorityBadge

