import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCards = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.query;
    const cards = await prisma.card.findMany({
      where: {
        columnId: columnId as string,
      },
      include: {
        labels: true,
      },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, assignee, labels, columnId } = req.body;
    const newCard = await prisma.card.create({
      data: {
        title,
        description,
        priority,
        assignee,
        column: { connect: { id: columnId } },
        labels: {
          connectOrCreate: labels.map((label: string) => ({
            where: { name: label },
            create: { name: label },
          })),
        },
      },
      include: {
        labels: true,
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: 'Error creating card' });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, assignee, labels } = req.body;
    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        assignee,
        labels: {
          set: [],
          connectOrCreate: labels.map((label: string) => ({
            where: { name: label },
            create: { name: label },
          })),
        },
      },
      include: {
        labels: true,
      },
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: 'Error updating card' });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.card.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting card' });
  }
};