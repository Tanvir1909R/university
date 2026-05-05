import z from "zod";

export const authValidationZodSchema = z.object({
  body: z.object({
    id:z.string({required_error:"ID is required"}),
    password:z.string({required_error:"Password is required"})
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies:z.object({
    refreshToken:z.string({
      required_error:"refresh token required"
    })
  })
})

export const passwordChangeZodSchema = z.object({
  body:z.object({
    oldPassword:z.string({
      required_error:"Old password required"
    }),
    newPassword:z.string({
      required_error:"New Password is required"
    })
  })
})