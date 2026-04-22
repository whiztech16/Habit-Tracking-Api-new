import {Router} from 'express'
import { authenticateToken } from '../middleware/auth.ts'


const router =Router()
router.use (authenticateToken)

router.get('/',(req,res) => {
    res.json({message:'users'}).status(200)
})

router.get('/:id',(req,res) => {
    res.json({message:'got one user by id'}).status(200)
})
router.put('/:id',(req,res) => {
    res.json({message:'user updated'}).status(200)
})
router.delete('/:id',(req,res) => {
    res.json({message:'user deleted'}).status(200)
})

export default router