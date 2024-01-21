"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const route = express_1.default.Router();
route.post('/create-student', (0, validateRequest_1.default)(user_validation_1.createStudentZodSchema), user_controller_1.createsStudent);
route.post('/create-faculty', (0, validateRequest_1.default)(user_validation_1.createFacultyZodSchema), user_controller_1.createFaculty);
exports.default = route;
