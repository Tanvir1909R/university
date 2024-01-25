import { RequestHandler } from "express";
import Users from "../users/user.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import bcrypt from 'bcrypt'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const {id,password} = req.body;
    const isExist = await Users.findOne({id},{id:1,password:1,needPasswordChange:1})
    if(!isExist){
      throw new apiError(httpStatus.NOT_FOUND,'user dose not exist')
    }

    const isPasswordMatch = await bcrypt.compare(password,isExist?.password);
    if(!isPasswordMatch){
      throw new apiError(httpStatus.UNAUTHORIZED,"password is incorrect")
    }
    
  } catch (error) {
    next(error);
  }
};
