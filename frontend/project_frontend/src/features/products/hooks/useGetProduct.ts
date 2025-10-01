import { useQuery } from "@tanstack/react-query";
import { ProductKeys } from "../ProductKeys";
import { getProduct } from "@/api/product-api";

interface UseGetProductParams {
  productId: number | null;
}

export function useGetProduct({ productId }: UseGetProductParams) {
  return useQuery({
    queryKey: [ProductKeys.Product, productId],
    queryFn: async () => {
      if (!productId) {
        return null;
      }
      return await getProduct(productId);
    },
  });
}
