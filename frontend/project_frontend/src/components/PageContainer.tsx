import { Flex, Spacer } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

import { Footer } from "./footer/Footer";
import { NavigationBar } from "./navigation/NavigationBar";
import { NavigationBarFiller } from "./navigation/NavigationBar.Filler";

interface PageContainerProps extends PropsWithChildren {
  bgColor?: boolean;
  noFooter?: boolean;
}

export function PageContainer({ children, noFooter, bgColor }: PageContainerProps) {
  return (
    <Flex
      direction="column"
      width="100%"
      height="100vh"
      alignItems="center"
      backgroundColor={bgColor ? "bg-color" : undefined}
    >
      <NavigationBar />
      <NavigationBarFiller />
      <Flex direction="column" alignItems="center" width="100%" height={noFooter ? "100%" : undefined}>
        <Flex direction="column" width="100%" maxWidth="global-max-window-size" height="100%" paddingX={5}>
          {children}
        </Flex>
      </Flex>
      {!noFooter && (
        <React.Fragment>
          <Spacer />
          <Footer />
        </React.Fragment>
      )}
    </Flex>
  );
}
