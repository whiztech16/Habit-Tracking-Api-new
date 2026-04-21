import {Router} from 'express';
import {register} from '../controllers/authcontroller.ts'
import { ValidateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';

const router =Router();


router.post('/register', ValidateBody(insertUserSchema),register
)
router.post('/Login',(req,res) => {
    res.status(200).json({message:'user logged in'
    })
})

export{Router}

export default router