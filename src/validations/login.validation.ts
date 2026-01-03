import z from "zod";

export const LoginValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Min 6 characters"),
});
