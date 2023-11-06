import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'
import userRoute from './modules/users/user.route'
import academicRoute from './modules/academicSemester/academic.route'
import httpStatus from 'http-status'

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',async (req:Request,res:Response)=>{
    res.send('welcome to the server');
    // Promise.reject()
})


app.use('/user',userRoute);
app.use('/academic',academicRoute)



// error handler
app.use(globalErrorHandler)

// handle not found error
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:"Not found",
        errorMessage:[
            {
                Path:req.originalUrl,
                message:"Route not found"
            }
        ]
    })
    next()
})

export default app