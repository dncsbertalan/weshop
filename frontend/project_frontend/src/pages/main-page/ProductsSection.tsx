import { ProductCard } from "@/components/product/ProductCard";
import { Flex, SimpleGrid, For, Button, Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import { ProductSectionLoading } from "./ProductSectionLoading";
import { ProductsSectionError } from "./ProductsSectionError";
import { Toaster, toaster } from "@/components/ui/toaster";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect } from "react";
import { useProduct } from "@/context/productContext";
import { Reveal } from "@/animations/Reveal";

export function ProductSection() {
    //const { page, pageSize, setPage } = usePagination();

    const { products, productsIsError: isError, productsIsPending: isPending, page, pageSize, setPage } = useProduct();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    /*const {
        //isPending,
        //isError,
        //data: products
    } = useQuery({
        queryKey: ["products", page, pageSize],
        queryFn: () => getProducts(page, pageSize)
    });*/

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            borderRadius={18}
            padding="2rem"
            backgroundColor="whiteAlpha.800"
            width="100%"
            height="100%"
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="saturate(180%) blur(20px)"
        >
            <Toaster />
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    toaster.create({
                        description: "File saved successfully",
                        type: "info",
                    })
                }
            >
                Show Toast
            </Button>

            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap="1.5rem"
                width="100%"
                height="100%"
            >
                {isError &&
                    <ProductsSectionError />}

                {isPending &&
                    <ProductSectionLoading />
                }

                {!isPending && (
                    <For each={products?.items}>
                        {(item) => (
                            <Reveal>
                                <ProductCard product={item} key={item.id} />
                            </Reveal>
                        )}
                    </For>
                )}
            </SimpleGrid>

            {!isPending && !isError &&
                <Pagination.Root
                    count={products?.totalItems}
                    pageSize={pageSize}
                    defaultPage={1}
                    page={page}
                    onPageChange={(details) => { setPage(details.page) }}
                    marginTop={5}
                >
                    <ButtonGroup variant="ghost" size="sm" rounded="full">
                        <Pagination.PrevTrigger asChild>

                            <IconButton borderLeftRadius="9999px">
                                <LuChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                            render={(page) => (
                                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                    {page.value}
                                </IconButton>
                            )}
                        />

                        <Pagination.NextTrigger asChild>
                            <IconButton borderRightRadius="9999px">
                                <LuChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>

                    </ButtonGroup>
                </Pagination.Root>}
        </Flex>
    );
}