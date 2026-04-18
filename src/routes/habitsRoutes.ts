import { Router } from 'express';
import { ValidateBody, ValidateParams } from '../middleware/validation.ts';
import z from 'zod';

const createHabitSchema = z.object({
    name: z.string().min(3, 'Habit name must be at least 3 characters long'),
    description: z.string().min(3, 'Habit description must be at least 3 characters long'),
});

const completeParamsSchema = z.object({
    id: z.string().max(3),
});

const completeBodySchema = z.object({
    completed: z.boolean().optional(),
});

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Habits' });
});

router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'Got one habit by id' });
});

router.post('/', ValidateBody(createHabitSchema), (req, res) => {
    res.status(201).json({ message: 'Habit created' });
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'Habit deleted' });
});

router.post('/:id/complete', ValidateParams(completeParamsSchema), ValidateBody(completeBodySchema),(req, res) => {
    res.status(200).json({ message: 'Habit completed' });
});

export default router;