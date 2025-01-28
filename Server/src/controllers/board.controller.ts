import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBoard = async (req: Request, res: Response) => {
  try {
    let board = await prisma.board.findFirst({
      include: {
        columns: {
          include: {
            cards: true,
          },
        },
      },
    });

    if (!board) {
      // 보드가 없을 경우 기본 보드를 생성
      board = await prisma.board.create({
        data: {
          title: "Default Kanban Board",
          columns: {
            create: [
              { title: "To Do", cardIds: "" },
              { title: "In Progress", cardIds: "" },
              { title: "Done", cardIds: "" },
            ],
          },
        },
        include: {
          columns: {
            include: {
              cards: true,
            },
          },
        },
      });
    }

    res.json(board);
  } catch (error) {
    console.error("Error fetching or creating board:", error);
    res.status(500).json({ error: 'Error fetching or creating board' });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id, columns } = req.body;
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: {
        columns: {
          updateMany: columns.map((column: any) => ({
            where: { id: column.id },
            data: { cardIds: column.cardIds },
          })),
        },
      },
      include: {
        columns: {
          include: {
            cards: true,
          },
        },
      },
    });
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: 'Error updating board' });
  }
};