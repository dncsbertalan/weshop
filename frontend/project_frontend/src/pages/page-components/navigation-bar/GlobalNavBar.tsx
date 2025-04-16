import { Flex } from "@chakra-ui/react";
import { NavBarInner } from "./NavBarInner";

export function GlobalNavBar() {
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
        >
            <NavBarInner />
        </Flex>
    );
}