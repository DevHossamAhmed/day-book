import { PaymentMethod } from "@/data/payment-method";
import z from "zod";

export const CreatePlannedPaymentValidationSchema = z.object({
    vendor_id: z
        .string()
        .min(1, "Vendor is required")
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Please select a Vendor",
        }),
    purpose: z
        .string()
        .min(1, { message: "Purpose is required" }),
    amount: z
        .string()
        .min(1, { message: "Amount is required" })
        .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a positive number",
        })
        .transform((val) => Number(val)),
    due_date: z.string()
        .min(1, { message: "Due Date is required" })
        .transform((value) => {
            const date = new Date(value);
            return date.toISOString().split("T")[0];
        }),
    payment_method: z.enum(PaymentMethod, {
        error: "Payment Method is required",
    }),
    status: z.enum(["upcoming", "paid", "overdue"], {
        error: "Status is required",
    }),
    note: z.string().optional().nullable(),
});
