import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Expense } from "@/types/expense";
import { PaginatedResult } from "@/types/pagination";

export async function store(form: any): Promise<Expense> {
    try {
        // If form contains File objects (attachments), use FormData
        const hasFiles = form.attachments && Array.isArray(form.attachments) && form.attachments.length > 0;
        
        let payload: any;
        
        if (hasFiles) {
            const formData = new FormData();
            
            // Append all form fields
            Object.keys(form).forEach((key) => {
                if (key !== 'attachments') {
                    const value = form[key];
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
        
        const res = await DaybookApi.post("/expenses", payload);
        return res.data.data as Expense;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function fetchExpenses(params: Object): Promise<PaginatedResult<Expense>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Expense>>>("/expenses", { params });
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function update(id: number, form: any): Promise<Expense> {
    try {
        const res = await DaybookApi.put(`/expenses/${id}`, form);
        return res.data.data as Expense;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function destroy(id: number): Promise<void> {
    try {
        await DaybookApi.delete(`/expenses/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function exportExpenses(params: {
    date?: string;
    search?: string;
}): Promise<Expense[]> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Expense>>>("/expenses", {
            params: {
                ...params,
                limit: 10000, // Get all records
            },
        });
        return res.data.data.items;
    } catch (error: any) {
        return Promise.reject(error);
    }
}
