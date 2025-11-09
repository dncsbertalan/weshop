import { useQuery } from "@tanstack/react-query";
import { CategoryKeys } from "../CategoryKeys";
import { getCategories } from "../api/getCategories";

export function useGetCategories() {
  return useQuery({
    queryKey: [CategoryKeys.Categories],
    queryFn: getCategories,
  });
}
