import { CartDto } from "@/dtos/response/cart/CartDto";
import { UserInformatioDto } from "@/dtos/response/user/UserInformatioDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { Stack, Text } from "@chakra-ui/react";

function getUserName(user: UserInformatioDto) {
  return `${user.firstName} ${user.lastName}`;
}

interface CartContentHeaderProps {
  cart: CartDto;
}

export function CartContentHeader({ cart }: CartContentHeaderProps) {
  const { user } = useAuthentication();
  const isOwnCart = user?.ownedCartId === cart.id;
  const name = isOwnCart ? "Your" : `${getUserName(cart.owner)}'s`;

  return (
    <Stack padding={2} paddingX={4} backgroundColor="bg.muted" rounded="full" width="fit-content">
      <Text>{`${name} cart`}</Text>
    </Stack>
  );
}
