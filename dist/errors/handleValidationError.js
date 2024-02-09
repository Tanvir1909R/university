"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(obj => {
        return {
            path: obj === null || obj === void 0 ? void 0 : obj.path,
            message: obj === null || obj === void 0 ? void 0 : obj.message
        };
    });
    return {
        statusCode: 400,
        message: "validationError",
        errorMessages: errors
    };
};
exports.default = handleValidationError;
