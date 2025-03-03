import { ProductCard } from "@/reusable_components/product/ProductCard";
//import { getFakeProducts } from "@/test_data/ProductList";
import { Box, Center, Flex, For, SimpleGrid, Spacer } from "@chakra-ui/react";
import { NavigationBar } from "../NavigationBar";
import { Footer } from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/models/Product";
import { Filters } from "./Filters";

const BASE_URL = "http://localhost:5220";

async function fetchProducts() {
    const response = await fetch(`${BASE_URL}/api/products`);
    //return (await response.json());
    return (await response.json()) as Product[];
}

export function MainPage() {

    //const products = getFakeProducts();
    //const queryClient = useQueryClient()

    const {
        isPending,
        isError,
        data: products
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    });

    //console.log(products);

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <NavigationBar />

            <Center background="purple">

                <Flex
                    padding={5}
                    gap={10}
                >
                    <Filters />

                    {/* Product cards */}
                    <Flex background="red.500" borderRadius={15} padding={5}>
                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            columnGap="4"
                            rowGap="4"
                        >
                            {isError && <div>
                                ERROR VAN
                            </div>}

                            {isPending && <div>
                                Loading...
                            </div>}

                            {!isPending &&
                                <For each={products}>
                                    {(item) => (
                                        <ProductCard product={item} />
                                    )}
                                </For>}
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}