import { ProductCard } from "@/reusable_components/product/ProductCard";
import { getFakeProducts } from "@/test_data/ProductList";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { NavigationBar } from "../NavigationBar";
import { Footer } from "../Footer";

export function MainPage() {

    return (
        <Box>
            <NavigationBar />

            <Box background="red.100" borderRadius={10} padding={5}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}
                    columnGap="2"
                    rowGap="4"
                >
                    <ProductCard product={getFakeProducts()[0]} />
                    <ProductCard product={getFakeProducts()[1]} />
                    <ProductCard product={getFakeProducts()[2]} />
                    <ProductCard product={getFakeProducts()[3]} />
                    <ProductCard product={getFakeProducts()[4]} />
                    <ProductCard product={getFakeProducts()[5]} />
                    <ProductCard product={getFakeProducts()[6]} />
                    <ProductCard product={getFakeProducts()[7]} />
                    <ProductCard product={getFakeProducts()[8]} />
                    <ProductCard product={getFakeProducts()[9]} />
                    <ProductCard product={getFakeProducts()[10]} />
                    <ProductCard product={getFakeProducts()[11]} />
                    <ProductCard product={getFakeProducts()[12]} />
                    <ProductCard product={getFakeProducts()[13]} />
                    <ProductCard product={getFakeProducts()[14]} />
                </SimpleGrid>
            </Box>

            <Footer></Footer>
        </Box>
    );
}