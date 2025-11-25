import UserApi from "@/lib/api/users.api";


export async function listProducts() {
    const res = await UserApi.get("/v1/products");
    console.log("List Products Response:", res);
}