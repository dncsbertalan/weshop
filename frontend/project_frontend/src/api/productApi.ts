import { Product } from "@/models/Product";
import { productApi_getProducts } from "./apiConstants";
import api from "./axiosInstance"

export const getProducts = async () => {
    const response = await api.get(productApi_getProducts);
    return (await response.data) as Product[];
}