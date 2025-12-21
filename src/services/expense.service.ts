import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Expense } from "@/types/expense";
import { PaginatedResult } from "@/types/pagination";

export async function store(form: any): Promise<Expense> {
    try {
        const res = await DaybookApi.post("/expenses", form);
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
