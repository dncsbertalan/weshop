import api from "@/api/axios-instance";

export const modifyProductInCart = async (cartId: number, cartItemId: number, quantity: number) => {
  const response = await api.put(`/api/carts/${cartId}/products/${cartItemId}`, { quantity });
  return await response.data;
};
