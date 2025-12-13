import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { BankAccount } from "@/types/bank-account";
import { Vendor } from "@/types/vendor";

export async function store(form: any): Promise<Vendor> {
  try {
    const res = await DaybookApi.post("/vendors", form);
    return res.data.data as Vendor;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchVendors(): Promise<ApiResponse<Vendor[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<Vendor[]>>("/vendors");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
