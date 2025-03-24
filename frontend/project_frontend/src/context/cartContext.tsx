import { createContext, useContext, useState, useEffect } from "react";
import { addProductToCart, deleteProductFromCart, getCart, modifyProductInCart, } from "../api/cartApi";
import { Cart } from "@/models/Cart";

interface CartContextType {
    cart: Cart;
    addItem: (productId: number) => Promise<void>;
    removeItem: (cartItemId: number) => Promise<void>;
    modifyItem: (cartItemId: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart>({ cartItems: [] });

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
    );
};

// Hook a context használatához
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
