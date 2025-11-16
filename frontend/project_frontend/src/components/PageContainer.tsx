import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { GlobalNavBar } from "@/pages/page-components/navigation-bar/GlobalNavBar";
import { NavBarFiller } from "@/pages/page-components/navigation-bar/NavBarFiller";

import { Footer } from "./footer/Footer";
import { Toaster } from "./ui/toaster";

interface PageContainerProps {
  cutFooter?: boolean;
}

export function PageContainer({ children, cutFooter }: PageContainerProps & PropsWithChildren) {
  return (
    <Flex direction="column" width="100%" height="100vh" alignItems="center" overflow="auto">
      <Toaster />
      <GlobalNavBar />
      <NavBarFiller />
      <Flex
        direction="column"
        alignItems="center"
        width="100%"
        minHeight={cutFooter ? "100%" : undefined}
        height={cutFooter ? undefined : "100%"}
      >
        <Flex direction="column" width="100%" maxWidth="global-max-window-size" height="100%" marginX={5}>
          {children}
        </Flex>
      </Flex>
      {/* <Spacer /> */}
      <Footer />
    </Flex>
  );
}
