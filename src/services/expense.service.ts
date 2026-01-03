import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Expense } from "@/types/expense";
import { PaginatedResult } from "@/types/pagination";

export interface CreateExpenseForm {
    date: string;
    vendor_id?: number | null;
    expense_type_id?: number | null;
    amount: string;
    payment_method: string;
    note?: string | null;
    attachments?: File[];
}

export interface UpdateExpenseForm {
    date?: string;
    vendor_id?: number | null;
    expense_type_id?: number | null;
    amount?: string;
    payment_method?: string;
    note?: string | null;
}

export interface ExpenseQueryParams {
    date?: string;
    search?: string;
    from_date?: string;
    to_date?: string;
    vendor_id?: string;
    expense_type_id?: string;
    payment_method?: string;
    amount_min?: string;
    amount_max?: string;
    page?: number;
    limit?: number;
}

export async function store(form: CreateExpenseForm): Promise<Expense> {
    try {
        // If form contains File objects (attachments), use FormData
        const hasFiles = form.attachments && Array.isArray(form.attachments) && form.attachments.length > 0;
        
        let payload: FormData | Omit<CreateExpenseForm, 'attachments'>;
        
        if (hasFiles) {
            const formData = new FormData();
            
            // Append all form fields
            Object.keys(form).forEach((key) => {
                if (key !== 'attachments') {
                    const value = form[key as keyof CreateExpenseForm];
                    if (value !== null && value !== undefined) {
                        formData.append(key, String(value));
                    }
                }
            });
            
            // Append attachments
            form.attachments.forEach((file: File, index: number) => {
                formData.append(`attachments[${index}]`, file);
            });
            
            payload = formData;
        } else {
            // Remove attachments if empty and send as JSON
            const { attachments, ...jsonPayload } = form;
            payload = jsonPayload;
        }
        
        const res = await DaybookApi.post<ApiResponse<Expense>>("/expenses", payload);
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function fetchExpenses(params: ExpenseQueryParams): Promise<PaginatedResult<Expense>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Expense>>>("/expenses", { params });
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function update(id: number, form: UpdateExpenseForm): Promise<Expense> {
    try {
        const res = await DaybookApi.put<ApiResponse<Expense>>(`/expenses/${id}`, form);
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function destroy(id: number): Promise<void> {
    try {
        await DaybookApi.delete(`/expenses/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function exportExpenses(params: Omit<ExpenseQueryParams, 'page' | 'limit'>): Promise<Expense[]> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Expense>>>("/expenses", {
            params: {
                ...params,
                limit: 10000, // Get all records
            },
        });
        return res.data.data.items;
    } catch (error) {
        return Promise.reject(error);
    }
}
