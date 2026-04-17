import {Router} from 'express';

const router =Router()

router.get('/',(req,res) => {
res.json({message:'Habits'})
})


router.get('/:id',(req,res) => {
res.json({message:'got one habit  by id    '})
})
router.post('/',(req,res) => {
res.json({message:'Habits created '}).status(201)
})

router.delete('/:id',(req,res) => {
res.json({message:'Habits deleted'}).status(200)
})

router.post('/:id/complete',(req,res) => {
res.json({message:'Habit Completed'}).status(201)

})

export default router