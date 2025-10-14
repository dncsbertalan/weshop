import { useQuery } from "@tanstack/react-query";
import { ProductKeys } from "../ProductKeys";
import { getProductImage } from "../api/getProductImage";

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
    staleTime: 1000 * 60 * 60,
  });
}
