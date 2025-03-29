
import api from "./axios-instance"
import { PagedProducts } from "@/models/PagedProducts";

export enum ProductFilterKeys {
    page = "page",
    pageSize = "pageSize",
    categories = "filters",
    minPrice = "min",
    maxPrice = "max",
}

export enum ProductQueryDefaults {
    page = 1,
    pageSize = 30,
}

export const getProducts = async (page: number, pageSize: number, categories: string) => {
    const response = await api.get(`/api/products?${ProductFilterKeys.page}=${page}&${ProductFilterKeys.pageSize}=${pageSize}&${ProductFilterKeys.categories}=${categories}`);
    return (await response.data) as PagedProducts;
}