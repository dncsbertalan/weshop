import { createContext, useContext } from "react";
import { addProductToCart, addUserToCart, deleteProductFromCart, getCart, modifyProductInCart, } from "../api/cart-api";
import { Cart } from "@/models/Cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/api/order-api";
import { CheckoutInfoData } from "@/dtos/chekout-info-data";
import { useUser } from "./UserContext";
import { AddUserToCartDto } from "@/dtos/AddUserToCartDto";

interface CartContextType {
    // Cart
    cart: Cart;
    cartIsPending: boolean;
    cartIsError: boolean;
    addItemToCart: (cartId: number, productId: number) => Promise<void>;
    removeItemToCart: (cartId: number, cartItemId: number) => Promise<void>;
    modifyItemToCart: (cartId: number, cartItemId: number, quantity: number) => Promise<void>;
    addUserToCart: (cartId: number, userData: AddUserToCartDto) => Promise<void>;
    // Order
    createOrderIsPending: boolean;
    createOrderIsSuccess: boolean;
    createOrderIsError: boolean;
    createOrder: (checkoutInfo: CheckoutInfoData) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_QUERY_KEY = "cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { activeCartId } = useUser();

    // Get the cart items from the server.
    const {
        data: cart = { cartItems: [] },
        isPending: cartIsPending,
        isError: cartIsError,
    } = useQuery({
        queryKey: [CART_QUERY_KEY, activeCartId],
        queryFn: () => getCart(activeCartId!),
        staleTime: 1000 * 60 * 60, // data counts as fresh for an hour
        enabled: !!activeCartId,
    });


    //#region Cart item modifications

    // Add item to the cart.
    const addItemMutation = useMutation({
        mutationFn: ({ cartId, productId }: { cartId: number; productId: number }) =>
            addProductToCart(cartId, productId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, activeCartId] });
        },
        onError: (error) => {
            console.error("Error adding item to cart:", error);
        },
    });

    // Remove item from the cart.
    const removeItemMutation = useMutation({
        mutationFn: ({ cartId, cartItemId }: { cartId: number; cartItemId: number }) =>
            deleteProductFromCart(cartId, cartItemId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, activeCartId] });
        },
    });

    // Modify the quantity of an item in the cart.
    const modifyItemMutation = useMutation({
        mutationFn: ({ cartId, cartItemId, quantity }: { cartId: number; cartItemId: number; quantity: number }) =>
            modifyProductInCart(cartId, cartItemId, quantity),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, activeCartId] });
        },
    });

    //#endregion


    //#region Shared cart

    const addUserToCartMutation = useMutation({
        mutationFn: ({ cartId, userData }: { cartId: number; userData: AddUserToCartDto; }) => addUserToCart(cartId, userData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, activeCartId] });
        },
        onError: (error) => {
            console.error("Error adding user to cart:", error);
        },
    });

    //#endregion


    // Checkout
    const createOrderMutation = useMutation({
        mutationFn: (checkoutData: CheckoutInfoData) => createOrder(checkoutData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, activeCartId] });
        },
        onError: (error) => {
            console.error("Error creating the order:", error);
        },
    });

    return (
        <CartContext.Provider value={{
            cart,
            cartIsPending,
            cartIsError,
            addItemToCart: (cartId, productId) => addItemMutation.mutateAsync({ cartId, productId }),
            removeItemToCart: (cartId, cartItemId) => removeItemMutation.mutateAsync({ cartId, cartItemId }),
            modifyItemToCart: (cartId, cartItemId, quantity) => modifyItemMutation.mutateAsync({ cartId, cartItemId, quantity }),
            addUserToCart: (cartId, userData) => addUserToCartMutation.mutateAsync({ cartId, userData }),

            createOrderIsPending: createOrderMutation.isPending,
            createOrderIsSuccess: createOrderMutation.isSuccess,
            createOrderIsError: createOrderMutation.isError,
            createOrder: (checkoutData: CheckoutInfoData) => createOrderMutation.mutateAsync(checkoutData),
        }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
