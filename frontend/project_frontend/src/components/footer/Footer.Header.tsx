import { Text } from "@chakra-ui/react";

interface FooterHeaderProps {
  headerText: string;
}

export function FooterHeader({ headerText }: FooterHeaderProps) {
  return (
    <Text fontWeight="600" color="white">
      {headerText}
    </Text>
  );
}
