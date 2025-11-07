import { getProducts } from "@/api/product-api";
import { useQuery } from "@tanstack/react-query";
import { ProductFilter } from "../ProductFilter";
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
