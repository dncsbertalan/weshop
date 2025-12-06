import { IconButton } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

import { DialogWrapper } from "@/components/Dialog.Wrapper";

import { AddUserToCartDialogContent } from "./AddUserToCartDialog.Content";

export function AddUserToCartDialog() {
  return (
    <DialogWrapper
      trigger={
        <IconButton variant="ghost" rounded="full">
          <LuPlus />
        </IconButton>
      }
    >
      <AddUserToCartDialogContent />
    </DialogWrapper>
  );
}
