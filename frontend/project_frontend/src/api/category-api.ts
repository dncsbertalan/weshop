import { Category } from "@/models/category";
import api from "./axios-instance";

export const getCategories = async () => {
    const response = await api.get("/api/categories");
    return (await response.data) as Category[];
}