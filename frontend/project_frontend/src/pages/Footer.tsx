import { Flex, Text } from "@chakra-ui/react";

export function Footer() {
    return (
        <Flex background="gray.500"
            padding={5}
            flexDirection="row-reverse"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Text color="white">
                FOOTER
            </Text>
        </Flex>
    );
}