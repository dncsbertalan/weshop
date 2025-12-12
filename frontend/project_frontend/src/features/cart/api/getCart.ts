import api from "@/api/axios-instance";
import { CartDto } from "@/dtos/response/cart/CartDto";

export const getCart = async (cartId: number) => {
  const response = await api.get(`/api/carts/${cartId}`);
  return CartDto.parse(response.data);
};
