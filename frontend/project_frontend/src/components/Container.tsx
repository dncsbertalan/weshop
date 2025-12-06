import { Stack, StackProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren, StackProps {}

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <Stack backgroundColor="bg" rounded="3xl" padding={4} shadow="xl" position="relative" {...rest}>
      {children}
    </Stack>
  );
}
