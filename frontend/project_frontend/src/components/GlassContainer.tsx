import { Stack, StackProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function GlassContainer({ children }: PropsWithChildren & StackProps) {
  return (
    <Stack
      background="whiteAlpha.800"
      backdropFilter="blur(10px) saturate(180%)"
      rounded="3xl"
      padding={3}
      shadow="md"
      borderColor="rgba(0,0,0,.05)"
      borderStyle="solid"
      borderWidth={1}
    >
      {children}
    </Stack>
  );
}
