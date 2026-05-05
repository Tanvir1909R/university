import { RequestHandler } from "express";
import Users from "../users/user.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "../../envConfig";
import { tokenRequest } from "../../interface/common";
import bcrypt from 'bcrypt'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const user = new Users();
    const isExist = await user.isExist(id); // methods create on userSchema.ts
    if (!isExist) {
      throw new apiError(httpStatus.NOT_FOUND, "user dose not exist");
    }

    const isPasswordMatch = await user.isPasswordMatch(
      password,
      isExist?.password
    );
    if (!isPasswordMatch) {
      throw new apiError(httpStatus.UNAUTHORIZED, "password is incorrect");
    }

    const accessToken = jwt.sign(
      {
        id: isExist?.id,
        role: isExist?.role,
      },
      envConfig.jwt.secret as Secret,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: isExist?.id,
        role: isExist?.role,
      },
      envConfig.jwt.refresh_secret as Secret,
      {
        expiresIn: "365d",
      }
    );

    // set refresh token into cookies
    res.cookie("refreshToken", refreshToken, {
      secure: envConfig.env === "production",
      httpOnly: true,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: "login successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    let verifyToken = null;

    try {
      const token = jwt.verify(
        refreshToken,
        envConfig.jwt.refresh_secret as Secret
      );
      if (typeof token !== "string") {
        verifyToken = token;
      } else {
        throw new apiError(httpStatus.NOT_FOUND, "Invalid token");
      }
    } catch (error) {
      throw new apiError(httpStatus.FORBIDDEN, "invalid refresh token");
    }

    const user = new Users();
    const userExist = await user.isExist(verifyToken.id);
    if (!userExist) {
      throw new apiError(httpStatus.NOT_FOUND, "user not found");
    }

    //generate new access token
    const newAccessToken = jwt.sign(
      {
        id: verifyToken?.id,
        role: verifyToken?.role,
      },
      envConfig.jwt.secret as Secret,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      secure: envConfig.env === "production",
      httpOnly: true,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: "login successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword: RequestHandler = async (
  req: tokenRequest,
  res,
  next
) => {
  try {
    const tokenUser = req.user;
    let user = null;
    if (tokenUser && typeof tokenUser !== "string") {
      user = tokenUser;
    }else{
      throw new apiError(httpStatus.INTERNAL_SERVER_ERROR,"Server error")
    }
    const { oldPassword, newPassword } = req.body;
    const users = new Users();
    const isExist = await users.isExist(user.id);
    if(!isExist){
      throw new apiError(httpStatus.NOT_FOUND,"User not found")
    }
    // match password
    const matchPass = await users.isPasswordMatch(oldPassword,isExist.password);
    if(!matchPass){
      throw new apiError(httpStatus.UNAUTHORIZED,"Old password is incorrect")
    }

    //hash pass
    const hashPassword = await bcrypt.hash(newPassword,12);
    //update
    await Users.findOneAndUpdate({id:user.id},{
      password:hashPassword,
      needPasswordChange:false
    })

    res.status(httpStatus.OK).json({
      statusCode:200,
      success:true,
      message:"Password change successfully"
    })
  } catch (error) {
    next(error);
  }
};
