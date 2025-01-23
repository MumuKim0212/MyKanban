import * as React from 'react';
import { QueryClient, QueryClientProvider } from "react-query"
import KanbanBoard from "./components/Board/KanbanBoard"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>칸반 보드</h1>
        <KanbanBoard />
      </div>
    </QueryClientProvider>
  )
}

export default App

