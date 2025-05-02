import { ProductCard } from "@/components/product/ProductCard";
import { Flex, SimpleGrid, For, Pagination, ButtonGroup, IconButton, EmptyState, VStack } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect } from "react";
import { useProduct } from "@/context/productContext";
import { BiError } from "react-icons/bi";
import { SkeletonProductCard } from "@/components/product/SkeletonProductCard";

export function ProductSection() {
    const { products, productsIsError: isError, productsIsPending: isPending, page, pageSize, setPage } = useProduct();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            borderRadius="30px"
            padding="20px"
            //backgroundColor="whiteAlpha.800"
            width="fit-content"
            height="100%"
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
        //backdropFilter="saturate(180%) blur(20px)"
        >
            <Toaster />

            <SimpleGrid
                columns={{ base: 1, md: 2, "grid-3-col-bp": 3 }}
                gap="20px"
                height="100%" 
                alignItems="stretch"
            >
                {isError &&
                    <ProductsSectionError />}

                {isPending &&
                    <ProductSectionLoading />
                }

                {!isPending && (
                    <For each={products?.items}>
                        {(item, index) => (
                            <ProductCard product={item} key={index} />
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

function ProductsSectionError() {
    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <BiError />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>Something went wrong</EmptyState.Title>
                    <EmptyState.Description>
                        We couldn't load the products. Please try again later.
                    </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}

function ProductSectionLoading() {
    return (
        <For each={[1, 2, 3, 4]}>
            {(id) => <SkeletonProductCard key={id} />}
        </For>
    );
}