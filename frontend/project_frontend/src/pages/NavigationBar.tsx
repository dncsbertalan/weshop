import { Navigation } from "@/models/Navigation";
import { Flex, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router";
import { Filters } from "./main-page/Filters";

export function NavigationBar() {
    return (
        <Flex as="nav" bg="green.500" p={4} color="white" align="center" w="100%">
            <Link to={Navigation.home}>
                <Heading size="xl">WeShop</Heading>
            </Link>

            <Spacer />
            
            <HStack>
                <Filters></Filters>
                <Link to={Navigation.shoppingCart}>
                    <IconButton
                        aria-label="Shopping cart"
                        variant="ghost"
                        color="teal"
                        rounded="full"
                        size="md"
                    >
                        <LuShoppingCart />
                    </IconButton>
                </Link>

                <Link to={Navigation.profile}>
                    <IconButton
                        aria-label="Profil"
                        variant="ghost"
                        color="teal"
                        rounded="full"
                        size="md"
                    >
                        <FaPowerOff />
                    </IconButton>
                </Link>
            </HStack>
        </Flex>
    );
}