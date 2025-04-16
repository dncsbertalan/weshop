import { CheckoutInfoData } from "@/dtos/chekout-info-data";
import api from "./axios-instance"
import { Orders } from "@/models/orders";

export const getOrders = async () => {
    const response = await api.get("/api/orders/me");
    return (await response.data) as Orders;
}

export const createOrder = async (checkoutData: CheckoutInfoData) => {
    const response = await api.post("/api/orders/me/create", checkoutData);
    return await response.data;
}

/*export const deleteProductFromCart = async (cartItemId: number) => {
    const response = await api.delete(`/api/carts/me/products/${cartItemId}`);
    return await response.data;
}

export const modifyProductInCart = async (cartItemId: number, quantity: number) => {
    const response = await api.patch(`/api/carts/me/products/${cartItemId}`, { quantity: quantity });
    return await response.data;
}*/