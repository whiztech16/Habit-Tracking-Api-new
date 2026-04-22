import {Router} from 'express'
import {
    getProfile
    ,updateProfile
    ,changePassword
} from '../controllers/usercontroller.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { ValidateBody } from '../middleware/validation.ts'
import {z} from 'zod'


const router =Router()
router.use (authenticateToken)
// Validation schemas
const updateProfileSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long')
    .optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number'
    ),
})

// User profile routes
router.get('/profile', getProfile)
router.put('/profile', ValidateBody(updateProfileSchema), updateProfile)
router.post('/change-password', ValidateBody(changePasswordSchema), changePassword)

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