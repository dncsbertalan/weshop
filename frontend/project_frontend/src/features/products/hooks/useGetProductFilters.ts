import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router";

import { ProductFilter, ProductFilterDefaults } from "../ProductFilter";
import { ProductFilterKeys } from "../ProductFilterKeys";
import { ProductFilterAction, productFilterReducer } from "../ProductFilterReducer";

function getFiltersFromSearchParams(searchParams: URLSearchParams): ProductFilter {
  return {
    page: Number(searchParams.get(ProductFilterKeys.page)) || ProductFilterDefaults.page,
    pageSize: Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductFilterDefaults.pageSize,
    minPrice: Number(searchParams.get(ProductFilterKeys.minPrice)) || undefined,
    maxPrice: Number(searchParams.get(ProductFilterKeys.maxPrice)) || undefined,
    categoryIds: searchParams.get(ProductFilterKeys.categories),
    productName: searchParams.get(ProductFilterKeys.productName) || "",
  };
}

export function useGetProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productFilters, dispatchProductFilters] = useReducer(
    productFilterReducer,
    getFiltersFromSearchParams(searchParams),
  );

  useEffect(() => {
    const params = new URLSearchParams();

    params.set(ProductFilterKeys.page, productFilters.page.toString());
    params.set(ProductFilterKeys.pageSize, productFilters.pageSize.toString());

    if (productFilters.minPrice) {
      params.set(ProductFilterKeys.minPrice, productFilters.minPrice.toString());
    }

    if (productFilters.maxPrice) {
      params.set(ProductFilterKeys.maxPrice, productFilters.maxPrice.toString());
    }

    if (productFilters.productName !== null && productFilters.productName !== "") {
      params.set(ProductFilterKeys.productName, productFilters.productName);
    }

    if (productFilters.categoryIds) {
      params.append(ProductFilterKeys.categories, productFilters.categoryIds);
    }

    setSearchParams(params);
  }, [
    productFilters.categoryIds,
    productFilters.maxPrice,
    productFilters.minPrice,
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
