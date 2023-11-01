import { ZodError, ZodIssue } from "zod"
import { iErrorResponse } from "../interface/common"


const handleZodError = (err:ZodError) => {
    const errors = err.issues.map((issue:ZodIssue)=>{
        return {
            path:issue?.path[issue.path.length - 1] ,
            message:issue?.message
        }
    })
    const statusCode = 400

    return{
        statusCode,
        message:"validation error",
        errorMessages:errors
    }
}

export default handleZodError