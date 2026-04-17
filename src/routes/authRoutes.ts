import {Router} from 'express';


const router =Router();


router.post('/register',(req,res) => {
res.status(201).json({message: 'user Registered'
})
})
router.post('/Login',(req,res) => {
    res.status(200).json({message:'user logged in'
    })
})

export{Router}

export default router