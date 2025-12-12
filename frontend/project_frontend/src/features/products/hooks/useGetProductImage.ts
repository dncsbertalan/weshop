import { useQuery } from "@tanstack/react-query";

import { getProductImage } from "../api/getProductImage";
import { ProductKeys } from "../ProductKeys";

interface UseGetProductImageParams {
  productId: number | null;
}

export function useGetProductImage({ productId }: UseGetProductImageParams) {
  return useQuery({
    queryKey: [ProductKeys.ProductImage, productId],
    queryFn: async () => {
      if (!productId) {
        return null;
      }

      return await getProductImage(productId);
    },
    enabled: !!productId,
    staleTime: Infinity,
  });
}
