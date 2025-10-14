import { Badge, Box, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import {
  AdminButton,
  NavBarInner,
  NavCartButton,
  NavLoginButton,
  NavLogoutButton,
  NavProfilButton,
} from "./NavBarInner";
import { PropsWithChildren, useMemo } from "react";
import { Navigation } from "@/routes/navigation";
import { FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { Role } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { Link } from "react-router";

export function GlobalNavBar_ols() {
  const { isAuthenticated, user } = useAuthentication();
  const { cart } = useCart();

  const isAdmin = useMemo(() => user?.roles.find((role) => role === Role.Admin) !== undefined, [user?.roles]);
  const cartCount = cart?.cartItems?.length ?? 0;

  const menuItems = [
    ...(isAdmin ? [{ label: "Editor", to: Navigation.admin, icon: null }] : []),
    ...(isAuthenticated
      ? [
          {
            label: (
              <>
                <MdOutlineShoppingCart /> Cart
                {cartCount > 0 && (
                  <Badge ml="6px" colorScheme="red" borderRadius="full" fontSize="0.7em">
                    {cartCount}
                  </Badge>
                )}
              </>
            ),
            to: Navigation.shoppingCart,
          },
          {
            label: (
              <>
                <FaUser /> Profile
              </>
            ),
            to: Navigation.profile,
          },
          {
            label: (
              <>
                <FaRightToBracket /> Logout
              </>
            ),
            to: Navigation.home,
          },
        ]
      : [
          {
            label: (
              <>
                <FaRightToBracket /> Login
              </>
            ),
            to: Navigation.login,
          },
        ]),
  ];

  return (
    <Flex
      as="nav"
      justifyContent="center"
      alignItems="center"
      background="global-navbar-bg-color"
      width="100%"
      height="global-navbar-height"
      zIndex="global-navbar-z-index"
      position="fixed"
      top={0}
      backdropFilter="saturate(180%) blur(20px)"
      borderBottom="1px solid rgba(0, 0, 0, .16)"
    >
      <Flex w="100%" maxW="1280px" align="center" justify="space-between">
        {/* Logo */}
        <Link to={Navigation.home}>
          <Heading
            size="lg"
            fontWeight="700"
            bgGradient="linear(90deg, #94a3b8, #6ee7b7)"
            bgClip="text"
            color="transparent"
          >
            WeShop
          </Heading>
        </Link>

        {/* Menu items */}
        <HStack gap={2}>
          {menuItems.map((item, index) => (
            <Box key={index}>
              <Link to={item.to}>
                <IconButton
                  variant="ghost"
                  aria-label={typeof item.label === "string" ? item.label : "menu-item"}
                  h="64px"
                  px="16px"
                  color="gray.700"
                  onClick={item.onClick}
                  _hover={{
                    borderBottom: "2px solid rgba(0,0,0,0.3)",
                    bg: "transparent",
                  }}
                >
                  {item.label}
                </IconButton>
              </Link>
            </Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}

export function GlobalNavBar() {
  return (
    <Nav>
      <NavBarInner>
        <AdminButton />
        <NavCartButton />
        <NavProfilButton />
        <NavLoginButton />
      </NavBarInner>
    </Nav>
  );
}

export function GlobalNavBarProfil() {
  return (
    <Nav>
      <NavBarInner>
        <NavCartButton />
        <NavLogoutButton />
      </NavBarInner>
    </Nav>
  );
}

function Nav({ children }: PropsWithChildren) {
  return (
    <Flex
      as="nav"
      justifyContent="center"
      alignItems="center"
      background="global-navbar-bg-color"
      width="100%"
      height="global-navbar-height"
      zIndex="global-navbar-z-index"
      position="fixed"
      top={0}
      backdropFilter="saturate(180%) blur(20px)"
      borderBottom="1px solid rgba(0, 0, 0, .16)"
    >
      {children}
    </Flex>
  );
}
