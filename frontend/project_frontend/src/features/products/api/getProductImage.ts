import api from "@/api/axios-instance";

export async function getProductImage(productId: number) {
  const response = await api.get(`/api/products/${productId}/image`, {
    responseType: "blob",
  });

  const imageBlob = response.data;
  const imageUrl = URL.createObjectURL(imageBlob);
  return imageUrl;
}
