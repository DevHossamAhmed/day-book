import z from "zod";

export const CreateBankAccountValidationSchema = z.object({
  name: z.string().min(1, "Bank name is required"),
  account_number: z.string().min(1, "Account number is required"),
  iban: z
    .string()
    .optional()
    .refine((v) => {
      if (!v) return true;
      const cleaned = v.replace(/\s+/g, "").toUpperCase();
      if (cleaned.length < 15 || cleaned.length > 34) return false;
      return /^[A-Z]{2}[0-9A-Z]{13,32}$/.test(cleaned);
    }, "Invalid IBAN format"),
  note: z.string().optional().nullable(),
});
