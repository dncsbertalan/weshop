import { getUser } from "@/api/user-api";
import { User } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: User | undefined;
    isDataFetched: boolean;
    activeCartId: number | undefined;
    switchCart: (cartId: number) => Promise<boolean>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {

    // Fetching the user's data
    const { data, isPending, isError } = useQuery<User>({
        queryKey: ["my-user"],
        queryFn: getUser,
        staleTime: 1000 * 60 * 60,
    });

    // Storing the active cart of the user
    const [activeCartId, setActiveCartId] = useState<number | undefined>(undefined);

    // Initializing the data from backend
    useEffect(() => {
        if (data && !activeCartId) {
            setActiveCartId(data.cartId ?? data.carts[0]?.cartId);
            console.log("TEMPORARY!\nUser data changed somehow. It should not happen.\nTODO: Remove this later.");
        }
    }, [data, activeCartId]);


    // Switching carts
    const switchCart = async (cartId: number) => {
        if (data?.carts.some(c => c.cartId === cartId) || data?.cartId == cartId) {
            setActiveCartId(cartId);
            return true;
        }
        return false;
    };


    return (
        <UserContext.Provider value={{
            user: data,
            isDataFetched: !isError && !isPending,
            activeCartId,
            switchCart,
        }}>
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within a UserProvider");
    return context;
};