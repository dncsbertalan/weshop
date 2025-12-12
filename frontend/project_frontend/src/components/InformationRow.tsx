import { Flex, Text } from "@chakra-ui/react";

interface InformationRowProps {
  label: string;
  value: string;
  bold?: boolean;
}

export function InformationRow({ label, value, bold }: InformationRowProps) {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Text lineHeight="moderate" fontSize="md" fontWeight={bold ? "bold" : undefined}>
        {label}
      </Text>
      <Text lineHeight="moderate" fontSize="lg">
        {value}
      </Text>
    </Flex>
  );
}
