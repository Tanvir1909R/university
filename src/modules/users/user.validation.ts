import z from "zod";

export const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "firstName is required",
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: "firstName is required",
        }),
      }),
      dateOfBirth: z.string({
        required_error: "date of birth is required",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "gender is required",
      }),
      bloodGroup: z
        .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
        .optional(),
      email: z
        .string({
          required_error: "email is required",
        })
        .email(),
      contactNo: z.string({
        required_error: "contactNo is required",
      }),
      emergencyContactNo: z.string({
        required_error: "emergency contact is required",
      }),
      presentAddress: z.string({
        required_error: "present address is required",
      }),
      permanentAddress: z.string({
        required_error: "permanent address is required",
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: "father name is required",
        }),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string({
          required_error: "father contact number is required",
        }),
        motherName: z.string({
          required_error: "mother name is required",
        }),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string({
          required_error: "mother contact number is required",
        }),
        address: z.string({
          required_error: "address is required",
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: "local guardian name is required",
        }),
        occupation: z.string().optional(),
        contactNo: z.string({
          required_error: "local guardian number is required",
        }),
        address: z.string({
          required_error: "local guardian address is required",
        }),
      }),
      profileImg: z.string().optional(),
      semester: z.string(),
      department: z.string(),
      faculty: z.string(),
    }),
  }),
});

export const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      gender: z.enum(["male", "female"]),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      bloodGroup: z
        .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
        .optional(),
      designation: z.string(),
      department: z.string(),
      faculty: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});
export const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      gender: z.enum(["male", "female"]),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      bloodGroup: z
        .enum(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"])
        .optional(),
      designation: z.string(),
      managingDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});
