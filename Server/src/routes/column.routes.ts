import express from "express"
import { getCards, createCard } from "../controllers/card.controller"

const router = express.Router()

router.get("/:columnId/cards", getCards)
router.post("/:columnId/cards", createCard)

export default router

