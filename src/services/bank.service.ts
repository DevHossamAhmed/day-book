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

export async function fetchBanks(search?: string): Promise<ApiResponse<BankAccount[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<BankAccount[]>>("/banks", {
      params: {
        search,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function update(id: number, form: any): Promise<BankAccount> {
  try {
    const res = await DaybookApi.put(`/banks/${id}`, form);
    return res.data.data as BankAccount;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
