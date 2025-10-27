import { Dialog } from "@/components/Dialog";
import { Button, Link } from "@chakra-ui/react";
import { ModifyProductDialogBody } from "./ModifyProductDialog.Body";

interface ModifyProductDialogProps {
  productId: number;
}

export function ModifyProductDialog({ productId }: ModifyProductDialogProps) {
  return (
    <Dialog
      title="Add new product"
      body={<ModifyProductDialogBody productId={productId} />}
      trigger={
        <Link width="fit-content" _hover={{ cursor: "pointer" }}>
          View more
        </Link>
      }
      footer={
        <Button type="submit" rounded="full">
          Create product
        </Button>
      }
    />
  );
}
