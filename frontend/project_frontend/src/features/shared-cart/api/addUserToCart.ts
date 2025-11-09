import api from "@/api/axios-instance";

export const addUserToCart = async (cartId: number, email: string) => {
  const response = await api.post(`api/carts/${cartId}/users`, {
    email,
  });
  return await response.data;
};
