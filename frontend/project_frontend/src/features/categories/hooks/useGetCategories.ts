import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../api/getCategories";
import { CategoryKeys } from "../CategoryKeys";

export function useGetCategories() {
  return useQuery({
    queryKey: [CategoryKeys.Categories],
    queryFn: getCategories,
  });
}
