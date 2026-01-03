import z from "zod";

export const UpdateCompanyValidationSchema = z.object({
  name: z.string().min(2, "Company Name is required (min 2 chars)"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  address: z.string().optional().or(z.literal("")),
  cr_number: z.string().optional().or(z.literal("")),
  tax_configuration: z.string().optional().or(z.literal("")),
  default_currency: z
    .string()
    .optional()
    .refine(
      (val) => !val || ["usd", "eur", "sar"].includes(val.toLowerCase()),
      {
        message: "Please select a valid currency",
      }
    ),
  financial_year_period: z.string().optional().or(z.literal("")),
  timezone: z.string().optional().or(z.literal("")),
});
