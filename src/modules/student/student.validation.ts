import z from "zod";

export const studentValidationZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: "firstName is required",
          })
          .optional(),
        middleName: z.string().optional(),
        lastName: z
          .string({
            required_error: "firstName is required",
          })
          .optional(),
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: "date of birth is required",
      })
      .optional(),
    gender: z
      .enum(["male", "female"], {
        required_error: "gender is required",
      })
      .optional(),
    bloodGroup: z
      .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
      .optional(),
    email: z
      .string({
        required_error: "email is required",
      })
      .email()
      .optional(),
    contactNo: z
      .string({
        required_error: "contactNo is required",
      })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: "emergency contact is required",
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: "present address is required",
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: "permanent address is required",
      })
      .optional(),
    guardian: z
      .object({
        fatherName: z
          .string({
            required_error: "father name is required",
          })
          .optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z
          .string({
            required_error: "father contact number is required",
          })
          .optional(),
        motherName: z
          .string({
            required_error: "mother name is required",
          })
          .optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z
          .string({
            required_error: "mother contact number is required",
          })
          .optional(),
        address: z
          .string({
            required_error: "address is required",
          })
          .optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z
          .string({
            required_error: "local guardian name is required",
          })
          .optional(),
        occupation: z.string().optional(),
        contactNo: z
          .string({
            required_error: "local guardian number is required",
          })
          .optional(),
        address: z
          .string({
            required_error: "local guardian address is required",
          })
          .optional(),
      })
      .optional(),
    profileImg: z.string().optional(),
    semester: z.string().optional(),
    department: z.string().optional(),
    faculty: z.string().optional(),
  }),
});
