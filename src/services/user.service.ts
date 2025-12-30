import UsersApi from "@/lib/api/users.api";
import { ApiResponse } from "@/types/api";
import { Member, MemberIdNameList } from "@/types/member";

export interface CreateUserForm {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    designation?: string;
    additional_info?: string;
}

export async function store(form: CreateUserForm): Promise<void> {
  try {
    const res = await UsersApi.post("/v1/users", form);
    return res.data.data;
  } catch (error) {
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
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function changePassword(form: {
  current_password: string;
  password: string;
}): Promise<void> {
  try {
    const res = await UsersApi.put("/v1/users/change-password", form);
    return res.data;
  } catch (error: any) {
    // Extract error message from response
    if (error.response?.data?.message) {
      const errorMessage = error.response.data.message;
      // Handle array of messages or single message
      if (Array.isArray(errorMessage)) {
        throw new Error(errorMessage.join(", "));
      }
      throw new Error(errorMessage);
    }
    // Handle network errors or other issues
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error("Failed to change password. Please try again.");
  }
}

export async function fetchProfile(): Promise<{
  first_name: string;
  last_name: string;
  email: string;
  designation: string;
  additional_info?: string | null;
  avatar?: string | null;
}> {
  try {
    const res = await UsersApi.get("/v1/users/profile");
    return res.data.data || res.data;
  } catch (error: any) {
    // Extract error message from response
    if (error.response?.data?.message) {
      const errorMessage = error.response.data.message;
      // Handle array of messages or single message
      if (Array.isArray(errorMessage)) {
        throw new Error(errorMessage.join(", "));
      }
      throw new Error(errorMessage);
    }
    // Handle network errors or other issues
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch profile. Please try again.");
  }
}

export async function updateProfile(form: {
  first_name: string;
  last_name: string;
  email: string;
  designation: string;
  additional_info?: string | null;
  avatar?: File | null;
}): Promise<void> {
  try {
    // Always use FormData for profile update
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("email", form.email);
    formData.append("designation", form.designation);
    
    if (form.additional_info !== null && form.additional_info !== undefined) {
      formData.append("additional_info", form.additional_info);
    }
    
    // Append avatar only if it's a File
    if (form.avatar instanceof File) {
      formData.append("avatar", form.avatar);
    }

    const res = await UsersApi.put("/v1/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    // Extract error message from response
    if (error.response?.data?.message) {
      const errorMessage = error.response.data.message;
      // Handle array of messages or single message
      if (Array.isArray(errorMessage)) {
        throw new Error(errorMessage.join(", "));
      }
      throw new Error(errorMessage);
    }
    // Handle network errors or other issues
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update profile. Please try again.");
  }
}