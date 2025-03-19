import { useAuth } from "@/context/authContext";
import { Navigation } from "@/models/Navigation";
import { Flex, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export function NavBarInner() {
    const { isAuthenticated } = useAuth();

    return (
        <Flex
            align="center"
            width="1024px"
            maxWidth="1024px"
            height="77px"
        >
            <Link to={Navigation.home}>
                <Heading size="xl">WeShop</Heading>
            </Link>

            <Spacer />

            <HStack>
                {/*<IconButton
                    aria-label="Shopping cart"
                    variant="ghost"
                    rounded="full"
                    size="md"
                    onClick={createCart}
                >
                    <LuPlus />
                </IconButton>*/}

                {isAuthenticated && <Link to={Navigation.shoppingCart}>
                    <IconButton
                        aria-label="Shopping cart"
                        variant="ghost"
                        rounded="full"
                        size="md"
                        padding={2}
                    >
                        <MdOutlineShoppingCart />
                        Cart
                    </IconButton>
                </Link>}

                {isAuthenticated && <Link to={Navigation.profile}>
                    <IconButton
                        aria-label="Profil"
                        variant="ghost"
                        rounded="full"
                        size="md"
                        padding={2}
                    >
                        <FaUser />
                        Profil
                    </IconButton>
                </Link>}

                {!isAuthenticated && <Link to={Navigation.login}>
                    <IconButton
                        aria-label="Login"
                        variant="ghost"
                        rounded="full"
                        size="md"
                    >
                        <FaRightToBracket />
                    </IconButton>
                </Link>}

                {/*<Link to={Navigation.registration}>
                    <IconButton
                        aria-label="Registration"
                        variant="ghost"
                        rounded="full"
                        size="md"
                    >
                        <FaRightFromBracket />
                    </IconButton>
                </Link>*/}
            </HStack>
        </Flex>
    );
}