
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
    minPrice = 1000,
    maxPrice = 100_000,
}

export const getProducts = async (page: number, pageSize: number, categories: string, minPrice: number, maxPrice: number) => {
    const response = await api.get(`/api/products?${ProductFilterKeys.page}=${page}&${ProductFilterKeys.pageSize}=${pageSize}&${ProductFilterKeys.categories}=${categories}&${ProductFilterKeys.minPrice}=${minPrice}&${ProductFilterKeys.maxPrice}=${maxPrice}`);
    return (await response.data) as PagedProducts;
}