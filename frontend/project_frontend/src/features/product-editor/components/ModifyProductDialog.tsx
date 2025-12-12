import { Link, Spinner } from "@chakra-ui/react";

import { DialogContent } from "@/components/Dialog.Content";
import { DialogWrapper } from "@/components/Dialog.Wrapper";
import { useGetProduct } from "@/features/products/hooks/useGetProduct";

import { ModifyProductDialogContent } from "./ModifyProductDialog.Content";

interface ModifyProductDialogProps {
  productId: number;
}

export function ModifyProductDialog({ productId }: ModifyProductDialogProps) {
  const { data: product, isPending } = useGetProduct({ productId });

  return (
    <DialogWrapper
      trigger={
        <Link width="fit-content" _hover={{ cursor: "pointer" }}>
          View more
        </Link>
      }
    >
      {isPending && <DialogContent title="Edit product" body={<Spinner />} minWidth={1000} minHeight={700} />}
      {product && <ModifyProductDialogContent productId={productId} product={product} />}
    </DialogWrapper>
  );
}
