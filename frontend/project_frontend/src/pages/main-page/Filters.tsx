import { Category } from "@/models/Category";
import { Button, For, MenuContent, MenuItem, MenuRadioItemGroup, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiSortAscending } from "react-icons/hi";

const BASE_URL = "http://localhost:5220";

async function fetchCategories() {
    const response = await fetch(`${BASE_URL}/api/categories`);
    //return (await response.json());
    return (await response.json()) as Category[];
}

export function Filters() {

    const [value, setValue] = useState("asc")

    const {
        //isPending,
        //isError,
        data: categories
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories
    });

    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Button variant="ghost" size="xl" background="white" borderRadius={10}>
                    <HiSortAscending /> Sort
                </Button>
            </MenuTrigger>
            <MenuContent minW="10rem">
                <MenuRadioItemGroup
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                >
                    <For each={categories}>
                        {(item: Category) => (
                            <MenuItem value={item.name}>{item.name}</MenuItem>
                        )}
                    </For>
                </MenuRadioItemGroup>
            </MenuContent>
        </MenuRoot>
    );
}