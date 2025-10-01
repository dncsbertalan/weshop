import { Footer } from "@/pages/page-components/footer/Footer";
import { GlobalNavBar } from "@/pages/page-components/navigation-bar/GlobalNavBar";
import { NavBarFiller } from "@/pages/page-components/navigation-bar/NavBarFiller";
import { Flex, Spacer } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" width="100%" height="100vh" alignItems="center">
      <GlobalNavBar />
      <NavBarFiller />
      <Flex width="100%" maxWidth="global-max-window-size">
        <Flex direction="column" marginX={5} width="100%" height="100%">
          {children}
        </Flex>
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
}
