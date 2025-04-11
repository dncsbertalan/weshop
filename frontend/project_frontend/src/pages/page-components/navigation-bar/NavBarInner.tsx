import { ColorModeButton } from "@/components/ui/color-mode";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { Navigation } from "@/routes/navigation";
import { Badge, Flex, Float, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export function NavBarInner() {
    const { isAuthenticated } = useAuth();
    const { cart } = useCart();

    return (
        <Flex
            align="center"
            // apple 1024px
            width="8xl"
            maxWidth="8xl"
            height="77px"
            margin="0px 2rem"
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

                <ColorModeButton />

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
                        {cart.cartItems && <Float offsetY="4px" offsetX="4px">
                            <Badge backgroundColor="red" color="white" rounded="full">
                                {cart.cartItems.length}
                            </Badge>
                        </Float>}
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
                        Login
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