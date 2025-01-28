import express from "express"
import { updateCard, deleteCard } from "../controllers/card.controller"

const router = express.Router()

router.put("/:id", updateCard)
router.delete("/:id", deleteCard)

export default router

