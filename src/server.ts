import express from "express";
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitsRoutes.ts'

const app = express();
 
app.get ('/health', (req,res) => {
res.send({
message: 'hello'}) .status(200)
})  

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/habits',habitRoutes)

export{app}