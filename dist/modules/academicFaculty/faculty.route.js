"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const route = (0, express_1.Router)();
route.post('/create', (0, validateRequest_1.default)(faculty_validation_1.createFacultyZodSchema), faculty_controller_1.createFaculty);
route.patch('/update/:id', faculty_controller_1.updateFaculty);
route.patch('/delete/:id', faculty_controller_1.deleteFaculty);
route.get('/', faculty_controller_1.findFaculty);
exports.default = route;
