import type React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import KanbanBoard from "./components/Board/KanbanBoard"
import { createGlobalStyle } from "styled-components"

const queryClient = new QueryClient()

type Theme = {
  mode: string;
}

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    background-color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ffffff"
      case "dark":
        return "#1a1a1a"
      default:
        return "#f0e6ff"
    }
  }};
    color: ${({ theme }) => (theme.mode === "dark" ? "#ffffff" : "#000000")};
    transition: all 0.3s ease;
  }
`

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const AppContent: React.FC = () => {
  const { theme } = useTheme()

  return (
    <>
      <GlobalStyle theme={{ mode: theme }} />
      <div className="App">
        <KanbanBoard />
      </div>
    </>
  )
}

export default App