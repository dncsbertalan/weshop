import api from "@/api/axios-instance";
import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";

export const createOrder = async (cartId: number, createOrderRequest: CreateOrderRequestDto) => {
  const response = await api.post("/api/orders", { cartId, ...createOrderRequest });
  return await response.data;
};
