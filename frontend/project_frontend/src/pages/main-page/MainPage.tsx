import { ProductCard } from "@/components/product/ProductCard";
import { Center, Flex, For, SimpleGrid, Spacer } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { Filters } from "./Filters";
import { getProducts } from "@/api/productApi";
import { NavBarFiller } from "../navigation-bar/NavBarFiller"
import { GlobalNavBar } from "../navigation-bar/GlobalNavBar";
import { SkeletonProductCard } from "@/components/product/SkeletonProductCard";

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
            <GlobalNavBar />
            <NavBarFiller />

            <Center backgroundColor="#EAEAEA">
                <Flex
                    padding={5}
                    gap={10}
                >
                    <Filters />

                    {/* Product cards */}
                    <Flex
                        borderRadius={15}
                        padding="20px"
                        backgroundColor="whiteAlpha.800"
                        width="100%"
                        shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
                        backdropFilter="saturate(180%) blur(20px)"
                    >
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

                            {!isPending && (
                                <>
                                    <SkeletonProductCard />
                                    <For each={products}>
                                        {(item) => (
                                            <ProductCard product={item} />
                                        )}
                                    </For>
                                </>)}
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}