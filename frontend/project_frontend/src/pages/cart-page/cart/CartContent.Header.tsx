import { Stack, Text } from "@chakra-ui/react";

import { CartDto } from "@/dtos/response/cart/CartDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { AddUserToCartDialog } from "@/features/cart/components/AddUserToCartDialog";
import { ChangeCart } from "@/features/cart/components/ChangeCart";
import { getUserCartName } from "@/features/cart/utils/getUserCartName";

interface CartContentHeaderProps {
  cart: CartDto;
}

export function CartContentHeader({ cart }: CartContentHeaderProps) {
  const { user } = useAuthentication();
  const isOwnCart = user?.ownedCartId === cart.id;
  const name = getUserCartName(cart.owner, isOwnCart);

  return (
    <Stack
      padding={4}
      position="sticky"
      top={0}
      background="linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 0) 100%)"
      backdropFilter="blur(1px)"
      zIndex={1}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text textStyle="xl" fontWeight="medium">{`${name} cart`}</Text>
        <Stack direction="row" gap={2}>
          <ChangeCart />
          <AddUserToCartDialog />
        </Stack>
      </Stack>
    </Stack>
  );
}
