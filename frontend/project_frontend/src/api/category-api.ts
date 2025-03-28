import { Category } from "@/models/Category";
import api from "./axios-instance";

export const getCategories = async () => {
    const response = await api.get("/api/categories");
    return (await response.data) as Category[];
}