import {Router} from 'express';
import {login, register} from '../controllers/authcontroller.ts'
import { ValidateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';
import z from 'zod';

const loginSchema = z.object({
    email:z.string().email('invalid email'),
    password:z.string().min(1,'Password is  required')
})

const router =Router();


router.post('/register', ValidateBody(insertUserSchema),register
)
router.post('/Login', ValidateBody(loginSchema), login)
export{Router}

export default router