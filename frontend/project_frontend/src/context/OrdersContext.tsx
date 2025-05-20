import { createContext, PropsWithChildren, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/order-api";
import { Orders } from "@/models/orders";
import { ORDER_REFETCH_KEY } from "@/api/api-constants";

interface OrdersContextType {
    // Orders
    orders: Orders;
    ordersIsPending: boolean;
    ordersIsError: boolean;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);
const ORDERS_QUERY_KEY = "orders";

export const OrdersProvider = ({ children }: PropsWithChildren) => {
     // Get the cart items from the server.
     const { data: orders = { orders: [] }, isPending: ordersIsPending, isError: ordersIsError } = useQuery({
        queryKey: [ORDER_REFETCH_KEY, ORDERS_QUERY_KEY],
        queryFn: getOrders,
        staleTime: 1000 * 60 * 60,
    });

    return (
        <OrdersContext.Provider value={{
            orders,
            ordersIsPending,
            ordersIsError,
        }}>
            {children}
        </OrdersContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
