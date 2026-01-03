/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Balance } from "@/types/balance";
import { PaginatedResult } from "@/types/pagination";


export async function store(form: any): Promise<Balance> {
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
        
        const res = await DaybookApi.post("/balances", payload);
        return res.data.data as Balance;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

//@
export async function fetchBalances(params: Object): Promise<PaginatedResult<Balance>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Balance>>>("/balances", { params });
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function exportBalances(params: {
    date?: string;
}): Promise<Balance[]> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Balance>>>("/balances", {
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