import { Box, Button, Flex, HStack, Menu, Portal, Spinner, Stack, Text, VStack } from "@chakra-ui/react";

import { useUser } from "@/context/UserContext";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { CartItems } from "./CartItems";
import { GlassContainer } from "@/components/GlassContainer";
import { CartDto } from "@/dtos/response/cart/CartDto";
import { CartContentHeader } from "./CartContent.Header";

interface CartContentProps {
  cart: CartDto;
}

export function CartContent({ cart }: CartContentProps) {
  return (
    <GlassContainer>
      <Stack gap={2}>
        {/* <Flex padding={{ lg: "0px 10px", xl: "0px 30px" }} marginBottom={{ base: "30px", md: "30px", lg: 0 }}> */}
        <Box>
          <CartContentHeader cart={cart} />
          <HStack gap="30px" marginBottom="10px">
            {cart && <CartInfoSec isShared={cart.isShared} />}
            <ChangeCart />
          </HStack>
          <Box borderTop="1px solid" borderTopColor="separator-color">
            {cart && <CartItems cartItems={cart.cartItems} />}
            <VStack gap="0px"></VStack>
          </Box>
        </Box>
        {/* </Flex> */}
      </Stack>
    </GlassContainer>
  );
}

function ChangeCart() {
  const { user, switchCart } = useUser();

  if (!user?.carts.length) {
    return null;
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="md" variant="outline" rounded="full">
          Change cart
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Your cart</Menu.ItemGroupLabel>
              <Menu.Item
                value="ownCart"
                onClick={() => {
                  switchCart(user.cartId);
                }}
              >
                {user?.firstName} {user?.lastName}
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Shared with you</Menu.ItemGroupLabel>
              {user?.carts.map((cartItem, index) => {
                return (
                  <Menu.Item
                    value={index.toString()}
                    key={index}
                    onClick={() => {
                      switchCart(cartItem.cartId);
                    }}
                  >
                    {cartItem.ownerFirstName} {cartItem.ownerLastName}
                  </Menu.Item>
                );
              })}
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function CartInfoSec({ isShared }: { isShared: boolean }) {
  const { user } = useAuthentication();
  const isOwnCart =
    user?.carts.filter(({ cartId, owner }) => cartId === user.activeCartId && owner.id === user.userId).length ?? 0 > 0;

  if (isOwnCart) {
    return (
      <Box>
        <Flex flexDirection="column" gap="6px">
          <Text lineHeight="25px" fontSize="21px" fontWeight="500">
            Your cart
          </Text>
        </Flex>
        {isShared && (
          <Text
            marginTop="6px"
            color="rgb(170, 170, 170)"
            lineHeight="16px"
            fontSize="12px"
            fontWeight="400px"
            width="275px"
          >
            Shared
          </Text>
        )}
      </Box>
    );
  }

  //const cartInfo = user.user?.carts.find(cart => cart.cartId == user.activeCartId);
  return (
    <Box bgColor="red">
      <Flex flexDirection="column" gap="6px">
        {/*<Text lineHeight="25px" fontSize="21px" fontWeight="500">{cartInfo?.ownerFirstName} {cartInfo?.ownerLastName}'s cart</Text>*/}
        <Text lineHeight="25px" fontSize="21px" fontWeight="500">
          {user?.carts.find((cart) => cart.cartId == user.activeCartId)?.owner.firstName}
          {user?.carts.find((cart) => cart.cartId == user.activeCartId)?.owner.lastName}'s cart
        </Text>
      </Flex>
      {isShared && (
        <Text
          marginTop="6px"
          color="rgb(170, 170, 170)"
          lineHeight="16px"
          fontSize="12px"
          fontWeight="400px"
          width="275px"
        >
          Shared
        </Text>
      )}
    </Box>
  );
}

function CartItemSectionLoading() {
  return <Spinner size="xl" borderWidth="4px" css={{ "--spinner-track-color": "colors.gray.200" }} />;
}

function CartItemSectionError() {
  return <div>ERROR IN THE CART</div>;
}
