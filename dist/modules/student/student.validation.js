"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.studentValidationZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .object({
            firstName: zod_1.default
                .string({
                required_error: "firstName is required",
            })
                .optional(),
            middleName: zod_1.default.string().optional(),
            lastName: zod_1.default
                .string({
                required_error: "firstName is required",
            })
                .optional(),
        })
            .optional(),
        dateOfBirth: zod_1.default
            .string({
            required_error: "date of birth is required",
        })
            .optional(),
        gender: zod_1.default
            .enum(["male", "female"], {
            required_error: "gender is required",
        })
            .optional(),
        bloodGroup: zod_1.default
            .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
            .optional(),
        email: zod_1.default
            .string({
            required_error: "email is required",
        })
            .email()
            .optional(),
        contactNo: zod_1.default
            .string({
            required_error: "contactNo is required",
        })
            .optional(),
        emergencyContactNo: zod_1.default
            .string({
            required_error: "emergency contact is required",
        })
            .optional(),
        presentAddress: zod_1.default
            .string({
            required_error: "present address is required",
        })
            .optional(),
        permanentAddress: zod_1.default
            .string({
            required_error: "permanent address is required",
        })
            .optional(),
        guardian: zod_1.default
            .object({
            fatherName: zod_1.default
                .string({
                required_error: "father name is required",
            })
                .optional(),
            fatherOccupation: zod_1.default.string().optional(),
            fatherContactNo: zod_1.default
                .string({
                required_error: "father contact number is required",
            })
                .optional(),
            motherName: zod_1.default
                .string({
                required_error: "mother name is required",
            })
                .optional(),
            motherOccupation: zod_1.default.string().optional(),
            motherContactNo: zod_1.default
                .string({
                required_error: "mother contact number is required",
            })
                .optional(),
            address: zod_1.default
                .string({
                required_error: "address is required",
            })
                .optional(),
        })
            .optional(),
        localGuardian: zod_1.default
            .object({
            name: zod_1.default
                .string({
                required_error: "local guardian name is required",
            })
                .optional(),
            occupation: zod_1.default.string().optional(),
            contactNo: zod_1.default
                .string({
                required_error: "local guardian number is required",
            })
                .optional(),
            address: zod_1.default
                .string({
                required_error: "local guardian address is required",
            })
                .optional(),
        })
            .optional(),
        profileImg: zod_1.default.string().optional(),
        semester: zod_1.default.string().optional(),
        department: zod_1.default.string().optional(),
        faculty: zod_1.default.string().optional(),
    }),
});
