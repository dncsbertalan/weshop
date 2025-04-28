import { getUser } from "@/api/user-api";
import { User } from "@/models/User";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    return useQuery<User>({
        queryKey: ["my-user"],
        queryFn: getUser,        
    })
};