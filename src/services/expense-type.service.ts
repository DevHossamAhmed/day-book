/* eslint-disable @typescript-eslint/no-explicit-any */
import DaybookApi from "@/lib/api/daybook.api";
import { ApiResponse } from "@/types/api";
import { ExpenseType, ExpenseTypeIdNameList } from "@/types/expense-type";

export async function store(form: any): Promise<ExpenseType> {
  try {
    const res = await DaybookApi.post("/expense-types", form);
    return res.data.data as ExpenseType;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchExpenseTypes(search: string): Promise<ApiResponse<ExpenseType[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<ExpenseType[]>>("/expense-types/", {
      params: {
        search,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function update(id: number, form: any): Promise<ExpenseType> {
  try {
    const res = await DaybookApi.put(`/expense-types/${id}`, form);
    return res.data.data as ExpenseType;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function destroy(id: number): Promise<void> {
  try {
    await DaybookApi.delete(`/expense-types/${id}`);
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchGetIdNameList(): Promise<ApiResponse<ExpenseTypeIdNameList[]>> {
  try {
    const res = await DaybookApi.get<ApiResponse<ExpenseTypeIdNameList[]>>("/expense-types/id-name-list");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function exportExpenseTypes(): Promise<ExpenseType[]> {
  try {
    // Fetch all expense types by using empty search string
    const res = await DaybookApi.get<ApiResponse<ExpenseType[]>>("/expense-types/export/excel", {
      params: {
        search: "", // Empty search to get all records
      },
    });
    return res.data.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
