import { RequestHandler } from "express";
import { AcademicSemester } from "./academic.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";


const academicTitleCode:{
    [key:string]:string
} = {
    autumn:"01",
    summer:"02",
    fall:"03"
}

export const createAcademicSemester:RequestHandler = async(req,res,next)=>{
    try {
        const data = req.body
        if(academicTitleCode[data.title] !== data.code){
            throw new apiError(httpStatus.BAD_REQUEST,"Invalid semester code")
        }
        const result = await AcademicSemester.create(data);
        res.status(200).json({
            success:true,
            message:'Academic semester is created successfully',
            data:result
        })
    } catch (error) {
        next(error)
    }
}