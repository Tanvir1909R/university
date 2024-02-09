"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const route = (0, express_1.Router)();
route.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidationZodSchema), auth_controller_1.loginUser);
exports.default = route;
