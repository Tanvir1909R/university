"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academic_valication_1 = require("./academic.valication");
const academic_controller_1 = require("./academic.controller");
const route = express_1.default.Router();
route.post('/create', (0, validateRequest_1.default)(academic_valication_1.academicZodSchema), academic_controller_1.createAcademicSemester);
route.get('/:id', academic_controller_1.getSingleSemester);
route.patch('/:id', (0, validateRequest_1.default)(academic_valication_1.updateAcademicZodSchema), academic_controller_1.updateAcademicSemester);
route.delete('/:id', academic_controller_1.deleteAcademicSemester);
route.get('/', academic_controller_1.getAcademicSemester);
exports.default = route;
