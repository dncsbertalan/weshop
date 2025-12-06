import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function NavigationBarWrapper({ children }: PropsWithChildren) {
  return (
    <Flex
      as="nav"
      justifyContent="center"
      alignItems="center"
      background="global-navbar-bg-color"
      width="100%"
      minHeight="global-navbar-height"
      zIndex="global-navbar-z-index"
      position="fixed"
      top={0}
      backdropFilter="saturate(180%) blur(20px)"
      borderBottom="1px solid rgba(0, 0, 0, .16)"
    >
      <Flex
        width="global-max-window-size"
        maxWidth="global-max-window-size"
        minHeight="global-navbar-height"
        marginX={5}
      >
        {children}
      </Flex>
    </Flex>
  );
}
