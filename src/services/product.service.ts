import UserApi from "@/lib/api/users.api";
import { Product } from "@/types/product";


export async function listProducts(): Promise<Product[]> {
    try {
        const res = await UserApi.get("/v1/products");
        return res.data.data as Product[];
    } catch (error: any) {
        console.error("Error fetching products:", error);
        return [];
    }
}