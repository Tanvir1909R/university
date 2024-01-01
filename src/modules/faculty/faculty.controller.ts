import { RequestHandler } from "express";
import { Faculty, iFaculty } from "./faculty.schema";
import httpStatus from "http-status";
import apiError from "../../errors/apiError";

export const getAllFaculty:RequestHandler = async(req,res,next) =>{
 try {
    const result = await Faculty.find({}).populate('department').populate('faculty');
    res.status(200).json({
        success: true,
        message: " successfully",
        data: result,
      });
 } catch (error) {
    next(error)
 }
}
export const findOneFaculty:RequestHandler = async(req,res,next) =>{
 try {
    const result = await Faculty.find({_id:req.params.id}).populate('department').populate('faculty');
    res.status(200).json({
        success: true,
        message: "faculty found successfully",
        data: result,
      });
 } catch (error) {
    next(error)
 }
}

export const updateFaculty:RequestHandler = async(req,res,next) =>{
   try {
      const {name,...facultyObj} = req.body;
      const isExist = await Faculty.findOne({ _id: req.params.id });
    if(!isExist){
      throw new apiError(httpStatus.NOT_FOUND,"student not found");
    }
      const updatedFaculty = {...facultyObj}
      
      //dynamic update for name
      if(name && Object.keys(name).length > 0){
         Object.keys(name).map((key)=>{
            const keyName = `name.${key}`;
            updatedFaculty[keyName] = name[key]
         })
      }
      const result = await Faculty.findOneAndUpdate({ _id: req.params.id },updatedFaculty,{new:true});
      
      res.status(200).json({
          success: true,
          message: "faculty update successfully",
          data: result,
        });
   } catch (error) {
      next(error)
   }
  }