import UsersApi from "@/lib/api/users.api";
import { ApiResponse } from "@/types/api";
import { Member, MemberIdNameList } from "@/types/member";

export async function store(form: any): Promise<void> {
  try {
    const res = await UsersApi.post("/v1/users", form);
    return res.data.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchMembers(
  search: string
): Promise<ApiResponse<Member[]>> {
  try {
    const res = await UsersApi.get<ApiResponse<Member[]>>("/v1/users", {
      params: {
        search,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function fetchGetIdNameList(): Promise<ApiResponse<MemberIdNameList[]>> {
  try {
    const res = await UsersApi.get<ApiResponse<MemberIdNameList[]>>("/v1/users/id-name-list");
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function exportMembers(): Promise<Member[]> {
  try {
    const res = await UsersApi.get<ApiResponse<Member[]>>("/v1/users", {
      params: {
        search: "",
      },
    });
    return res.data.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}