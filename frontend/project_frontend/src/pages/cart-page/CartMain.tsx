import { Center, Flex, For, VStack, Box } from "@chakra-ui/react";
import { Footer } from "../Footer";
import { NavigationBar } from "../NavigationBar"
import { Cart } from "@/models/Cart";
import { getFakeProducts } from "@/test_data/ProductList";
import { ProductCardHorizontal } from "@/reusable_components/product/ProductCardHorizontal";

const cart: Cart = {
    id: 1,
    items: getFakeProducts(),
};

export function CartMain() {

    const total = cart.items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <NavigationBar />

            <Center background="purple">
                <Flex background="red.500" borderRadius={10} padding={5}>
                    <VStack>
                        <Box background="gray" padding={3}>
                            {total}
                        </Box>
                        <For each={cart.items}>
                            {(item) => (
                                <ProductCardHorizontal product={item} />
                            )}
                        </For>
                    </VStack>
                </Flex>
            </Center>

            <Footer />
        </div>
    );
}