import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api/getOrders";
import { OrderKeys } from "../OrderKeys";

export function useGetOrders() {
  return useQuery({
    queryKey: [OrderKeys.Orders],
    queryFn: getOrders,
    staleTime: Infinity,
  });
}
