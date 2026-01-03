import z from "zod";

export const CreateExpenseTypeValidationSchema = z.object({
  name: z.string().min(1, "Expense Type name is required"),
});
