import { Badge, Flex, Float, Heading, HStack, IconButton, Spacer, Span } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

import { useCart } from "@/context/cartContext";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useLogoutUser } from "@/features/authentication/hooks/useLogoutUser";
import { Navigation } from "@/routes/navigation";

export function NavBarInner({ children }: PropsWithChildren) {
  return (
    <Flex
      align="center"
      width="global-max-window-size"
      maxWidth="global-max-window-size"
      height="global-navbar-height"
      margin="0px 20px"
    >
      <Link to={Navigation.home}>
        <Heading
          size="3xl"
          fontWeight="700"
          //backgroundImage="linear-gradient(to right, teal, purple)"
          //backgroundImage="linear-gradient(90deg, #a78bfa, #5eead4)"
          backgroundImage="linear-gradient(90deg, #94a3b8, #6ee7b7)"
          color="transparent"
          backgroundClip="text"
          textShadow="0 1px 2px rgba(0,0,0,0.08)"
        >
          <Span>We</Span>
          Shop
        </Heading>
      </Link>

      <Spacer />

      <HStack gap="0px">{children}</HStack>
    </Flex>
  );
}

export function AdminButton() {
  const { isAuthenticated, isAdmin } = useAuthentication();

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <Link to={Navigation.admin}>
      <IconButton
        aria-label="Admin"
        size="md"
        height="global-navbar-height"
        rounded="0px"
        color="gray.700"
        backgroundColor="transparent"
        padding="0px 10px"
        _hover={{
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(0, 0, 0, .35)",
          color: "black",
        }}
      >
        Editor
      </IconButton>
    </Link>
  );
}

export function NavLoginButton() {
  const { isAuthenticated } = useAuthentication();
  if (isAuthenticated) {
    return null;
  }

  return (
    <Link to={Navigation.login}>
      <IconButton
        aria-label="Login"
        size="md"
        height="global-navbar-height"
        rounded="0px"
        color="gray.700"
        backgroundColor="transparent"
        padding="0px 10px"
        _hover={{
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(0, 0, 0, .35)",
          color: "black",
        }}
      >
        <FaRightToBracket />
        Login
      </IconButton>
    </Link>
  );
}

export function NavLogoutButton() {
  const { isAuthenticated } = useAuthentication();
  const { logout } = useLogoutUser();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Link to={Navigation.login}>
      <IconButton
        aria-label="Login"
        size="md"
        height="global-navbar-height"
        rounded="0px"
        color="gray.700"
        backgroundColor="transparent"
        padding="0px 10px"
        _hover={{
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(0, 0, 0, .35)",
          color: "black",
        }}
        onClick={() => {
          logout();
        }}
      >
        <FaRightToBracket />
        Logout
      </IconButton>
    </Link>
  );
}

export function NavProfilButton() {
  const { isAuthenticated } = useAuthentication();
  if (isAuthenticated) {
    return (
      <Link to={Navigation.profile}>
        <IconButton
          aria-label="Profil"
          size="md"
          height="global-navbar-height"
          rounded="0px"
          color="gray.700"
          backgroundColor="transparent"
          padding="0px 10px"
          _hover={{
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(0, 0, 0, .35)",
            color: "black",
          }}
        >
          <FaUser />
          Profil
        </IconButton>
      </Link>
    );
  }

  return null;
}

export function NavCartButton() {
  const { isAuthenticated } = useAuthentication();
  const { cart } = useCart();

  if (isAuthenticated) {
    return (
      <Link to={Navigation.shoppingCart}>
        <IconButton
          aria-label="Shopping cart"
          size="md"
          height="global-navbar-height"
          rounded="0px"
          color="gray.700"
          backgroundColor="transparent"
          padding="0px 10px"
          _hover={{
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(0, 0, 0, .35)",
            color: "black",
          }}
        >
          <MdOutlineShoppingCart />
          Cart
          {cart && cart.cartItems.length > 0 && (
            <Float offsetY="12px" offsetX="8px" /*offsetY="4px" offsetX="4px"*/>
              <Badge backgroundColor="red" color="white" rounded="full">
                {cart?.cartItems.length}
              </Badge>
            </Float>
          )}
        </IconButton>
      </Link>
    );
  }

  return null;
}
