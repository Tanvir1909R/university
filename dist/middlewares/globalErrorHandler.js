"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = __importDefault(require("../envConfig"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const index_1 = __importDefault(require("../envConfig/index"));
const logger_1 = require("../logger");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (err, req, res, next) => {
    index_1.default.env === "development"
        ? console.log("global-dep-log", err)
        : logger_1.errorLogger.error(err);
    let statusCode = 500;
    let message = "something went wrong";
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const resError = (0, handleValidationError_1.default)(err);
        statusCode = resError.statusCode;
        message = resError.message;
        errorMessages = resError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        const resError = (0, handleZodError_1.default)(err);
        statusCode = resError.statusCode;
        message = resError.message;
        errorMessages = resError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const resError = (0, handleCastError_1.default)(err);
        statusCode = resError.statusCode;
        message = resError.message;
        errorMessages = resError.errorMessages;
    }
    else if (err instanceof apiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: "",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: "",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: envConfig_1.default.env !== "production" ? err.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
