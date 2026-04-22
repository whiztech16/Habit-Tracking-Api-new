import { Router } from 'express';
import { ValidateBody, ValidateParams } from '../middleware/validation.ts';
import { authenticateToken } from '../middleware/auth.ts';
import z from 'zod';
import {createHabit, getUserHabits, updateHabit} from '../controllers/habitcontrollers.ts'

const createHabitSchema = z.object({
    name: z.string().min(3, 'Habit name must be at least 3 characters long'),
    description: z.string().min(3, 'Habit description must be at least 3 characters long').optional(),
    frequency: z.string(),
    targetCount: z.number().int().positive().optional(),
    tagIds: z.array(z.string()).optional()
});

const completeParamsSchema = z.object({
    id: z.string().max(3),
});

const completeBodySchema = z.object({
    completed: z.boolean().optional(),
});
 
const router = Router();
router.use(authenticateToken)

router.get('/', getUserHabits);
router.patch('/:id',updateHabit)
router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'Got one habit by id' });
});

router.post('/', ValidateBody(createHabitSchema), createHabit);

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'Habit deleted' });
});

router.post('/:id/complete', ValidateParams(completeParamsSchema), ValidateBody(completeBodySchema),(req, res) => {
    res.status(200).json({ message: 'Habit completed' });
});

export default router;