import z from "zod";

export const CreateOrganizationValidationSchema = z.object({
  product_id: z
  .string()
  .transform(val => Number(val))
  .refine(val => !isNaN(val) && val > 0, {
    message: "Please select a product",
  }),
  name: z.string().min(2, "Company name is required"),
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Min 6 characters"),
  agree_terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service",
  }),
});