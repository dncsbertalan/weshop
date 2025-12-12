import { Image, Stack, Text } from "@chakra-ui/react";

import { CartItemDto } from "@/dtos/response/cart/CartItemDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useRemoveProductFromCart } from "@/features/cart/hooks/useRemoveProductFromCart";
import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { getUserName } from "@/features/users/utils/getUserName";
import { formatCurrencyFt } from "@/utils/currency";

import { RemoveButton } from "../button/RemoveButton";
import { CartItemCardNumberButtons } from "./CartItemCard.NumberButtons";

interface CartItemCardProps {
  cartItem: CartItemDto;
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
  const { mutate: removeProductFromCart } = useRemoveProductFromCart();
  const { user } = useAuthentication();
  const remove = () => {
    if (!user) {
      return;
    }

    removeProductFromCart({ cartId: user.activeCartId, cartItemId: cartItem.id });
  };

  const { data: image } = useGetProductImage({ productId: cartItem.productId });
  const addedBy = user?.activeCartId === user?.ownedCartId ? "you" : getUserName(cartItem.addedBy);

  return (
    <Stack width="full" paddingY={2} paddingX={1.5}>
      <Stack direction="row" alignItems="center" gap={4}>
        <Stack minHeight={100} minWidth={100}>
          <Image objectFit="cover" height={100} width={100} src={image ?? undefined} />
        </Stack>

        <Stack
          direction={{ base: "column", xl: "row" }}
          alignItems={{ base: "start", xl: "center" }}
          justifyContent="space-between"
          height="100%"
          width="full"
        >
          <Stack gap={2} direction="column" justifyContent="start" width="full" flex={{ base: undefined, lg: 1.25 }}>
            <Stack>
              <Text fontSize="sm" fontWeight="400px">
                {cartItem.name}
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="xs" fontWeight="400px">
                Added by {addedBy}
              </Text>
            </Stack>
          </Stack>

          <Stack
            direction={{ base: "column", sm: "row" }}
            flex={{ base: undefined, lg: 1.5 }}
            alignItems={{ base: "start", sm: "center" }}
            width="full"
          >
            <Stack flex={{ base: undefined, lg: 0.5 }} width="full" alignItems="end" paddingRight={4}>
              <Stack>
                <Text fontSize="md" fontWeight="bold">
                  {formatCurrencyFt(cartItem.price)}
                </Text>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent={{ base: "end" }}
              width="full"
              alignItems="center"
              gap={4}
              flex={{ base: undefined, lg: 0.5 }}
            >
              <CartItemCardNumberButtons cartItem={cartItem} />

              <RemoveButton onClick={remove} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
