import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

import { CartItemDto } from "@/dtos/response/cart/CartItemDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useModifyProductInCart } from "@/features/cart/hooks/useModifyProductInCart";

interface CartItemCardNumberButtonsProps {
  cartItem: CartItemDto;
}

export function CartItemCardNumberButtons({ cartItem }: CartItemCardNumberButtonsProps) {
  const { user } = useAuthentication();
  const { mutate } = useModifyProductInCart();

  const modifyProductInCart = (increase: boolean) => {
    if (!user) {
      return;
    }

    mutate({
      cartId: user.activeCartId,
      cartItemId: cartItem.id,
      quantity: cartItem.quantity + (increase ? 1 : -1),
    });
  };

  return (
    <NumberInput.Root value={cartItem.quantity.toString()} unstyled>
      <HStack gap={2} padding={0.5} rounded="full" borderColor="border" borderWidth={1} width="fit-content">
        <NumberInput.DecrementTrigger
          asChild
          disabled={cartItem.quantity < 2}
          onClick={() => modifyProductInCart(false)}
        >
          <IconButton variant="ghost" rounded="full" size="sm">
            <LuMinus />
          </IconButton>
        </NumberInput.DecrementTrigger>

        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />

        <NumberInput.IncrementTrigger asChild onClick={() => modifyProductInCart(true)}>
          <IconButton variant="ghost" rounded="full" size="sm">
            <LuPlus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  );
}
