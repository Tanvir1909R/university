"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidationZobSchema = void 0;
const zod_1 = require("zod");
exports.adminValidationZobSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        gender: zod_1.z.enum(["male", "female"]).optional(),
        permanentAddress: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        bloodGroup: zod_1.z
            .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
            .optional(),
        designation: zod_1.z.string().optional(),
        managingDepartment: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
