import { sources } from "@/data/sources";
import z from "zod";

export const CreateIncomeValidationSchema = z.object({
    date: z.string()
        .min(1, { message: "Date is required" })
        .transform((value) => {
            const date = new Date(value);
            return date.toISOString().split("T")[0];
        }),
    source: z.enum(sources, {
        error: "Source is required",
    }),
    amount: z
        .string()
        .min(1, { message: "Amount is required" })
        .refine((val) => !Number.isNaN(Number(val)), {
            message: "Amount must be a number",
        })
        .transform((val) => Number(val)),
    note: z.string().optional().nullable(),
});