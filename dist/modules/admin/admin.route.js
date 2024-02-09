"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const route = express_1.default.Router();
route.get('/', admin_controller_1.getAllAdmin);
route.get('/:id', admin_controller_1.findOneAdmin);
route.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.adminValidationZobSchema), admin_controller_1.updateAdmin);
exports.default = route;
