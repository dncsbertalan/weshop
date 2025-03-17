import { CartItemDto } from "@/dtos/CartItemDto";
import { cartApi_addItemToCart, cartApi_getCart } from "./apiConstants"
import api from "./axiosInstance"

export const getCart = async () => {
    const response = await api.get(cartApi_getCart);
    return (await response.data) as CartItemDto[];
}

export const addProductToCart = async (productId: number) => {
    const response = await api.post(cartApi_addItemToCart, { productId: productId });
    return await response.data;
}