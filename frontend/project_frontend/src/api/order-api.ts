import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";
import { Orders } from "@/dtos/orders";

import api from "./axios-instance";

export const getOrders = async () => {
  const response = await api.get("/api/orders/me");
  return (await response.data) as Orders;
};

export const createOrder = async (cartId: number, checkoutData: CreateOrderRequestDto) => {
  const response = await api.post("/api/orders", { cartId: cartId, ...checkoutData });
  return await response.data;
};
