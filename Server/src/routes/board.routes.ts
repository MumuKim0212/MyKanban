import express from 'express';
import { getBoard, updateBoard } from '../controllers/board.controller';

const router = express.Router();

router.get('/', getBoard);
router.put('/', updateBoard);

export default router;