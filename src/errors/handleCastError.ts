import mongoose from "mongoose";
import { iErrorResponse } from "../interface/common";

const handleCastError = (err: mongoose.Error.CastError):iErrorResponse => {
  const errors = [
    {
      path: err.path,
      message: "invalid id",
    },
  ];
  return {
    statusCode: 400,
    message: "validationError",
    errorMessages: errors,
  };
};

export default handleCastError;
