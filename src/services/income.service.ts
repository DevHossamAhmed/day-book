import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Income } from "@/types/income";
import { PaginatedResult } from "@/types/pagination";

export interface CreateIncomeForm {
    date: string;
    store_id?: number | null;
    sales_person_id?: number | null;
    amount: string;
    payment_method: string;
    note?: string | null;
    attachments: File[];
}

export interface UpdateIncomeForm {
    date?: string;
    store_id?: number | null;
    sales_person_id?: number | null;
    amount?: string;
    payment_method?: string;
    note?: string | null;
}

export interface IncomeQueryParams {
    date?: string;
    search?: string;
    from_date?: string;
    to_date?: string;
    store_id?: string;
    sales_person_id?: string;
    payment_method?: string;
    amount_min?: string;
    amount_max?: string;
    page?: number;
    limit?: number;
}

export async function store(form: CreateIncomeForm): Promise<Income> {
    try {
        const formData = new FormData();

        // Append all form fields
        Object.keys(form).forEach((key) => {
            if (key !== 'attachments') {
                const value = form[key];
                // Convert values to string for FormData
                if (value !== null && value !== undefined) {
                    formData.append(key, String(value));
                }
            }
        });

        // Append attachments
        form.attachments.forEach((file: File, index: number) => {
            formData.append(`attachments[${index}]`, file);
        });


        const res = await DaybookApi.post<ApiResponse<Income>>("/incomes", formData);
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function fetchIncomes(params: IncomeQueryParams): Promise<PaginatedResult<Income>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Income>>>("/incomes", { params });
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function exportIncomes(params: Omit<IncomeQueryParams, 'page' | 'limit'>): Promise<Income[]> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Income>>>("/incomes", {
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

export async function update(id: number, form: UpdateIncomeForm): Promise<Income> {
    try {
        const res = await DaybookApi.put<ApiResponse<Income>>(`/incomes/${id}`, form);
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function destroy(id: number): Promise<void> {
    try {
        await DaybookApi.delete(`/incomes/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
}