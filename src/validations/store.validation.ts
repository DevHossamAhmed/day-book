import z from "zod";

export const CreateStoreValidationSchema = z.object({
  name: z.string().min(2, "Store Name is required (min 2 chars)"),
  sales_person_id: z
    .string()
    .min(1, "Sales Person is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Please select a Sales Person",
    }),
  default_currency: z
    .string()
    .min(1, "Default Currency is required")
    .refine((val) => ["usd", "eur", "sar"].includes(val.toLowerCase()), {
      message: "Please select a valid currency",
    }),
  description: z.string().optional().or(z.literal("")),
});
