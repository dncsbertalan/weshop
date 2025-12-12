import { IconButton } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

import { DialogWrapper } from "@/components/Dialog.Wrapper";
import { CartDto } from "@/dtos/response/cart/CartDto";

import { AddUserToCartDialogContent } from "./AddUserToCartDialog.Content";

interface AddUserToCartDialogProps {
  cart: CartDto;
}

export function AddUserToCartDialog({ cart }: AddUserToCartDialogProps) {
  return (
    <DialogWrapper
      trigger={
        <IconButton variant="subtle" rounded="full">
          <LuPlus />
        </IconButton>
      }
    >
      <AddUserToCartDialogContent cart={cart} />
    </DialogWrapper>
  );
}
