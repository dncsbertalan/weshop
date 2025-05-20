import { Flex } from "@chakra-ui/react";
import { NavBarInner, NavCartButton, NavLoginButton, NavLogoutButton, NavProfilButton } from "./NavBarInner";
import { PropsWithChildren } from "react";

export function GlobalNavBar() {
    return (
        <Nav>
            <NavBarInner>
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
            //background="rgba(207, 233, 216, 0.8)"
            width="100%"
            height="global-navbar-height"     // apple 44px
            zIndex="global-navbar-z-index"
            position="fixed"
            //padding="0px 20px"
            top={0}
            //shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="saturate(180%) blur(20px)"

            // New addition
            borderBottom="1px solid rgba(0, 0, 0, .16)"
        >
            {children}
        </Flex>
    );
};