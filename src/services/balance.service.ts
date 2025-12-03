import DaybookApi from "@/lib/api/daybook.api";
import { Balance } from "@/types/balance";


export async function store(form: any): Promise<Balance> {
    try {
        const res = await DaybookApi.post("/balances", form);
        return res.data.data as Balance;
    } catch (error: any) {
        console.error("Error store balance:", error);
        return Promise.reject(error);
    }
}