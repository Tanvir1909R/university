"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFacultyZodSchema = exports.createStudentZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createStudentZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        student: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string({
                    required_error: "firstName is required",
                }),
                middleName: zod_1.default.string().optional(),
                lastName: zod_1.default.string({
                    required_error: "firstName is required",
                }),
            }),
            dateOfBirth: zod_1.default.string({
                required_error: "date of birth is required",
            }),
            gender: zod_1.default.enum(["male", "female"], {
                required_error: "gender is required",
            }),
            bloodGroup: zod_1.default
                .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
                .optional(),
            email: zod_1.default
                .string({
                required_error: "email is required",
            })
                .email(),
            contactNo: zod_1.default.string({
                required_error: "contactNo is required",
            }),
            emergencyContactNo: zod_1.default.string({
                required_error: "emergency contact is required",
            }),
            presentAddress: zod_1.default.string({
                required_error: "present address is required",
            }),
            permanentAddress: zod_1.default.string({
                required_error: "permanent address is required",
            }),
            guardian: zod_1.default.object({
                fatherName: zod_1.default.string({
                    required_error: "father name is required",
                }),
                fatherOccupation: zod_1.default.string().optional(),
                fatherContactNo: zod_1.default.string({
                    required_error: "father contact number is required",
                }),
                motherName: zod_1.default.string({
                    required_error: "mother name is required",
                }),
                motherOccupation: zod_1.default.string().optional(),
                motherContactNo: zod_1.default.string({
                    required_error: "mother contact number is required",
                }),
                address: zod_1.default.string({
                    required_error: "address is required",
                }),
            }),
            localGuardian: zod_1.default.object({
                name: zod_1.default.string({
                    required_error: "local guardian name is required",
                }),
                occupation: zod_1.default.string().optional(),
                contactNo: zod_1.default.string({
                    required_error: "local guardian number is required",
                }),
                address: zod_1.default.string({
                    required_error: "local guardian address is required",
                }),
            }),
            profileImg: zod_1.default.string().optional(),
            semester: zod_1.default.string(),
            department: zod_1.default.string(),
            faculty: zod_1.default.string(),
        }),
    }),
});
exports.createFacultyZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string(),
        faculty: zod_1.default.object({
            name: zod_1.default.object({
                firstName: zod_1.default.string(),
                lastName: zod_1.default.string(),
            }),
            dateOfBirth: zod_1.default.string(),
            email: zod_1.default.string().email(),
            contactNo: zod_1.default.string(),
            emergencyContactNo: zod_1.default.string(),
            gender: zod_1.default.enum(["male", "female"]),
            permanentAddress: zod_1.default.string(),
            presentAddress: zod_1.default.string(),
            bloodGroup: zod_1.default
                .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
                .optional(),
            designation: zod_1.default.string(),
            department: zod_1.default.string(),
            faculty: zod_1.default.string(),
            profileImage: zod_1.default.string().optional(),
        }),
    }),
});
