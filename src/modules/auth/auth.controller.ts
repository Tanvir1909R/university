import { RequestHandler } from "express";
import Users from "../users/user.schema";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "../../envConfig";

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
        throw new Error("Invalid token"); 
      }
    } catch (error) {
      throw new apiError(httpStatus.FORBIDDEN, "invalid refresh token");
    }

    const user = new Users();
    const userExist = await user.isExist(verifyToken.id);
    if(!userExist){
      throw new apiError(httpStatus.NOT_FOUND,'user not found')
    }

    //generate new access token
    const newAccessToken = jwt.sign({
      id:verifyToken?.id,role:verifyToken?.role}
      ,envConfig.jwt.secret as Secret,{
      expiresIn:'1d'
    })

    res.cookie("refreshToken", refreshToken, {
      secure: envConfig.env === "production",
      httpOnly: true,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: "login successfully",
      accessToken:newAccessToken
    });
  } catch (error) {
    next(error);
  }
};
