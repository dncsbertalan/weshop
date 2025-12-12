import { IconButton, Popover, Portal, Separator, Stack, Text } from "@chakra-ui/react";
import { BsPersonX } from "react-icons/bs";
import { FaInfo } from "react-icons/fa6";

import { RemoveButton } from "@/components/button/RemoveButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { CartDto } from "@/dtos/response/cart/CartDto";
import { getUserName } from "@/features/users/utils/getUserName";

import { useRemoveUserFromCart } from "../../shared-cart/hooks/useRemoveUserFromCart";

interface CartInformationProps {
  cart: CartDto;
  isOwnCart: boolean;
}

export function CartInformation({ cart, isOwnCart }: CartInformationProps) {
  const { mutate } = useRemoveUserFromCart();
  const handleDelete = (userId: string) => {
    mutate({ cartId: cart.id, userId });
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton variant="subtle" rounded="full">
          <FaInfo />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              {cart.sharedWith.length > 0 && (
                <Stack gap={4}>
                  <Popover.Title fontWeight="semibold">Cart owner</Popover.Title>
                  <Text fontSize="md">{getUserName(cart.owner)}</Text>
                  <Separator />

                  <Popover.Title fontWeight="semibold">Cart members</Popover.Title>
                  {cart.sharedWith.map((user) => (
                    <Stack key={user.id} direction="row" justifyContent="space-between" alignItems="center">
                      <Text fontSize="md">{getUserName(user)}</Text>
                      {isOwnCart && (
                        <RemoveButton size="2xs" onClick={() => handleDelete(user.id)}>
                          Delete
                        </RemoveButton>
                      )}
                    </Stack>
                  ))}
                </Stack>
              )}
              {cart.sharedWith.length === 0 && (
                <Stack flex={1}>
                  <EmptyState
                    title="No members"
                    description="Share your cart with other to shop together"
                    icon={<BsPersonX />}
                  />
                </Stack>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
