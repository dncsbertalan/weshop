import { useAuth } from "@/context/AuthContext";
import { Navigation } from "@/routes/navigation";
import { Flex, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export function NavigationBar() {
  const { isAuthenticated } = useAuth();

  return (
    <Flex
      as="nav"
      background="whiteAlpha.800"
      //background="rgba(255, 100, 0, 0.3)"
      padding={4}
      color="black"
      align="center"
      width="100%"
      height="77px" // 77     apple 44px
      zIndex={1000}
      position="fixed"
      top={0}
      shadow="2px 2px 10px 3px rgba(0, 0, 0, 0.2);"
      backdropFilter="saturate(180%) blur(20px)"
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

        {isAuthenticated && (
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
            </IconButton>
          </Link>
        )}

        {isAuthenticated && (
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
        )}

        {!isAuthenticated && (
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
        )}

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
