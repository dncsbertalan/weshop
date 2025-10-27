import { useProduct } from "@/context/ProductContext";
import { Checkbox, Flex, For } from "@chakra-ui/react";

export function CategorySelection() {
  const { categories, selectedCategories, toggleCategory } = useProduct();

  return (
    <Flex flexDirection="column" gap="12px">
      <For each={categories}>
        {(category) => (
          <Checkbox.Root
            key={category.id}
            checked={selectedCategories.includes(category.id)}
            onChange={() => toggleCategory(category.id)}
            backgroundImage={
              selectedCategories.includes(category.id)
                ? "linear-gradient(135deg, #f4fff6 0%, #e2f5e7 40%, #cfe9d8 100%)"
                : ""
            }
            rounded="full"
            padding="4px 10px 4px 4px"
            border={selectedCategories.includes(category.id) ? "1px solid #cfe9d8" : ""}
            width="fit-content"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control
            //rounded="full"
            />
            <Checkbox.Label truncate={false}>{category.name}</Checkbox.Label>
          </Checkbox.Root>
        )}
      </For>
    </Flex>
  );
}
