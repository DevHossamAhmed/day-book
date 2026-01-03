/* eslint-disable @typescript-eslint/no-explicit-any */
import UsersApi from "@/lib/api/users.api";
import { ApiResponse } from "@/types/api";
import { Organization } from "@/types/organization";



export async function Store(form:any): Promise<void> {
    try {
        const res = await UsersApi.post("/v1/organizations", form);
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export async function fetchOrganization(): Promise<ApiResponse<Organization>> {
  try {
    const res = await UsersApi.get<ApiResponse<Organization>>("/v1/organizations");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function updateCompany(form: FormData | any): Promise<any> {
  try {
    const config = form instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {};
    const res = await UsersApi.put("/v1/organizations", form, config);
    return res.data.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}