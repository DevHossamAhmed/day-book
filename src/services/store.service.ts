import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { Store, StoreIdNameList } from "@/types/store";

export async function store(form: any): Promise<Store> {
  try {
    const res = await DaybookApi.post("/stores", form);
    return res.data.data as Store;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchStores(search?: string): Promise<ApiResponse<Store[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<Store[]>>("/stores", {
      params: {
        search,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchStoreIdNameList(): Promise<ApiResponse<StoreIdNameList[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<StoreIdNameList[]>>("/stores/id-name-list");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function update(id: number, form: any): Promise<Store> {
  try {
    const res = await DaybookApi.put(`/stores/${id}`, form);
    return res.data.data as Store;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
