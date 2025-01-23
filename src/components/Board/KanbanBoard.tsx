import * as React from 'react';
import styled from "styled-components"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { fetchBoard, updateBoard } from "../../services/api/board"
import KanbanColumn from "./KanbanColumn"
import type { Board } from "../../types/kanban"

const BoardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  background-color: #f4f5f7;
`

const KanbanBoard: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: board, isLoading, error } = useQuery<Board>("board", fetchBoard)

  const updateBoardMutation = useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("board")
    },
  })

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newBoard = { ...board }
    const sourceColumn = newBoard.columns?.find((col) => col.id === source.droppableId)
    const destColumn = newBoard.columns?.find((col) => col.id === destination.droppableId)

    if (sourceColumn && destColumn) {
      sourceColumn.cardIds.splice(source.index, 1)
      destColumn.cardIds.splice(destination.index, 0, draggableId)

      updateBoardMutation.mutate(newBoard)
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  if (!board) return <div>No board data available</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {board.columns?.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </BoardContainer>
    </DragDropContext>
  )
}

export default KanbanBoard

