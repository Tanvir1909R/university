import { z } from "zod";

export const createFacultyZodSchema = z.object({
    body:z.object({
        title: z.string()
    })
})