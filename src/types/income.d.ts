import { Media } from "./media";

export interface Income {
    id: number;
    date: string; // ISO date string
    store_id?: number | null;
    source?: string | null; // Store name (for display)
    sales_person_id?: number | null;
    sales_person_fullname?: string | null;
    amount: number;
    payment_method: string;
    note?: string | null;
    added_by_fullname?: string | null;
    media?: Media[] | null; // Array of media objects
    created_at?: string; // ISO date string
    updated_at?: string; // ISO date string
}
