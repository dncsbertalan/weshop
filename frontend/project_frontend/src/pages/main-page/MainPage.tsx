import { ProductCard } from "@/reusable_components/product/ProductCard";
import { getFakeProducts } from "@/test_data/ProductList";
import { Box, Center, Flex, For, SimpleGrid } from "@chakra-ui/react";
import { NavigationBar } from "../NavigationBar";
import { Footer } from "../Footer";

export function MainPage() {

    const products = getFakeProducts();

    return (
        <Box>
            <NavigationBar />

            <Center background="purple">
                <Flex background="red.500" borderRadius={10} padding={5}>
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        columnGap="2"
                        rowGap="4"
                    >
                        <For each={products}>
                            {(item) => (
                                <ProductCard product={item} />
                            )}
                        </For>
                    </SimpleGrid>
                </Flex>
            </Center>

            <Footer></Footer>
        </Box>
    );
}