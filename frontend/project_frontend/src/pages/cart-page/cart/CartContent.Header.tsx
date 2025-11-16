import { Stack, Text } from "@chakra-ui/react";

import { GlassContainer } from "@/components/GlassContainer";
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
    <GlassContainer width="100%" shadow="gentle">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text textStyle="xl" fontWeight="medium">{`${name} cart`}</Text>
        <Stack direction="row" gap={2}>
          <ChangeCart />
          <AddUserToCartDialog />
        </Stack>
      </Stack>
    </GlassContainer>
  );
}
