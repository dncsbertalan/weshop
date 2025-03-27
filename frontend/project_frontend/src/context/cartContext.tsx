import { createContext, useContext } from "react";
import { addProductToCart, deleteProductFromCart, getCart, modifyProductInCart, } from "../api/cartApi";
import { Cart } from "@/models/Cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CartContextType {
    cart: Cart;
    cartIsPending: boolean;
    cartIsError: boolean;
    addItemToCart: (productId: number) => Promise<void>;
    removeItemToCart: (cartItemId: number) => Promise<void>;
    modifyItemToCart: (cartItemId: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_QUERY_KEY = "cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();

     // Get the cart items from the server.
     const { data: cart = { cartItems: [] }, isPending: cartIsPending, isError: cartIsError } = useQuery({
        queryKey: [CART_QUERY_KEY],
        queryFn: getCart,
        staleTime: 1000 * 60 * 5, // data counts as fresh for 5 minutes
        retry: 1, // retry once if there is a problem
    });

    // Add item to the cart.
    const addItemMutation = useMutation({
        mutationFn: addProductToCart,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] });
        },
        onError: (error) => {
            console.error("Error adding item to cart:", error);
        },
    });

    // Remove item from the cart.
    const removeItemMutation = useMutation({
        mutationFn: deleteProductFromCart,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] });
        },
    });
    
    // Modify the quantity of an item in the cart.
    const modifyItemMutation = useMutation({
        mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
            modifyProductInCart(cartItemId, quantity),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY] });
        },
    });

    return (
        <CartContext.Provider value={{
            cart,
            cartIsPending,
            cartIsError,
            addItemToCart: (productId) => addItemMutation.mutateAsync(productId),
            removeItemToCart: (cartItemId) => removeItemMutation.mutateAsync(cartItemId),
            modifyItemToCart: (cartItemId, quantity) => modifyItemMutation.mutateAsync({ cartItemId, quantity }),
        }}>
            {children}
        </CartContext.Provider>
    );

    /*const [cart, setCart] = useState<Cart>({ cartItems: [] });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCart();
                setCart(data);
            } catch (error: any) {
                console.error("Hiba a kosár lekérésekor:", error);
                console.error("Getting cart items was not successful. Error: ", error.response?.data || error.message);
            }
        };
        fetchCart();
    }, []);

    const addItem = async (productId: number) => {
        try {
            await addProductToCart(productId);
            const updatedCart = await getCart();
            setCart(updatedCart);
        } catch (error: any) {
            console.error("Hiba a kosárhoz adáskor:", error);
            console.error("Adding product to cart was not successful. Error: ", error.response?.data || error.message);
        }
    };

    const removeItem = async (cartItemId: number) => {
        try {
            await deleteProductFromCart(cartItemId);
            const updatedCart = await getCart();
            setCart(updatedCart);
        } catch (error) {
            console.error("Hiba az eltávolításkor:", error);
        }
    };

    const modifyItem = async (cartItemId: number, quantity: number) => {
        try {
            await modifyProductInCart(cartItemId, quantity);
            const updatedCart = await getCart();
            setCart(updatedCart);
        } catch (error) {
            console.error("Hiba a módosításkor:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, modifyItem }}>
            {children}
        </CartContext.Provider>
    );*/
};

// Hook a context használatához
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
