import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/getCurrentUser";
import { UserKeys } from "../UserKeys";

interface UseGetCurrentUserParams {
  enabled: boolean;
}

export function useGetCurrentUser({ enabled }: UseGetCurrentUserParams) {
  return useQuery({
    queryKey: [UserKeys.CurrentUser],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    enabled,
  });
}
