import { Vendor } from "./vendor";
import { ExpenseType } from "./expense-type";
import { Media } from "./media";

export interface Expense {
    id: number;
    date: string; // ISO date string
    vendor_id?: number | null;
    vendor?: Vendor | null;
    expense_type_id?: number | null;
    expense_type?: ExpenseType | null;
    amount: string; // Amount as string
    payment_method: string;
    note?: string | null;
    added_by_fullname?: string | null;
    media?: Media[] | null;
    created_at?: string; // ISO date string
    updated_at?: string; // ISO date string
}
