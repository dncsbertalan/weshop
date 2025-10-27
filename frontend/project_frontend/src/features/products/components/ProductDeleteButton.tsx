import { Dialog } from "@/components/Dialog";
import { useDeleteProduct } from "@/features/product-editor/hooks/useDeleteProduct";
import { Button, Link, Text } from "@chakra-ui/react";

interface ProductDeleteButtonProps {
  productId: number;
}

export function ProductDeleteButton({ productId }: ProductDeleteButtonProps) {
  const { mutateAsync } = useDeleteProduct();

  const handleDelete = () => {
    mutateAsync(productId);
  };

  return (
    <Dialog
      body={<Text>Are you sure you want to delete this product? This action cannot be undone.</Text>}
      trigger={<Link color="fg.error">Delete</Link>}
      footer={
        <Button colorPalette="red" rounded="full" onClick={handleDelete}>
          Delete
        </Button>
      }
    />
  );
}
