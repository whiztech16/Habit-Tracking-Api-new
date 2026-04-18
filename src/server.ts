import express from "express";
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitsRoutes.ts'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express();
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev',{
 skip: () => isTestEnv(),
}))

 
app.get ('/health', (req,res) => {
res.send({
message: 'hello'}) .status(200)
})  

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/habits',habitRoutes)

export{app}

function isTestEnv() {
    return process.env.NODE_ENV === 'test';
}
