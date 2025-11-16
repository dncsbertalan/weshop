import { Button, Menu, Portal } from "@chakra-ui/react";
import { LuRefreshCcw } from "react-icons/lu";

import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";

import { useSwitchActiveCart } from "../hooks/useSwitchActiveCart";
import { getUserCartName } from "../utils/getUserCartName";

interface ChangeCartProps {}

export function ChangeCart({}: ChangeCartProps) {
  const { user } = useAuthentication();
  const { mutate } = useSwitchActiveCart();

  const handleSwitchCart = (cartId: number) => {
    mutate(cartId);
  };

  if (!user || user.carts.length < 1) {
    return null;
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="md" variant="ghost" rounded="full">
          <LuRefreshCcw />
          Change cart
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Your cart</Menu.ItemGroupLabel>
              <Menu.Item value="ownCart" onClick={() => handleSwitchCart(user.ownedCartId)}>
                {getUserCartName(user, true)}{" "}
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Shared with you</Menu.ItemGroupLabel>
              {user.carts.map((cart, index) => {
                return (
                  <Menu.Item
                    value={index.toString()}
                    key={cart.cartId}
                    onClick={() => {
                      handleSwitchCart(cart.cartId);
                    }}
                  >
                    {getUserCartName(cart.owner, false)}
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
