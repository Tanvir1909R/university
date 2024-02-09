import { RequestHandler } from "express";
import Users from "../users/user.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import  jwt, { Secret }  from "jsonwebtoken";
import envConfig from "../../envConfig";

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const {id,password} = req.body;
    const user = new Users()
    const isExist = await user.isExist(id); // methods create on userSchema.ts
    if(!isExist){
      throw new apiError(httpStatus.NOT_FOUND,'user dose not exist')
    }

    const isPasswordMatch = await user.isPasswordMatch(password,isExist?.password)
    if(!isPasswordMatch){
      throw new apiError(httpStatus.UNAUTHORIZED,"password is incorrect")
    }

    const accessToken = jwt.sign({
      id:isExist?.id,
      role:isExist?.role
    },envConfig.jwt.secret as Secret,{
      expiresIn:"1d"
    })
    const refreshToken = jwt.sign({
      id:isExist?.id,
      role:isExist?.role
    },envConfig.jwt.refresh_secret as Secret,{
      expiresIn:"365d"
    })

    res.status(httpStatus.OK).json({
      success: true,
      message: "login successfully",
      data: {
        accessToken,
        refreshToken
      },
    });
    
    
  } catch (error) {
    next(error);
  }
};
