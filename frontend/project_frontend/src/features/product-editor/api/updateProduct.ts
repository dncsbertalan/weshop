import api from "@/api/axios-instance";
import { UpdateProductRequestDto } from "@/dtos/request/product/UpdateProductRequestDto";
import { objectToFormData } from "@/utils/objectToFormData";

export async function updateProduct(productId: number, updateProductRequest: UpdateProductRequestDto) {
  await api.put(`/api/admin/products/${productId}`, objectToFormData(updateProductRequest), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
