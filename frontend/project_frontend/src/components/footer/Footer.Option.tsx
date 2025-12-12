import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

interface FooterOptionProps {
  navigation?: string;
  fontSize?: string;
  optionString: string;
}

export function FooterOption({ navigation, fontSize, optionString }: FooterOptionProps) {
  if (!navigation) {
    return (
      <Text color="white" fontSize={fontSize}>
        {optionString}
      </Text>
    );
  }

  return (
    <ChakraLink asChild color="white" fontSize={fontSize}>
      <RouterLink to={navigation}>{optionString}</RouterLink>
    </ChakraLink>
  );
}
