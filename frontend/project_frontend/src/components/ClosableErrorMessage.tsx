import { Flex, Text, TextProps } from "@chakra-ui/react";

interface ClosableErrorMessageProps {
  message: string;
  messageProps?: TextProps;
  icon?: React.ReactNode;
}

export function ClosableErrorMessage({ message, messageProps }: ClosableErrorMessageProps) {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      border="1px solid"
      borderColor="border.error"
      backgroundColor="bg.error"
      color="fg.error"
      rounded="5px"
      padding="5px"
    >
      <Text {...messageProps}>{message}</Text>
    </Flex>
  );
}
