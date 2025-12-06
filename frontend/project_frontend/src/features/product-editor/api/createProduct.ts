import api from "@/api/axios-instance";
import { CreateProductRequestDto } from "@/dtos/request/product/CreateProductRequestDto";
import { objectToFormData } from "@/utils/objectToFormData";

export async function createProduct(createProductRequest: CreateProductRequestDto) {
  await api.post("/api/admin/products", objectToFormData(createProductRequest), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
