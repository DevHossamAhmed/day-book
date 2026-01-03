import z from "zod";

export const ChangePasswordValidationSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "Current password is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .refine((data) => data.current_password !== data.password, {
    message: "New password must be different from current password",
    path: ["password"],
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordValidationSchema>;

