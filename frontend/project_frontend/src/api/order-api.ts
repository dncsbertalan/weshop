import { CheckoutInfoData } from "@/dtos/chekout-info-data";
import { Orders } from "@/models/orders";

import api from "./axios-instance"

export const getOrders = async () => {
    const response = await api.get("/api/orders/me");
    return (await response.data) as Orders;
}

export const createOrder = async (cartId: number, checkoutData: CheckoutInfoData) => {
    const response = await api.post("/api/orders", {cartId: cartId, ...checkoutData});
    return await response.data;
}