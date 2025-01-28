import axios from "axios"
import type { Card } from "../../types/kanban"

//const API_URL = process.env.REACT_APP_API_URL || "http://158.179.195.203"

export const fetchCards = async (columnId: string): Promise<Card[]> => {
  const response = await axios.get(`/api/columns/${columnId}/cards`)
  return response.data
}

export const createCard = async (columnId: string, card: Omit<Card, "id">): Promise<Card> => {
  const response = await axios.post(`/api/columns/${columnId}/cards`, card)
  return response.data
}

export const updateCard = async (card: Card): Promise<Card> => {
  const response = await axios.put(`/api/cards/${card.id}`, card)
  return response.data
}

export const deleteCard = async (cardId: string): Promise<void> => {
  await axios.delete(`/api/cards/${cardId}`)
}

export const addCardToColumn = async (columnId: string, card: Omit<Card, "id">): Promise<Card> => {
  const response = await axios.post(`/api/columns/${columnId}/cards`, card)
  return response.data
}

