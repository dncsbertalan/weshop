import api from "@/api/axios-instance";
import { ProductDto } from "@/dtos/response/product/ProductDto";

export async function getProduct(productId: number) {
  const response = await api.get(`/api/products/${productId}`);
  return ProductDto.parse(response.data);
}
