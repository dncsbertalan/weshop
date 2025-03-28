import { cartApi_addItemToCart, cartApi_getCart } from "./api-constants"
import api from "./axios-instance"
import { Cart } from "@/models/Cart";

export const getCart = async () => {
    const response = await api.get(cartApi_getCart);
    return (await response.data) as Cart;
}

export const addProductToCart = async (productId: number) => {
    const response = await api.post(cartApi_addItemToCart, { productId: productId });
    return await response.data;
}

export const deleteProductFromCart = async (cartItemId: number) => {
    const response = await api.delete(`/api/carts/me/products/${cartItemId}`);
    return await response.data;
}

export const modifyProductInCart = async (cartItemId: number, quantity: number) => {
    const response = await api.patch(`/api/carts/me/products/${cartItemId}`, { quantity: quantity });
    return await response.data;
}