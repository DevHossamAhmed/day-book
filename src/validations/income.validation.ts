import { PaymentMethod } from "@/data/payment-method";
import z from "zod";

export const CreateIncomeValidationSchema = z.object({
    date: z.string()
        .min(1, { message: "Date is required" })
        .transform((value) => {
            const date = new Date(value);
            return date.toISOString().split("T")[0];
        }),
    store_id: z
        .string()
        .min(1, "Store is required")
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Please select a Store",
        }),
    sales_person_id: z
        .string()
        .min(1, "Sales Person is required")
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Please select a Sales Person",
        }),
    amount: z
        .string()
        .min(1, { message: "Amount is required" })
        .refine((val) => !Number.isNaN(Number(val)), {
            message: "Amount must be a number",
        })
        .transform((val) => Number(val)),
    payment_method: z.enum(PaymentMethod, {
        error: "Payment Method is required",
    }),
    note: z.string().optional().nullable(),
});