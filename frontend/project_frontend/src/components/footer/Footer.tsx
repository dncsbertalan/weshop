import {
  Box,
  Container,
  HStack,
  IconButton,
  Link as ChakraLink,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { Link as RouterLink } from "react-router";

import { Navigation } from "@/routes/navigation";

import { useColorModeValue } from "../ui/color-mode";

export function Footer() {
  const bg = useColorModeValue("rgba(255,255,255,0.72)", "rgba(10,12,16,0.6)");
  const textMuted = useColorModeValue("fg-muted", "fg-subtle");
  const separator = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  return (
    <Box
      as="footer"
      width="100%"
      bg={bg}
      style={{ backdropFilter: "blur(12px)" }}
      borderTopWidth="1px"
      borderTopColor={separator}
    >
      <Container maxW="global-max-window-size" py={{ base: 8, md: 12 }}>
        <Stack direction={{ base: "column", md: "row" }} gap={8} justify="space-between" align="flex-start" wrap="wrap">
          <VStack align="flex-start" gap={2} maxW={{ base: "100%", md: "360px" }}>
            <ChakraLink asChild>
              <RouterLink to={Navigation.home} aria-label="Go to WeShop home">
                <Text fontSize="xl" fontWeight="700">
                  WeShop
                </Text>
              </RouterLink>
            </ChakraLink>

            <Text fontSize="sm" color={textMuted}>
              Sustainable shopping made elegant — curated zero-waste products with a glassy, premium feel.
            </Text>
          </VStack>

          <VStack align="flex-start" gap={1} minW={{ base: "100%", md: "160px" }}>
            <Text fontWeight="600">Explore</Text>

            <ChakraLink asChild>
              <RouterLink to={Navigation.home}>Home</RouterLink>
            </ChakraLink>

            <ChakraLink asChild>
              <RouterLink to={Navigation.home}>Shop</RouterLink>
            </ChakraLink>

            <ChakraLink asChild>
              <RouterLink to={Navigation.home}>About</RouterLink>
            </ChakraLink>

            <ChakraLink asChild>
              <RouterLink to={Navigation.home}>Contact</RouterLink>
            </ChakraLink>
          </VStack>

          <VStack align="flex-start" gap={2}>
            <Text fontWeight="600">Connect</Text>
            <HStack gap={2}>
              <IconButton
                asChild
                rel="noopener noreferrer"
                aria-label="Open LinkedIn"
                variant="ghost"
                size="sm"
                colorPalette="gray"
              >
                <a href="https://linkedin.com/">
                  <LuLinkedin size={18} />
                </a>
              </IconButton>

              <IconButton
                asChild
                rel="noopener noreferrer"
                aria-label="Open GitHub"
                variant="ghost"
                size="sm"
                colorPalette="gray"
              >
                <a href="https://github.com/">
                  <LuGithub size={18} />
                </a>
              </IconButton>

              <IconButton asChild aria-label="Email WeShop" variant="ghost" size="sm" colorPalette="gray">
                <a href="mailto:info@weshop.com">
                  <LuMail size={18} />
                </a>
              </IconButton>
            </HStack>
          </VStack>
        </Stack>

        <Separator my={6} borderColor={separator} />

        <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={4}>
          <Text fontSize="sm" color={textMuted}>
            © {new Date().getFullYear()} WeShop. All rights reserved.
          </Text>

          <HStack gap={4}>
            <ChakraLink asChild>
              <RouterLink to={Navigation.home}>Terms</RouterLink>
            </ChakraLink>

            <ChakraLink asChild>
              <RouterLink to={Navigation.home}>Privacy</RouterLink>
            </ChakraLink>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
