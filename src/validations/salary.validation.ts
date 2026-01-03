import { PaymentMethod } from "@/data/payment-method";
import z from "zod";

export const CreateSalaryValidationSchema = z.object({
  employee_id: z
    .string()
    .min(1, "Employee is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Please select an Employee",
    }),
  salary_amount: z
    .string()
    .min(1, { message: "Salary Amount is required" })
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
      message: "Salary Amount must be a positive number",
    })
    .transform((val) => Number(val)),
  deductions: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return 0;
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    }),
  deduction_reason: z.string().optional().nullable(),
  payment_date: z
    .string()
    .min(1, { message: "Payment Date is required" })
    .transform((value) => {
      const date = new Date(value);
      return date.toISOString().split("T")[0];
    }),
  period: z
    .string()
    .min(1, { message: "Period is required" })
    .transform((value) => {
      const date = new Date(value);
      return date.toISOString().split("T")[0];
    }),
  //@ts-expect-error: Enum validation
  payment_method: z.enum(PaymentMethod, {
    errorMap: () => ({ message: "Payment Method is required" }),
  }),
  //@ts-expect-error: Enum validation
  status: z.enum(["upcoming", "paid"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  note: z.string().optional().nullable(),
});
