import { useQuery } from "@tanstack/react-query";
import { UserKeys } from "../UserKeys";
import { getCurrentUser } from "../api/getCurrentUser";

interface UseGetCurrentUserParams {
  enabled: boolean;
}

export function useGetCurrentUser({ enabled }: UseGetCurrentUserParams) {
  return useQuery({
    queryKey: [UserKeys.CurrentUser],
    queryFn: getCurrentUser,
    staleTime: 1000 * 30,
    enabled,
  });
}
