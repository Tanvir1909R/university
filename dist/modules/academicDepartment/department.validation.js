"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepartmentZodSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        faculty: zod_1.z.string()
    })
});
