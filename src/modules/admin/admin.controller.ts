import { RequestHandler } from "express";
import { Admin } from "./admin.schema";
import httpStatus from "http-status";
import apiError from "../../errors/apiError";

export const getAllAdmin:RequestHandler = async(req,res,next) =>{
 try {
    const result = await Admin.find({}).populate('managingDepartment');
    res.status(200).json({
        success: true,
        message: " successfully",
        data: result,
      });
 } catch (error) {
    next(error)
 }
}
export const findOneAdmin:RequestHandler = async(req,res,next) =>{
 try {
    const result = await Admin.find({_id:req.params.id}).populate('managingDepartment');
    res.status(200).json({
        success: true,
        message: "admin found successfully",
        data: result,
      });
 } catch (error) {
    next(error)
 }
}

export const updateAdmin:RequestHandler = async(req,res,next) =>{
   try {
      const {name,...adminObj} = req.body;
      const isExist = await Admin.findOne({ _id: req.params.id });
    if(!isExist){
      throw new apiError(httpStatus.NOT_FOUND,"admin not found");
    }
      const updatedAdmin = {...adminObj}
      
      //dynamic update for name
      if(name && Object.keys(name).length > 0){
         Object.keys(name).map((key)=>{
            const keyName = `name.${key}`;
            updatedAdmin[keyName] = name[key]
         })
      }
      const result = await Admin.findOneAndUpdate({ _id: req.params.id },updatedAdmin,{new:true});
      
      res.status(200).json({
          success: true,
          message: "admin update successfully",
          data: result,
        });
   } catch (error) {
      next(error)
   }
  }