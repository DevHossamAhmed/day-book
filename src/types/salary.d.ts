import { Media } from "./media";
import { Member } from "./member";

export interface Salary {
    id: number;
    employee_id?: number | null;
    employee?: Member | null;
    salary_amount: number;
    deductions?: number | null;
    deduction_reason?: string | null;
    payment_date: string; // ISO date string
    period: string; // ISO date string or period string
    payment_method: string;
    status: "upcoming" | "paid" | "overdue";
    note?: string | null;
    added_by_fullname?: string | null;
    media?: Media[] | null;
    created_at?: string; // ISO date string
    updated_at?: string; // ISO date string
}

