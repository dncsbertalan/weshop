
import { useProduct } from "@/context/productContext";
import { Accordion, Checkbox, Fieldset, Flex, For, Span } from "@chakra-ui/react";

export function FiltersSection() {
    const { categories, selectedCategories, toggleCategory } = useProduct();
    
    return (
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
        >
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
        </Flex>
    );
}