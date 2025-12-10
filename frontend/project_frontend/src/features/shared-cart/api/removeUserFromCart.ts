import api from "@/api/axios-instance";

export const removeUserFromCart = async (cartId: number, userId: string) => {
  const response = await api.delete(`api/carts/${cartId}/users/${userId}`, {});
  return await response.data;
};
