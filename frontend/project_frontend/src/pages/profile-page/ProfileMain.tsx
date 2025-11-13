import { Flex, Spacer, Text,VStack } from "@chakra-ui/react";

import { Footer } from "@/components/footer/Footer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";

import { GlobalNavBarProfil } from "../page-components/navigation-bar/GlobalNavBar";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { OrdersSection } from "./OrdersSection";

export function ProfileMain() {
  const { user } = useAuthentication();

  return (
    <Flex direction="column" minHeight="100vh">
      <GlobalNavBarProfil />
      <NavBarFiller />

      <Flex
        justifyContent="center"
        width="100%"
        margin="0px 20px"
        minHeight="calc(100vh - var(--chakra-sizes-global-navbar-height))"
      >
        <VStack maxWidth="global-max-window-size" width="100%" padding="20px 0px">
          <Flex
            //padding={5}
            gap={10}
            //flexDirection="column"
          >
            <Text fontSize="25px" lineHeight="28px">
              Hello, {user?.firstName} {user?.lastName}!
            </Text>

            <ColorModeButton />
          </Flex>

          <OrdersSection />
        </VStack>
      </Flex>

      <Spacer />

      <Footer />
    </Flex>
  );
}
