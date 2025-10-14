import { useEffect, useState } from "react";
import { ProductFilter, ProductFilterDefaults } from "../ProductFilter";
import { useSearchParams } from "react-router";
import { ProductFilterKeys } from "../ProductFilterKeys";

export function useGetProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilter>(() => {
    return {
      page: Number(searchParams.get(ProductFilterKeys.page)) || ProductFilterDefaults.page,
      pageSize: Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductFilterDefaults.pageSize,
      min: Number(searchParams.get(ProductFilterKeys.minPrice)) || undefined,
      max: Number(searchParams.get(ProductFilterKeys.maxPrice)) || undefined,
      filters: searchParams.get(ProductFilterKeys.categories)?.split(",").map(Number) || [],
      productName: searchParams.get(ProductFilterKeys.productName),
    };
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.page) {
      params.page = filters.page.toString();
    }
    if (filters.pageSize) {
      params.pageSize = filters.pageSize.toString();
    }
    if (filters.min) {
      params.min = filters.min.toString();
    }
    if (filters.max) {
      params.max = filters.max.toString();
    }
    if (filters.filters) {
      params.filters = filters.filters.join(",");
    }
    if (filters.productName) {
      params.productName = filters.productName;
    }

    setSearchParams(params);
  }, [filters.filters, filters.max, filters.min, filters.page, filters.pageSize, filters.productName, setSearchParams]);

  useEffect(() => {
    setFilters({
      page: Number(searchParams.get(ProductFilterKeys.page)) || ProductFilterDefaults.page,
      pageSize: Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductFilterDefaults.pageSize,
      min: Number(searchParams.get(ProductFilterKeys.minPrice)) || undefined,
      max: Number(searchParams.get(ProductFilterKeys.maxPrice)) || undefined,
      filters: searchParams.get(ProductFilterKeys.categories)?.split(",").map(Number) || [],
      productName: searchParams.get(ProductFilterKeys.productName),
    });
  }, [searchParams]);

  return { filters, setFilters };
}
