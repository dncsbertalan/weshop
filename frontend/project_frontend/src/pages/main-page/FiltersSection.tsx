
import { useProduct } from "@/context/productContext";
import { Accordion, Box, Checkbox, Fieldset, Flex, For, HStack, Slider, SliderValueChangeDetails, Span, VStack } from "@chakra-ui/react";
import { useState } from "react";

export function FiltersSection() {
    return (
        <Box position="relative">
            <Flex
                background="whiteAlpha.500"
                padding={3}
                borderRadius={10}
                minWidth={250}
                height="min"
                //maxHeight={300}
                //pos="absolute"
                //border="1px solid rgba(255, 255, 255, 0.35)"
                shadow="2px 2px 10px 3px rgba(0, 0, 0, 0.2);"
                backdropFilter="blur(10px)"
                position="sticky"
                top="97px"
            >
                <VStack width="100%">
                    <PriceSelection />
                    <CategorySelection />
                </VStack>
            </Flex>
        </Box>
    );
}

function CategorySelection() {
    const { categories, selectedCategories, toggleCategory } = useProduct();

    return (
        <Accordion.Root multiple defaultValue={["b"]}>
            <Accordion.Item key={0} value={""}>
                <Accordion.ItemTrigger>
                    <Span flex="1">Categories</Span>
                    <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                    <Accordion.ItemBody>

                        {/* Categories */}

                        <Fieldset.Root>
                            <Fieldset.Legend />
                            <Fieldset.Content>
                                <For each={categories}>
                                    {(category) => (
                                        <Checkbox.Root key={category.id}
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => toggleCategory(category.id)}
                                        >
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control rounded="full" />
                                            <Checkbox.Label>{category.name}</Checkbox.Label>
                                        </Checkbox.Root>
                                    )}
                                </For>
                            </Fieldset.Content>
                        </Fieldset.Root>

                    </Accordion.ItemBody>
                </Accordion.ItemContent>
            </Accordion.Item>
        </Accordion.Root>
    );
}

function PriceSelection() {
    const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useProduct()
    const [min, setMin] = useState(1000);
    const [max, setMax] = useState(100_000);
    const onValueChange = (details: SliderValueChangeDetails) => {
        setMin(details.value[0]);
        setMax(details.value[1]);
    };
    const onValueChangeEnd = () => {
        if (min !== minPrice) setMinPrice(min);
        if (max !== maxPrice) setMaxPrice(max);
    };

    return (
        <Slider.Root
            maxW="md"
            width="100%"
            min={1000}
            max={100_000}
            defaultValue={[minPrice, maxPrice]}
            step={1000}
            minStepsBetweenThumbs={10}
            onValueChange={onValueChange}
            onValueChangeEnd={onValueChangeEnd}
        >
            <HStack justify="space-between">
                <Slider.Label>Price range</Slider.Label>
                <Slider.ValueText />
            </HStack>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
            </Slider.Control>
        </Slider.Root>
    );
}