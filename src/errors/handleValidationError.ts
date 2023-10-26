import mongoose from 'mongoose'
import { iErrorResponse } from '../interface/common'

const handleValidationError = (err:mongoose.Error.ValidationError):iErrorResponse =>{
    const errors = Object.values(err.errors).map(obj =>{
        return{
            path:obj?.path,
            message:obj?.message
        }
    })

    return {
        statusCode:400,
        message:"validationError",
        errorMessages: errors
    }
}

export default handleValidationError