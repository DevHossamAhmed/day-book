import UsersApi from "@/lib/api/users.api";

export async function store(form: any): Promise<void> {
    try {
        // Simulate API call to register organization
        const res = await UsersApi.post("/v1/users", form);
        return res.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}