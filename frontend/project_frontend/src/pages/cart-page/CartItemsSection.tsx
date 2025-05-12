import { useCart } from "@/context/CartContext";
import { VStack, For, Flex, Button, EmptyState, Spinner, Box, Text, Menu, Portal, HStack } from "@chakra-ui/react";
import { Navigation } from "@/routes/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import { CartItemCard } from "@/components/product/CartItemCard";
import { useUser } from "@/context/UserContext";
import { CartInfo } from "@/models/cart";

export function CartItemsSection() {
    const { cart, cartIsPending, cartIsError } = useCart();

    if (cartIsError) {
        return (
            <CartItemSectionError />
        );
    }

    return (
        <Flex
            padding="0px 30px"
        >
            {cartIsPending && <CartItemSectionLoading />}

            {!cartIsPending &&
                <Box>
                    <HStack gap="30px" marginBottom="10px">
                        <CartInfoSec isShared={cart.isShared} />
                        <ChangeCart />
                    </HStack>
                    {cart.cartItems?.length === 0 ? (
                        <CartItemSectionEmpty />
                    ) : (
                        <Box borderTop="1px solid" borderTopColor="separator-color">
                            <VStack gap="0px">
                                <For each={cart?.cartItems}>
                                    {(item) => (
                                        <CartItemCard cartItem={item} key={item.id} />
                                    )}
                                </For>
                            </VStack>
                        </Box>
                    )}
                </Box>
            }

        </Flex>
    );
}

function ChangeCart() {
    const { user, switchCart } = useUser();

    if (!user?.carts.length) return null;

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button size="md" variant="outline" rounded="full">Change cart</Button>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.ItemGroup>
                            <Menu.ItemGroupLabel>Your cart</Menu.ItemGroupLabel>
                            <Menu.Item value="ownCart" onClick={() => { switchCart(user.cartId) }}>
                                {user?.firstName} {user?.lastName}
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.Separator />
                        <Menu.ItemGroup>
                            <Menu.ItemGroupLabel>Shared with you</Menu.ItemGroupLabel>
                            {user?.carts.map((cartItem, index) => {
                                return (
                                    <Menu.Item value={index.toString()} key={index} onClick={() => { switchCart(cartItem.cartId) }}>
                                        {cartItem.ownerFirstName} {cartItem.ownerLastName}
                                    </Menu.Item>
                                );
                            })}
                        </Menu.ItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}

function CartInfoSec({ isShared }: { isShared: boolean }) {
    const user = useUser();

    if (user.activeCartId == user.user?.cartId) {
        return (
            <Box>
                <Flex flexDirection="column" gap="6px">
                    <Text lineHeight="25px" fontSize="21px" fontWeight="500">Your cart</Text>
                </Flex>
                {isShared && <Text marginTop="6px" color="rgb(170, 170, 170)"
                    lineHeight="16px" fontSize="12px" fontWeight="400px" width="275px"
                >
                    Shared
                </Text>}
            </Box>
        );
    }

    const cartInfo = user.user?.carts.find(cart => cart.cartId == user.activeCartId);
    return (
        <Box>
            <Flex flexDirection="column" gap="6px">
                <Text lineHeight="25px" fontSize="21px" fontWeight="500">{cartInfo?.ownerFirstName} {cartInfo?.ownerLastName}'s cart</Text>
            </Flex>
            {isShared && <Text marginTop="6px" color="rgb(170, 170, 170)"
                lineHeight="16px" fontSize="12px" fontWeight="400px" width="275px"
            >
                Shared
            </Text>}
        </Box>
    );

    const ownCartInfo: CartInfo | undefined = (cartInfo === undefined && user.activeCartId == user.user?.cartId) ? {
        cartId: user.activeCartId!,
        ownerFirstName: user.user!.firstName!,
        ownerLastName: user.user!.lastName
    } : undefined;

    return (
        <Flex flexDirection="column" gap="6px" marginBottom="10px">
            <Text lineHeight="25px" fontSize="21px" fontWeight="500">Cart summary</Text>
            <Text color="rgb(130, 130, 130)" lineHeight="16px" fontSize="12px" fontWeight="400px">
                Owner: {cartInfo?.ownerFirstName} {cartInfo?.ownerLastName} {ownCartInfo?.ownerFirstName} {ownCartInfo?.ownerLastName}
            </Text>
        </Flex>
    );
};

function CartItemSectionLoading() {
    return (
        <Spinner
            size="xl"
            borderWidth="4px"
            css={{ "--spinner-track-color": "colors.gray.200" }}
        />
    );
}

function CartItemSectionEmpty() {
    return (
        <EmptyState.Root
            size="lg"
            backgroundColor="whiteAlpha.800"
            backdropFilter="saturate(180%) blur(20px)"
            borderRadius={18}
            width="500px"
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
        >
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <MdOutlineShoppingCart />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>Your cart is empty</EmptyState.Title>
                    <EmptyState.Description>
                        Explore our products and add items to your cart
                    </EmptyState.Description>
                </VStack>
                <Link to={Navigation.home}>
                    <Button rounded="full">See products</Button>
                </Link>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}

function CartItemSectionError() {
    return (
        <div>ERROR IN THE CART</div>
    );
}