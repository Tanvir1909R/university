import { z } from "zod";

export const facultyValidationZobSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    bloodGroup: z
      .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
      .optional(),
    designation: z.string().optional(),
    department: z.string().optional(),
    faculty: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});
