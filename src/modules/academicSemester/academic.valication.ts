import { z } from "zod";

export const academicZodSchema = z.object({
  body: z.object({
    title: z.enum(["autumn", "summer", "fall"], {
      required_error: "Title is required",
    }),
    year: z.number({
      required_error: "Year is required",
    }),
    code: z.enum(["01", "02", "03"], {
      required_error: "Code is required",
    }),
    startMonth: z.enum(
      [
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
      ],
      {
        required_error: "Start month is required",
      }
    ),
    endMonth: z.enum(
      [
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
      ],
      {
        required_error: "Start month is required",
      }
    ),
  }),
});

export const updateAcademicZodSchema = z
  .object({
    body: z.object({
      title: z.enum(["autumn", "summer", "fall"], {
        required_error: "Title is required",
      }).optional(),
      year: z.number({
        required_error: "Year is required",
      }).optional(),
      code: z.enum(["01", "02", "03"], {
        required_error: "Code is required",
      }).optional(),
      startMonth: z.enum(
        [
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
        ],
        {
          required_error: "Start month is required",
        }
      ).optional(),
      endMonth: z.enum(
        [
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
        ],
        {
          required_error: "Start month is required",
        }
      ).optional(),
    }),
  })
  .refine(
    (data) =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: "Either title and code should be provided or neither",
    }
  );
