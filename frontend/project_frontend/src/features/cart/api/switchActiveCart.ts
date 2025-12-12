import api from "@/api/axios-instance";

export const switchActiveCart = async (cartId: number) => {
  const response = await api.patch(`/api/users/me/active-cart/${cartId}`);
  return await response.data;
};
