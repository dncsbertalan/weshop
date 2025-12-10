import api from "@/api/axios-instance";
import { AddUserToCartRequestDto } from "@/dtos/request/cart/AddUserToCartRequestDto";

export const addUserToCart = async (cartId: number, request: AddUserToCartRequestDto) => {
  const response = await api.post(`api/carts/${cartId}/users`, request);
  return await response.data;
};
