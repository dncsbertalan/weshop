import api from "@/api/axios-instance";
import { OrdersDto } from "@/dtos/response/order/OrdersDto";

export const getOrders = async () => {
  const response = await api.get("/api/orders/me");
  return OrdersDto.parse(response.data);
};
