import { Flex } from "@chakra-ui/react";
import {
  AdminButton,
  NavBarInner,
  NavCartButton,
  NavLoginButton,
  NavLogoutButton,
  NavProfilButton,
} from "./NavBarInner";
import { PropsWithChildren } from "react";

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
