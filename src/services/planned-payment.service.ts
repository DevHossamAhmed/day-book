import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { PlannedPayment } from "@/types/planned-payment";
import { PaginatedResult } from "@/types/pagination";

export async function store(form: any): Promise<PlannedPayment> {
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
        
        const res = await DaybookApi.post("/planned-payments", payload);
        return res.data.data as PlannedPayment;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function fetchPlannedPayments(params: Object): Promise<PaginatedResult<PlannedPayment>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<PlannedPayment>>>("/planned-payments", { params });
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function update(id: number, form: any): Promise<PlannedPayment> {
    try {
        const res = await DaybookApi.put(`/planned-payments/${id}`, form);
        return res.data.data as PlannedPayment;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function destroy(id: number): Promise<void> {
    try {
        await DaybookApi.delete(`/planned-payments/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function exportPlannedPayments(params: {
    date?: string;
    search?: string;
}): Promise<PlannedPayment[]> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<PlannedPayment>>>("/planned-payments", {
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




