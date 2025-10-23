import { DeleteButton } from "@/components/button/DeleteButton";
import { useDeleteProduct } from "@/features/product-editor/hooks/useDeleteProduct";

interface ProductDeleteButtonProps {
  productId: number;
}

export function ProductDeleteButton({ productId }: ProductDeleteButtonProps) {
  const { mutateAsync } = useDeleteProduct();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    mutateAsync(productId);
  };

  return <DeleteButton onClick={(event) => handleDelete(event)} />;
}
