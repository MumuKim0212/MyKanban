import axios from "axios"
import type { Board } from "../../types/kanban"

const API_URL = process.env.REACT_APP_API_URL || "http://158.179.195.203"

export const fetchBoard = async (): Promise<Board> => {
  const response = await axios.get(`${API_URL}/api/board`)
  return response.data
}

export const updateBoard = async (board: Board): Promise<Board> => {
  const response = await axios.put(`${API_URL}/api/board`, board)
  return response.data
}