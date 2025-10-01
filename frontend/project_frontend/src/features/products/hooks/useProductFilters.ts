import { useEffect, useState } from "react";
import { ProductFilter, ProductFilterDefaults } from "../ProductFilter";
import { useSearchParams } from "react-router";
import { ProductFilterKeys } from "../ProductFilterKeys";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilter>(() => {
    return {
      page:
        Number(searchParams.get(ProductFilterKeys.page)) ||
        ProductFilterDefaults.page,
      pageSize:
        Number(searchParams.get(ProductFilterKeys.pageSize)) ||
        ProductFilterDefaults.pageSize,
      minPrice:
        Number(searchParams.get(ProductFilterKeys.minPrice)) ||
        ProductFilterDefaults.minPrice,
      maxPrice:
        Number(searchParams.get(ProductFilterKeys.maxPrice)) ||
        ProductFilterDefaults.maxPrice,
      categories:
        searchParams
          .get(ProductFilterKeys.categories)
          ?.split(",")
          .map(Number) || [],
    };
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.page) params.page = filters.page.toString();
    if (filters.pageSize) params.pageSize = filters.pageSize.toString();
    if (filters.minPrice) params.minPrice = filters.minPrice.toString();
    if (filters.maxPrice) params.maxPrice = filters.maxPrice.toString();
    if (filters.categories) params.maxPrice = filters.categories.join(",");

    setSearchParams(params);
  }, [
    filters.categories,
    filters.maxPrice,
    filters.minPrice,
    filters.page,
    filters.pageSize,
    setSearchParams,
  ]);

  useEffect(() => {
    setFilters({
      page:
        Number(searchParams.get(ProductFilterKeys.page)) ||
        ProductFilterDefaults.page,
      pageSize:
        Number(searchParams.get(ProductFilterKeys.pageSize)) ||
        ProductFilterDefaults.pageSize,
      minPrice:
        Number(searchParams.get(ProductFilterKeys.minPrice)) ||
        ProductFilterDefaults.minPrice,
      maxPrice:
        Number(searchParams.get(ProductFilterKeys.maxPrice)) ||
        ProductFilterDefaults.maxPrice,
      categories:
        searchParams
          .get(ProductFilterKeys.categories)
          ?.split(",")
          .map(Number) || [],
    });
  }, [searchParams]);

  return { filters, setFilters };
}
