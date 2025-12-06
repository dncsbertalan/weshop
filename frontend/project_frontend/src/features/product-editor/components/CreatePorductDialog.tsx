import { Button } from "@chakra-ui/react";

import { DialogWrapper } from "@/components/Dialog.Wrapper";

import { CreateProductDialogContent } from "./CreateProductDialog.Content";

export function CreatePorductDialog() {
  return (
    <DialogWrapper trigger={<Button>Add new product</Button>}>
      <CreateProductDialogContent />
    </DialogWrapper>
  );
}
