import type React from "react"
import styled from "styled-components"
import { useTheme } from "../contexts/ThemeContext"
import { Settings } from "lucide-react"

const ThemeSelectorContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
`

const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`

const ThemeSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
`

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <ThemeSelectorContainer>
      <SettingsButton>
        <Settings size={24} />
      </SettingsButton>
      <ThemeSelect value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="default">Default</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </ThemeSelect>
    </ThemeSelectorContainer>
  )
}

export default ThemeSelector

