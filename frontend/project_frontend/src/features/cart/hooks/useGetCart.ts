import { useQuery } from "@tanstack/react-query";
import { CartKeys } from "../CartKeys";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { getCart } from "../api/getCart";

export function useGetCart() {
  const { user } = useAuthentication();
  return [
    useQuery({
      queryKey: [CartKeys.Cart, user?.activeCartId],
      queryFn: () => {
        if (!user?.activeCartId) {
          return null;
        }
        return getCart(user.activeCartId);
      },
      enabled: !!user,
    }),
  ];
}
