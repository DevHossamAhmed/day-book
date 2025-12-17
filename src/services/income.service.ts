import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Income } from "@/types/income";
import { PaginatedResult } from "@/types/pagination";

export async function store(form: any): Promise<Income> {
    try {
        const res = await DaybookApi.post("/incomes", form);
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