import { useQuery } from "@tanstack/react-query";

import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";

import { getCart } from "../api/getCart";
import { CartKeys } from "../CartKeys";

export function useGetCart() {
  const { user } = useAuthentication();

  return useQuery({
    queryKey: [CartKeys.Cart, user?.activeCartId],
    queryFn: async () => {
      if (!user?.activeCartId) {
        return null;
      }

      return getCart(user.activeCartId);
    },
    enabled: !!user,
  });
}
