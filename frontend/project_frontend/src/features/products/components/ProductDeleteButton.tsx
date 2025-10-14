import { DeleteButton } from "@/components/button/DeleteButton";
import { useDeleteProduct } from "@/features/product-editor/hooks/useDeleteProduct";

interface ProductDeleteButtonProps {
  productId: number;
}

export function ProductDeleteButton({ productId }: ProductDeleteButtonProps) {
  const { mutateAsync } = useDeleteProduct();

  const handleDelete = () => {
    mutateAsync(productId);
  };

  return <DeleteButton onClick={handleDelete} />;
}
