import { Navigation } from "@/models/Navigation";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export function Footer() {
    return (
        <Flex 
            background="gray.500"
            //backgroundColor="rgb(245, 245, 247)"
            padding={5}
            //paddingLeft={{ md: 50 }}
            //flexDirection="row-reverse"
            justifyContent="flex-start"
            alignItems="center"
            width="100%"
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
    );
}