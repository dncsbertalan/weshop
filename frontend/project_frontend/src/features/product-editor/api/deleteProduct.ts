import api from "@/api/axios-instance";

export async function deleteProduct(productId: number) {
  await api.delete(`/api/admin/products/${productId}`);
}
