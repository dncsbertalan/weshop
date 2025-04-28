
import api from "./axios-instance"
import { Cart } from "@/models/Cart";

export const getCart = async (cartId: number) => {
    const response = await api.get(`/api/carts/${cartId}`);
    return (await response.data) as Cart;
}

export const addProductToCart = async (cartId: number, productId: number) => {
    const response = await api.post(`/api/carts/${cartId}/products`, { productId: productId });
    return await response.data;
}

export const deleteProductFromCart = async (cartId: number, cartItemId: number) => {
    const response = await api.delete(`/api/carts/${cartId}/products/${cartItemId}`);
    return await response.data;
}

export const modifyProductInCart = async (cartId: number, cartItemId: number, quantity: number) => {
    const response = await api.put(`/api/carts/${cartId}/products/${cartItemId}`, { quantity: quantity });
    return await response.data;
}