import { Badge, Float, Stack } from "@chakra-ui/react";
import React from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useGetCart } from "@/features/cart/hooks/useGetCart";
import { useIsBelowBreakpoint } from "@/hooks/useIsBelowBreakpoint";
import { Navigation } from "@/routes/navigation";

import { NavigationBarButton } from "./NavigationBar.Button";
import { NavigationBarProfilButton } from "./NavigationBar.ProfilButton";

interface NavigationBarButtonsProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isCollapable?: boolean;
}

export function NavigationBarButtons({ open, setOpen, isCollapable }: NavigationBarButtonsProps) {
  const { isAdmin, isAuthenticated } = useAuthentication();
  const { data: cart } = useGetCart();
  const showHamburger = useIsBelowBreakpoint({ size: "md" });

  if (!isCollapable && showHamburger) {
    return <NavigationBarButton icon={<FaBars />} onClick={() => setOpen(!open)} isVertical={isCollapable} />;
  }

  return (
    <Stack
      direction={isCollapable ? "column" : "row"}
      alignItems={isCollapable ? "start" : "center"}
      gap={0}
      width={isCollapable ? "full" : undefined}
    >
      {isAdmin && <NavigationBarButton label="Editor" navigate={Navigation.admin} isVertical={isCollapable} />}
      {isAuthenticated && (
        <React.Fragment>
          <NavigationBarButton
            label="Cart"
            navigate={Navigation.shoppingCart}
            icon={<MdOutlineShoppingCart />}
            extra={
              cart &&
              cart.quantity > 0 && (
                <Float offsetY={-1} offsetX={0}>
                  <Badge backgroundColor="red" color="white" rounded="full">
                    {cart.quantity}
                  </Badge>
                </Float>
              )
            }
            isVertical={isCollapable}
          />
          <NavigationBarProfilButton isVertical={isCollapable} />
        </React.Fragment>
      )}
      {!isAuthenticated && <NavigationBarButton label="Log in" navigate={Navigation.login} isVertical={isCollapable} />}
    </Stack>
  );
}
