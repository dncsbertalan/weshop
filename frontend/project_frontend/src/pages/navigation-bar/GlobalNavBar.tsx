import { Flex } from "@chakra-ui/react";
import { NavBarInner } from "./NavBarInner";

export function GlobalNavBar() {
    return (
        <Flex
            as="nav"
            justifyContent="center"
            alignItems="center"
            background="whiteAlpha.800"
            width="100%"
            height="77px" // 77     apple 44px
            zIndex={10_000}
            position="fixed"
            top={0}
            //shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="saturate(180%) blur(20px)"
        >
            <NavBarInner />
        </Flex>
    );
}