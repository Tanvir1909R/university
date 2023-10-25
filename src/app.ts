import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from './modules/users/user.route'
import globalErrorHandler from './middlewares/globalErrorHandler'

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req:Request,res:Response)=>{
    res.send('welcome to the server');
})


app.use('/user',userRoute)


// error handler
app.use(globalErrorHandler)

export default app