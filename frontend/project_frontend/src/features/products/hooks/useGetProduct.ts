import { useQuery } from "@tanstack/react-query";

import { getProduct } from "../api/getProduct";
import { ProductKeys } from "../ProductKeys";

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
