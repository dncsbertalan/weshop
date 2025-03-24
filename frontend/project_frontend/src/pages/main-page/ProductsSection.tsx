import { ProductCard } from "@/components/product/ProductCard";
import { Flex, SimpleGrid, For, Button } from "@chakra-ui/react";
import { ProductSectionLoading } from "./ProductSectionLoading";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productApi";
import { ProductsSectionError } from "./ProductsSectionError";
import { Toaster, toaster } from "@/components/ui/toaster";

export function ProductSection() {
    const {
        isPending,
        isError,
        data: products
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });
    //{/*<Link to={`/product/${item.id}`} key={item.id}>*/}

    return (
        <Flex
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
                    <For each={products}>
                        {(item) => (
                            <ProductCard product={item} key={item.id} />
                        )}
                    </For>
                )}
            </SimpleGrid>
        </Flex>
    );
}