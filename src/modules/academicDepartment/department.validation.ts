import { z } from "zod";

export const createDepartmentZodSchema = z.object({
    body:z.object({
        title: z.string(),
        faculty:z.string()
    })
})