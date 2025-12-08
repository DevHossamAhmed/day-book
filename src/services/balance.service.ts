import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Balance } from "@/types/balance";
import { PaginatedResult } from "@/types/pagination";


export async function store(form: any): Promise<Balance> {
    try {
        const res = await DaybookApi.post("/balances", form);
        return res.data.data as Balance;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function fetchBalances(params: Object): Promise<PaginatedResult<Balance>> {
    try {
        const res = await DaybookApi.get<ApiResponse<PaginatedResult<Balance>>>("/balances", { params });
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}