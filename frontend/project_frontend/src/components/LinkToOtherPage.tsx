import { Link as ChakraLink, Text, TextProps } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";

interface LinkToOtherPageProps {
  navigateTo: string;
  label: string;
  icon?: React.ReactNode;
  textProps?: TextProps;
}

export function LinkToOtherPage({ label, navigateTo, icon, textProps }: LinkToOtherPageProps) {
  return (
    <ChakraLink asChild>
      <Link to={navigateTo}>
        <Text {...textProps}>{label}</Text>
        {icon}
      </Link>
    </ChakraLink>
  );
}
