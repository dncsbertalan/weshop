import { Navigation } from "@/routes/navigation";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export function Footer() {
    return (
        <Flex
            backgroundColor="bg-color-footer"
            padding={5}
            justifyContent="center"
            alignItems="center"
            width="100%"
        >
            <Flex
                //backgroundColor="rgb(245, 245, 247)"
                justifyContent="flex-start"
                alignItems="center"
                width="100%"
                maxWidth="8xl"
                paddingTop="10px"
                borderTop="1px solid" borderTopColor="footer-separator-color"
            >
                <VStack alignItems="flex-start">
                    <Link to={Navigation.home}>
                        <Text color="black">
                            Main page
                        </Text></Link>
                    <Text color="black">
                        All rights reserved.
                    </Text>
                </VStack>
            </Flex>
        </Flex>
    );
}