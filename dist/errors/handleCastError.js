"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
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
exports.default = handleCastError;
