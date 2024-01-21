"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const route = express_1.default.Router();
route.get('/', student_controller_1.getStudent);
route.patch('/:id', (0, validateRequest_1.default)(student_validation_1.studentValidationZodSchema), student_controller_1.updateStudent);
route.get('/:id', student_controller_1.getSingleStudent);
route.delete('/:id', student_controller_1.deleteStudent);
exports.default = route;
