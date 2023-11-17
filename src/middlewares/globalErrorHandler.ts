import { ErrorRequestHandler } from "express";
import envConfig from "../envConfig";
import handleValidationError from "../errors/handleValidationError";
import mongoose from "mongoose";
import apiError from "../errors/apiError";
import config from "../envConfig/index";
import { errorLogger } from "../logger";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";

interface iGenericError {
  path: string | number;
  message: string;
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === "development"
    ? console.log("global-dep-log", err)
    : errorLogger.error(err);

  let statusCode = 500;
  let message = "something went wrong";
  let errorMessages: iGenericError[] = [];

  if (err?.name === "ValidationError") {
    const resError = handleValidationError(
      err as mongoose.Error.ValidationError
    );
    statusCode = resError.statusCode;
    message = resError.message;
    errorMessages = resError.errorMessages;
  }else if(err instanceof ZodError){
    const resError = handleZodError(err)
    statusCode = resError.statusCode;
    message = resError.message;
    errorMessages = resError.errorMessages;
  }else if(err?.name === 'CastError'){
    const resError = handleCastError(err)
    statusCode = resError.statusCode;
    message = resError.message;
    errorMessages = resError.errorMessages;
  }else if (err instanceof apiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: envConfig.env !== "production" ? err.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
