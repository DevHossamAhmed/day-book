import z from "zod";

export const CreateVendorValidationSchema = z.object({
  name: z.string().min(2, "Vendor Name is required (min 2 chars)"),
  contact_person: z.string().min(1, "Contact person is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine(
      (v) => /^[0-9+\-()\s]{7,20}$/.test(v),
      "Phone number is invalid"
    ),
  email: z.string().min(1, "Email is required").email({ message: "Email is invalid" }),
  address: z.string().optional().or(z.literal("")),
  note: z.string().optional().or(z.literal("")),
});
