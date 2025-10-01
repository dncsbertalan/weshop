import { getCategories } from "@/api/category-api";
import { useQuery } from "@tanstack/react-query";
import { CategoryKeys } from "../CategoryKeys";

export function useGetCategories() {
  return useQuery({
    queryKey: [CategoryKeys.Categories],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}
