
import api from "./axiosInstance"
import { PagedProducts } from "@/models/PagedProducts";

export const getProducts = async (page: number, pageSize: number) => {
    const response = await api.get(`/api/products?page=${page}&pageSize=${pageSize}`);
    return (await response.data) as PagedProducts;
}