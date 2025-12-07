import DaybookApi from "@/lib/api/daybook.api";
import { Balance } from "@/types/balance";


export async function store(form: any): Promise<Balance> {
    try {
        const res = await DaybookApi.post("/balances", form);
        return res.data.data as Balance;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function fetchBalances(params: Object): Promise<Balance[]> {
    try {
        const res = await DaybookApi.get("/balances", { params });
        return res.data.data as Balance[];
    } catch (error: any) {
        return Promise.reject(error);
    }
}