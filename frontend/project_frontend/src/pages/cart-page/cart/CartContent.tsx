import { Box, Spinner, Stack, VStack } from "@chakra-ui/react";

import { CartDto } from "@/dtos/response/cart/CartDto";

import { CartContentHeader } from "./CartContent.Header";
import { CartItems } from "./CartItems";

interface CartContentProps {
  cart: CartDto;
}

export function CartContent({ cart }: CartContentProps) {
  return (
    <Stack gap={8} width="100%">
      <CartContentHeader cart={cart} />
      <Box borderTop="1px solid" borderTopColor="separator-color">
        <CartItems cartItems={cart.cartItems} />
      </Box>
    </Stack>
  );
}

function CartItemSectionLoading() {
  return <Spinner size="xl" borderWidth="4px" css={{ "--spinner-track-color": "colors.gray.200" }} />;
}

function CartItemSectionError() {
  return <div>ERROR IN THE CART</div>;
}
