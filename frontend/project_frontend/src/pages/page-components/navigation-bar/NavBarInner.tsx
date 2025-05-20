import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Navigation } from "@/routes/navigation";
import { Badge, Flex, Float, Heading, HStack, IconButton, Image, Spacer, Span } from "@chakra-ui/react";
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
                <Heading size="3xl" fontWeight="700"
                    //backgroundImage="linear-gradient(to right, teal, purple)" 
                    //backgroundImage="linear-gradient(90deg, #a78bfa, #5eead4)" 
                    backgroundImage="linear-gradient(90deg, #94a3b8, #6ee7b7)"
                    color="transparent" backgroundClip="text" textShadow="0 1px 2px rgba(0,0,0,0.08)"
                >
                    <Span fontFamily="Pacifico, cursive">We</Span>
                    Shop
                </Heading>
            </Link>
            <Image
                //src="./src/assets/logo.png"
                height="200px"
            />

            <Spacer />

            <HStack gap="0px">
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
                size="md"
                height="global-navbar-height" rounded="0px" color="gray.700" backgroundColor= "transparent" padding="0px 10px"
                _hover={{backgroundColor: "transparent", borderBottom: "1px solid rgba(0, 0, 0, .35)", color: "black"}}
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
                size="md"
                height="global-navbar-height" rounded="0px" color="gray.700" backgroundColor= "transparent" padding="0px 10px"
                _hover={{backgroundColor: "transparent", borderBottom: "1px solid rgba(0, 0, 0, .35)", color: "black"}}
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
                    size="md"
                    height="global-navbar-height" rounded="0px" color="gray.700" backgroundColor= "transparent" padding="0px 10px"
                    _hover={{backgroundColor: "transparent", borderBottom: "1px solid rgba(0, 0, 0, .35)", color: "black"}}
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
                    size="md"
                    height="global-navbar-height" rounded="0px" color="gray.700" backgroundColor= "transparent" padding="0px 10px"
                    _hover={{backgroundColor: "transparent", borderBottom: "1px solid rgba(0, 0, 0, .35)", color: "black"}}
                >
                    <MdOutlineShoppingCart />
                    Cart
                    {cart && cart.cartItems.length > 0 && <Float offsetY="12px" offsetX="8px" /*offsetY="4px" offsetX="4px"*/>
                        <Badge backgroundColor="red" color="white" rounded="full">
                            {cart?.cartItems.length}
                        </Badge>
                    </Float>}
                </IconButton>
            </Link>
        );
    }

    return null;
};
