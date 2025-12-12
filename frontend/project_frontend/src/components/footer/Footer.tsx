import { Container, HStack, IconButton, Link as ChakraLink, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { Link as RouterLink } from "react-router";

import bgImage from "@/assets/paper-texture.webp";
import { Navigation } from "@/routes/navigation";

import { useColorModeValue } from "../ui/color-mode";
import { FooterHeader } from "./Footer.Header";
import { FooterOption } from "./Footer.Option";

export function Footer() {
  const textMuted = useColorModeValue("fg-muted", "fg-subtle");
  const separator = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  return (
    <Stack width="full" padding={4} alignItems="center">
      <Stack
        as="footer"
        width="100%"
        position="relative"
        //backgroundColor="#030302"
        backgroundImage="linear-gradient(90deg, #94a3b8, #6ee7b7)"
        rounded="3xl"
      >
        <Stack
          position="absolute"
          width="100%"
          height="100%"
          backgroundImage={`url(${bgImage})`}
          backgroundSize="1192px 843px"
          backgroundRepeat="repeat"
          backgroundPosition="left top"
          mixBlendMode="screen"
          opacity={0.99}
        />
        <Container maxW="global-max-window-size" py={{ base: 8, md: 12 }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={8}
            justify="space-between"
            align="flex-start"
            wrap="wrap"
          >
            <VStack align="flex-start" gap={2} maxW={{ base: "100%", md: "360px" }}>
              <ChakraLink asChild>
                <RouterLink to={Navigation.home}>
                  <FooterHeader headerText="WeShop" />
                </RouterLink>
              </ChakraLink>

              <FooterOption optionString="Stay connected while shopping." />

              <Text fontSize="sm" color={textMuted} />
            </VStack>

            <VStack align="flex-start" gap={1} minW={{ base: "100%", md: "160px" }}>
              <FooterHeader headerText="Explore" />
              <FooterOption navigation={Navigation.home} optionString="Shop" />
              <FooterOption navigation={Navigation.home} optionString="About" />
              <FooterOption navigation={Navigation.home} optionString="Contact" />
            </VStack>

            <VStack align="flex-start" gap={2}>
              <FooterHeader headerText="Connect" />
              <HStack gap={2}>
                <IconButton asChild rel="noopener noreferrer" variant="ghost" size="sm" colorPalette="fg">
                  <a href="https://linkedin.com/">
                    <LuLinkedin size={18} color="white" />
                  </a>
                </IconButton>

                <IconButton asChild rel="noopener noreferrer" variant="ghost" size="sm" colorPalette="fg">
                  <a href="https://github.com/">
                    <LuGithub size={18} color="white" />
                  </a>
                </IconButton>

                <IconButton asChild variant="ghost" size="sm" colorPalette="fg">
                  <a href="mailto:info@weshop.com">
                    <LuMail size={18} color="white" />
                  </a>
                </IconButton>
              </HStack>
            </VStack>
          </Stack>

          <Separator my={6} borderColor={separator} />

          <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={4}>
            <FooterOption fontSize="sm" optionString={`© ${new Date().getFullYear()} WeShop. All rights reserved.`} />

            <HStack gap={4}>
              <FooterOption navigation={Navigation.home} optionString="Terms" />
              <FooterOption navigation={Navigation.home} optionString="Privacy" />
            </HStack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
}
