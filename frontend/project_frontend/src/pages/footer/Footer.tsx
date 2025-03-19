import { Navigation } from "@/models/Navigation";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export function Footer() {
    return (
        <Flex
            background="gray.500"
            //backgroundColor="rgb(245, 245, 247)"
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
                maxWidth="1200px"
                paddingTop="10px"
                borderTop="1px solid white"
            >
                <VStack>
                    <Link to={Navigation.home}>
                        <Text color="white">
                            Main page
                        </Text></Link>
                    <Text color="white">
                        All rights reserved.
                    </Text>
                </VStack>
            </Flex>
        </Flex>
    );
}