import { Navigation } from "@/models/Navigation";
import { Flex, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router";

export function NavigationBar() {
    return (
        <Flex as="nav" bg="green.500" p={4} color="white" align="center" w="100%">
            <Link to={Navigation.home}>
                <Heading size="xl">WeShop</Heading>
            </Link>

            <Spacer />
            
            <HStack>
                <Link to={Navigation.shoppingCart}>
                    <IconButton
                        aria-label="Shopping cart"
                        variant="ghost"
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
                        rounded="full"
                        size="md"
                    >
                        <FaUser />
                    </IconButton>
                </Link>

                <Link to={Navigation.login}>
                    <IconButton
                        aria-label="Login"
                        variant="ghost"
                        rounded="full"
                        size="md"
                    >
                        <FaRightToBracket />
                    </IconButton>
                </Link>

                <Link to={Navigation.registration}>
                    <IconButton
                        aria-label="Registration"
                        variant="ghost"
                        rounded="full"
                        size="md"
                    >
                        <FaRightFromBracket />
                    </IconButton>
                </Link>
            </HStack>
        </Flex>
    );
}