import { RequestHandler } from "express";
import { AcademicSemester } from "./academic.schema";

export const createAcademicSemester:RequestHandler = async(req,res,next)=>{
    try {
        const result = await AcademicSemester.create(req.body);
        res.status(200).json({
            success:true,
            message:'Academic semester is created successfully',
            data:result
        })
    } catch (error) {
        next(error)
    }
}