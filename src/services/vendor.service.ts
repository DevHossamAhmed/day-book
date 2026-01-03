import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { BankAccount } from "@/types/bank-account";
import { Vendor, VendorIdNameList } from "@/types/vendor";

export async function store(form: any): Promise<Vendor> {
  try {
    const res = await DaybookApi.post("/vendors", form);
    return res.data.data as Vendor;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchVendors(search: string): Promise<ApiResponse<Vendor[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<Vendor[]>>("/vendors/", {
      params: {
        search,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function update(id: number, form: any): Promise<Vendor> {
  try {
    const res = await DaybookApi.put(`/vendors/${id}`, form);
    return res.data.data as Vendor;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchGetIdNameList(): Promise<ApiResponse<VendorIdNameList[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<VendorIdNameList[]>>("/vendors/id-name-list");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function exportVendors(): Promise<Vendor[]> {
  try {
    const res = await DaybookApi.get<ApiResponse<Vendor[]>>("/vendors/", {
      params: {
        search: "",
      },
    });
    return res.data.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}