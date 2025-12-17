import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { PlannedPayment } from "@/types/planned-payment";
import { PaginatedResult } from "@/types/pagination";

export async function store(form: any): Promise<PlannedPayment> {
    try {
        const res = await DaybookApi.post("/planned-payments", form);
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
