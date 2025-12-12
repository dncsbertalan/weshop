import api from "@/api/axios-instance";
import { ProductFilter } from "@/dtos/request/product/ProductFilter";
import { PagedProduct } from "@/dtos/response/product/PagedProduct";

export async function getProducts(productFilters: ProductFilter) {
  const response = await api.get("/api/products", { params: productFilters });
  return PagedProduct.parse(response.data);
}
