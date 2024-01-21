"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("./department.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const department_validation_1 = require("./department.validation");
const route = (0, express_1.Router)();
route.post('/create', (0, validateRequest_1.default)(department_validation_1.createDepartmentZodSchema), department_controller_1.createDepartment);
route.patch(':id', department_controller_1.updateDepartment);
route.delete('/:id', department_controller_1.deleteDepartment);
route.get('/', department_controller_1.findDepartment);
exports.default = route;
