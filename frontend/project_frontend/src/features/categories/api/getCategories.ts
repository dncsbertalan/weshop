import api from "@/api/axios-instance";
import { CategoryDto } from "@/dtos/response/category/CategoryDto";

export const getCategories = async () => {
  const response = await api.get("/api/categories");
  return CategoryDto.array().parse(response.data);
};
