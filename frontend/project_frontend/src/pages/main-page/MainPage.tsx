import { ProductCard } from "@/reusable_components/product/ProductCard";
import { Center, Flex, For, SimpleGrid, Spacer } from "@chakra-ui/react";
import { NavigationBar } from "../NavigationBar";
import { Footer } from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { Filters } from "./Filters";
import { getProducts } from "@/api/productApi";
import { NavBarFiller } from "../NavBarFiller"

export function MainPage() {

    const {
        isPending,
        isError,
        data: products
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <NavigationBar />
            <NavBarFiller />

            <Center background="purple">
                <Flex
                    padding={5}
                    gap={10}
                >
                    <Filters />

                    {/* Product cards */}
                    <Flex background="red.500" borderRadius={15} padding={5}>
                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 4 }}
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