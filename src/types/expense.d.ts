export interface Expense {
    id: number;
    date: string; // ISO date string
    vendor_id?: number | null;
    vendor_name?: string | null; // Vendor name (for display)
    expense_type?: string | null;
    amount: number;
    payment_method: string;
    note?: string | null;
    added_by_fullname?: string | null;
    created_at?: string; // ISO date string
    updated_at?: string; // ISO date string
}
