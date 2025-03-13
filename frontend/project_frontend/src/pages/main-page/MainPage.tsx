import { ProductCard } from "@/reusable_components/product/ProductCard";
//import { getFakeProducts } from "@/test_data/ProductList";
import { Button, Center, Flex, For, SimpleGrid, Spacer } from "@chakra-ui/react";
import { NavigationBar } from "../NavigationBar";
import { Footer } from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/models/Product";
import { Filters } from "./Filters";
import axios from "axios";

const BASE_URL = "http://localhost:5220";

async function fetchProducts() {
    const response = await fetch(`${BASE_URL}/api/products`);
    //return (await response.json());
    return (await response.json()) as Product[];
}

const apiUrl = "/api/authentication/hello";
async function authTest() {
    const token = JSON.parse(localStorage.getItem("token") ?? "ERROR");
    console.log(token);
    const response = await axios.get(apiUrl, {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    console.log(response.data);
    return response.data;
}

export function MainPage() {

    const {
        isPending,
        isError,
        data: products
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    });

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
                            columns={{ base: 1, md: 3, lg: 4 }}
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