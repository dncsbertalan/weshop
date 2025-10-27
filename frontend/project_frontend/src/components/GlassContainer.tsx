import { Stack, StackProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function GlassContainer({ children }: PropsWithChildren & StackProps) {
  return (
    <Stack
      background="whiteAlpha.800"
      backdropFilter="blur(20px) saturate(180%)"
      rounded="3xl"
      padding={3}
      shadow="md"
      borderColor="border"
      borderStyle="solid"
      borderWidth={1}
    >
      {children}
    </Stack>
  );
}
