import api from "@/api/axios-instance";

export const addProductToCart = async (cartId: number, productId: number) => {
  const response = await api.post(`/api/carts/${cartId}/products`, { productId: productId });
  return await response.data;
};
