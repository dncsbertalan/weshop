import { ProductFilter } from "@/features/products/ProductFilter";
import { PagedProducts, Product } from "@/models/Product";

import api from "./axios-instance";

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

export async function getProducts(productFilters: ProductFilter) {
  const response = await api.get("/api/products", { params: productFilters });
  return (await response.data) as PagedProducts;
}

export async function getProduct(productId: number) {
  const response = await api.get(`/api/products/${productId}`);
  return (await response.data) as Product;
}
