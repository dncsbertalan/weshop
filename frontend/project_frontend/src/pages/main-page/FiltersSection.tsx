import { Category } from "@/models/Category";
import { Accordion, Checkbox, CheckboxGroup, Fieldset, Flex, For, Span } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "http://localhost:5220";

async function fetchCategories() {
    const response = await fetch(`${BASE_URL}/api/categories`);
    //return (await response.json());
    return (await response.json()) as Category[];
}

export function FiltersSection() {

    const {
        //isPending,
        //isError,
        data: categories
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>(["s", "h"]);
    
    return (
        <Flex
            background="whiteAlpha.500"
            padding={3}
            borderRadius={10}
            minWidth={250}
            maxHeight={300}
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

                            <CheckboxGroup
                                value={selectedCategories}
                                onChange={(values) => console.log(values) /*setSelectedCategories(values as string[])*/}
                            >
                                <Fieldset.Root>
                                    <Fieldset.Legend />
                                    <Fieldset.Content>
                                        <For each={categories}>
                                            {(category) => (
                                                <Checkbox.Root key={category.id} value={category.name}>
                                                    <Checkbox.HiddenInput />
                                                    <Checkbox.Control />
                                                    <Checkbox.Label>{category.name}</Checkbox.Label>
                                                </Checkbox.Root>
                                            )}
                                        </For>
                                    </Fieldset.Content>
                                </Fieldset.Root>
                            </CheckboxGroup>

                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </Flex>
    );
}