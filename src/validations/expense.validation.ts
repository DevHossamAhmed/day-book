import { PaymentMethod } from "@/data/payment-method";
import z from "zod";

export const CreateExpenseValidationSchema = z.object({
    date: z.string()
        .min(1, { message: "Date is required" })
        .transform((value) => {
            const date = new Date(value);
            return date.toISOString().split("T")[0];
        }),
    vendor_id: z
        .string()
        .min(1, "Vendor is required")
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Please select a Vendor",
        }),
    expense_type_id: z
        .string()
        .min(1, "Expense Type is required")
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Please select an Expense Type",
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
