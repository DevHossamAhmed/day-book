import { Media } from "./media";
import { Vendor } from "./vendor";

export interface PlannedPayment {
    id: number;
    vendor_id?: number | null;
    vendor_name?: string | null;
    vendor?: Vendor | null;
    purpose?: string | null;
    amount: number;
    due_date: string; // ISO date string
    payment_method: string;
    status: "upcoming" | "paid" | "overdue";
    note?: string | null;
    added_by_fullname?: string | null;
    media?: Media[] | null;
    created_at?: string; // ISO date string
    updated_at?: string; // ISO date string
}









