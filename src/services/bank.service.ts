import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { BankAccount } from "@/types/bank-account";

export async function store(form: any): Promise<BankAccount> {
  try {
    const res = await DaybookApi.post("/banks", form);
    return res.data.data as BankAccount;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchBanks(
): Promise<ApiResponse<BankAccount[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<BankAccount[]>>("/banks");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
