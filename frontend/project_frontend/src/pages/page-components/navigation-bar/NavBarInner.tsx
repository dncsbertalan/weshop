import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { Navigation } from "@/routes/navigation";
import { Badge, Flex, Float, Heading, HStack, IconButton, Image, Spacer } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router";

export function NavBarInner({ children }: PropsWithChildren) {
    return (
        <Flex
            align="center"
            // apple 1024px
            width="global-max-window-size"
            maxWidth="global-max-window-size"
            height="global-navbar-height"
            margin="0px 20px"
        >
            <Link to={Navigation.home}>
                <Heading size="xl">WeShop</Heading>
            </Link>
            <Image
                //src="./src/assets/logo.png"
                height="200px"
            />

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


                {children}

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

export function NavLoginButton() {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return null;
    }

    return (
        <Link to={Navigation.login}>
            <IconButton
                aria-label="Login"
                variant="ghost"
                rounded="full"
                size="md"
            >
                <FaRightToBracket />
                Login
            </IconButton>
        </Link>
    );
};

export function NavLogoutButton() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Link to={Navigation.login}>
            <IconButton
                aria-label="Login"
                variant="ghost"
                rounded="full"
                size="md"
                onClick={() => {
                    logout();
                    navigate(Navigation.home);
                }}
            >
                <FaRightToBracket />
                Logout
            </IconButton>
        </Link>
    );
};

export function NavProfilButton() {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return (
            <Link to={Navigation.profile}>
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
            </Link>
        );
    }

    return null;
};

export function NavCartButton() {
    const { isAuthenticated } = useAuth();
    const { cart } = useCart();

    if (isAuthenticated) {
        return (
            <Link to={Navigation.shoppingCart}>
                <IconButton
                    aria-label="Shopping cart"
                    variant="ghost"
                    rounded="full"
                    size="md"
                    padding={2}
                >
                    <MdOutlineShoppingCart />
                    Cart
                    {cart.cartItems.length > 0 && <Float offsetY="4px" offsetX="4px">
                        <Badge backgroundColor="red" color="white" rounded="full">
                            {cart.cartItems.length}
                        </Badge>
                    </Float>}
                </IconButton>
            </Link>
        );
    }

    return null;
};
