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
  pageSize = 36,
  minPrice = 1000,
  maxPrice = 100_000,
}
