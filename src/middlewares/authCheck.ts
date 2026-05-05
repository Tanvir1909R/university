import { Request,NextFunction, Response } from "express";
import apiError from "../errors/apiError";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "../envConfig";
import { tokenRequest } from "../interface/common";

const authCheck =
  (...userRole: string[]) =>
  async (req: tokenRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      //check token
      if (!token) {
        throw new apiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      //verify token
      let verifyUser = null;

      const verifyToken = jwt.verify(
        token,
        envConfig.jwt.secret as Secret
      );
      if (typeof verifyToken !== "string") {
        verifyUser = verifyToken;
      } else {
        throw new apiError(httpStatus.NOT_FOUND, "Invalid token");
      }

      if(userRole.length && !userRole.includes(verifyUser.role)){
        throw new apiError(httpStatus.FORBIDDEN,"")
      }

      req.user = verifyUser;

      next()
    } catch (error) {
      next(error);
    }
  };

export default authCheck;
