import z from "zod";

export const UpdateProfileValidationSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  designation: z
    .string()
    .min(1, "Designation is required")
    .min(2, "Designation must be at least 2 characters"),
  additional_info: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val || null),
});

export type UpdateProfileFormData = z.infer<typeof UpdateProfileValidationSchema>;

