import z from "zod";

export const CreateMemberValidationSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  joining_date: z
    .string()
    .min(1, { message: "Joining date is required" })
    .transform((value) => {
      const date = new Date(value);
      return date.toISOString().split("T")[0];
    }),
  salary_amount: z
    .string()
    .min(1, { message: "Salary_amount is required" })
    .refine((val) => !Number.isNaN(Number(val)), {
      message: "Salary amount must be a number",
    })
    .transform((val) => Number(val)),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Min 6 characters"),
  designation: z.string().optional().nullable(),
  additional_info: z.string().optional().nullable(),
});
