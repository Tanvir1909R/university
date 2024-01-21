"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicZodSchema = exports.academicZodSchema = void 0;
const zod_1 = require("zod");
exports.academicZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum(["autumn", "summer", "fall"], {
            required_error: "Title is required",
        }),
        year: zod_1.z.string({
            required_error: "Year is required",
        }),
        code: zod_1.z.enum(["01", "02", "03"], {
            required_error: "Code is required",
        }),
        startMonth: zod_1.z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], {
            required_error: "Start month is required",
        }),
        endMonth: zod_1.z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], {
            required_error: "Start month is required",
        }),
    }),
});
exports.updateAcademicZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.enum(["autumn", "summer", "fall"], {
            required_error: "Title is required",
        }).optional(),
        year: zod_1.z.string({
            required_error: "Year is required",
        }).optional(),
        code: zod_1.z.enum(["01", "02", "03"], {
            required_error: "Code is required",
        }).optional(),
        startMonth: zod_1.z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], {
            required_error: "Start month is required",
        }).optional(),
        endMonth: zod_1.z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], {
            required_error: "Start month is required",
        }).optional(),
    }),
})
    .refine((data) => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: "Either title and code should be provided or neither",
});
