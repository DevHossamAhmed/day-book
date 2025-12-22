import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Income } from "@/types/income";
import { PaginatedResult } from "@/types/pagination";

export async function store(form: any): Promise<Income> {
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
            
            payload = formData;
        } else {
            // Remove attachments if empty and send as JSON
            const { attachments, ...jsonPayload } = form;
            payload = jsonPayload;
        }
        
        const res = await DaybookApi.post("/incomes", payload);
        return res.data.data as Income;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function fetchIncomes(params: Object): Promise<PaginatedResult<Income>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Income>>>("/incomes", { params });
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function exportIncomes(params: {
    date?: string;
    search?: string;
}): Promise<Income[]> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Income>>>("/incomes", {
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

export async function update(id: number, form: any): Promise<Income> {
    try {
        const res = await DaybookApi.put(`/incomes/${id}`, form);
        return res.data.data as Income;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function destroy(id: number): Promise<void> {
    try {
        await DaybookApi.delete(`/incomes/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
}