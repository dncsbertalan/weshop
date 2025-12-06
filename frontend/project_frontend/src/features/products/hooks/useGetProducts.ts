import { useQuery } from "@tanstack/react-query";

import { ProductFilter } from "@/dtos/request/product/ProductFilter";

import { getProducts } from "../api/getProducts";
import { ProductKeys } from "../ProductKeys";

interface UseGetProductsParams {
  productFilter: ProductFilter;
}

export function useGetProducts({ productFilter }: UseGetProductsParams) {
  return useQuery({
    queryKey: [ProductKeys.Products, productFilter],
    queryFn: () => getProducts(productFilter),
    staleTime: 1000 * 60 * 60,
    placeholderData: (prev) => prev,
  });
}
