import { Link } from "@chakra-ui/react";

import { DialogWrapper } from "@/components/Dialog.Wrapper";

import { ModifyProductDialogContent } from "./ModifyProductDialog.Content";

interface ModifyProductDialogProps {
  productId: number;
}

export function ModifyProductDialog({ productId }: ModifyProductDialogProps) {
  return (
    <DialogWrapper
      trigger={
        <Link width="fit-content" _hover={{ cursor: "pointer" }}>
          View more
        </Link>
      }
    >
      <ModifyProductDialogContent productId={productId} />
    </DialogWrapper>
  );
}
