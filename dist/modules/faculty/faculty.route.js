"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const route = express_1.default.Router();
route.get('/', faculty_controller_1.getAllFaculty);
route.get('/:id', faculty_controller_1.findOneFaculty);
route.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.facultyValidationZobSchema), faculty_controller_1.updateFaculty);
exports.default = route;
