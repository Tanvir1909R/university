import { Request } from "express"
import { USER_ROLE } from "../enums/user"
import { JwtPayload } from "jsonwebtoken"

export interface iErrorResponse{
    statusCode:number,
    message:string,
    errorMessages:{
        path:string,
        message:string
    }[]
}

export interface iPagination{
    page?:number,
    limit?:number,
    sortBy?:string,
    sortOrder?:"asc" | "desc"
}

export interface tokenRequest extends Request{
    user?:JwtPayload | string
}