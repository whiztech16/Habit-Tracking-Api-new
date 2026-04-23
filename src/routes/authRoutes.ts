import { Router } from 'express';
import { login, register } from '../controllers/authcontroller.ts'
import { ValidateBody } from '../middleware/validation.ts';
import z from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

const router = Router();

router.post('/register', ValidateBody(registerSchema), register)
router.post('/login', ValidateBody(loginSchema), login)

export default router