import z from "zod";

export const CreateVendorValidationSchema = z.object({
  name: z.string().min(2, "Vendor Name is required (min 2 chars)"),
  contact_person: z.string().optional().or(z.literal("")),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^[0-9+\-()\s]{7,20}$/.test(v),
      "Phone number is invalid"
    ),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  address: z.string().optional().or(z.literal("")),
  note: z.string().optional().or(z.literal("")),
});
