import { useEffect, useReducer } from "react";
import { ProductFilter, ProductFilterDefaults } from "../ProductFilter";
import { useSearchParams } from "react-router";
import { ProductFilterKeys } from "../ProductFilterKeys";
import { ProductFilterAction, productFilterReducer } from "../productFilterReducer";

function getFiltersFromSearchParams(searchParams: URLSearchParams): ProductFilter {
  return {
    page: Number(searchParams.get(ProductFilterKeys.page)) || ProductFilterDefaults.page,
    pageSize: Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductFilterDefaults.pageSize,
    min: Number(searchParams.get(ProductFilterKeys.minPrice)) || undefined,
    max: Number(searchParams.get(ProductFilterKeys.maxPrice)) || undefined,
    filters: searchParams.get(ProductFilterKeys.categories),
    productName: searchParams.get(ProductFilterKeys.productName) || "",
  };
}

export function useGetProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productFilters, dispatchProductFilters] = useReducer(
    productFilterReducer,
    getFiltersFromSearchParams(searchParams)
  );

  useEffect(() => {
    const params = new URLSearchParams();

    params.set(ProductFilterKeys.page, productFilters.page.toString());
    params.set(ProductFilterKeys.pageSize, productFilters.pageSize.toString());

    if (productFilters.min) {
      params.set(ProductFilterKeys.minPrice, productFilters.min.toString());
    }
    if (productFilters.max) {
      params.set(ProductFilterKeys.maxPrice, productFilters.max.toString());
    }
    if (productFilters.productName !== null && productFilters.productName !== "") {
      params.set(ProductFilterKeys.productName, productFilters.productName);
    }
    if (productFilters.filters) {
      params.append(ProductFilterKeys.categories, productFilters.filters);
    }

    setSearchParams(params);
  }, [
    productFilters.filters,
    productFilters.max,
    productFilters.min,
    productFilters.page,
    productFilters.pageSize,
    productFilters.productName,
    setSearchParams,
  ]);

  useEffect(() => {
    dispatchProductFilters({ type: ProductFilterAction.SetAll, payload: getFiltersFromSearchParams(searchParams) });
  }, [searchParams]);

  return { productFilters, dispatchProductFilters };
}
