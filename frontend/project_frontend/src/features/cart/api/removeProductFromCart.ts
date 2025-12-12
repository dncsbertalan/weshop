import api from "@/api/axios-instance";

export const removeProductFromCart = async (cartId: number, cartItemId: number) => {
  const response = await api.delete(`/api/carts/${cartId}/products/${cartItemId}`);
  return await response.data;
};
