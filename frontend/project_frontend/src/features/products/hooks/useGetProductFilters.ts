import { useEffect, useState } from "react";
import { ProductFilter, ProductFilterDefaults } from "../ProductFilter";
import { useSearchParams } from "react-router";
import { ProductFilterKeys } from "../ProductFilterKeys";

export function useGetProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilter>({
    page: Number(searchParams.get(ProductFilterKeys.page)) || ProductFilterDefaults.page,
    pageSize: Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductFilterDefaults.pageSize,
    min: Number(searchParams.get(ProductFilterKeys.minPrice)) || undefined,
    max: Number(searchParams.get(ProductFilterKeys.maxPrice)) || undefined,
    filters: searchParams.get(ProductFilterKeys.categories),
    productName: searchParams.get(ProductFilterKeys.productName) || "",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    params.set(ProductFilterKeys.page, filters.page.toString());
    params.set(ProductFilterKeys.pageSize, filters.pageSize.toString());

    if (filters.min) {
      params.set(ProductFilterKeys.minPrice, filters.min.toString());
    }
    if (filters.max) {
      params.set(ProductFilterKeys.maxPrice, filters.max.toString());
    }
    if (filters.productName !== null && filters.productName !== "") {
      params.set(ProductFilterKeys.productName, filters.productName);
    }
    if (filters.filters) {
      params.append(ProductFilterKeys.categories, filters.filters);
    }

    setSearchParams(params);
  }, [filters.filters, filters.max, filters.min, filters.page, filters.pageSize, filters.productName, setSearchParams]);

  useEffect(() => {
    setFilters({
      page: Number(searchParams.get(ProductFilterKeys.page)) || ProductFilterDefaults.page,
      pageSize: Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductFilterDefaults.pageSize,
      min: Number(searchParams.get(ProductFilterKeys.minPrice)) || undefined,
      max: Number(searchParams.get(ProductFilterKeys.maxPrice)) || undefined,
      filters: searchParams.get(ProductFilterKeys.categories),
      productName: searchParams.get(ProductFilterKeys.productName) || "",
    });
  }, [searchParams]);

  return { filters, setFilters };
}
