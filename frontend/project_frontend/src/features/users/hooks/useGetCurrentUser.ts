import { useQuery } from "@tanstack/react-query";
import { UserKeys } from "../UserKeys";
import { getCurrentUser } from "../api/getCurrentUser";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: [UserKeys.CurrentUser],
    queryFn: getCurrentUser,
    staleTime: 1000 * 30,
  });
}
