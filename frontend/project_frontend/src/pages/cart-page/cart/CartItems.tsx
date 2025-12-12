import { Stack } from "@chakra-ui/react";

import { CartItemCard } from "@/components/product/CartItemCard";
import { CartItemDto } from "@/dtos/response/cart/CartItemDto";

import { EmptyCartItems } from "./EmptyCartItems";

interface CartItemsProps {
  cartItems: CartItemDto[];
}

export function CartItems({ cartItems }: CartItemsProps) {
  return (
    <Stack>
      {cartItems.map((item) => {
        return <CartItemCard key={item.id} cartItem={item} />;
      })}
      {cartItems.length === 0 && <EmptyCartItems />}
    </Stack>
  );
}
