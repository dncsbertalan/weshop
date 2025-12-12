import { Box, createListCollection, Field, Portal, Select, SelectTriggerProps, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import { floatingLabelStyles } from "@/theme/styles/floatingLabelStyle";

import { useProductFilters } from "../hooks/useProductFilters";
import { ProductFilterAction } from "../ProductFilterReducer";

type ProductCategorySelectProps = SelectTriggerProps;

export function ProductCategorySelect({ ...props }: ProductCategorySelectProps) {
  const { productFilters, dispatchProductFilters } = useProductFilters();
  const { data: categories, isPending } = useGetCategories();
  const [value, setValue] = useState<string[]>([]);

  const categoriesCollection = useMemo(
    () =>
      createListCollection({
        items: categories ?? [],
        itemToString: (category) => category.name,
        itemToValue: ({ id }) => id.toString(),
      }),
    [categories],
  );

  useEffect(() => {
    const values = value.length === 0 ? null : value.join(",");

    if (productFilters.categoryIds !== values) {
      dispatchProductFilters({ type: ProductFilterAction.SetCategoryIds, payload: values });
    }
  }, [dispatchProductFilters, productFilters.categoryIds, value]);

  return (
    <Field.Root>
      <Box pos="relative" w="full">
        <Field.Label css={floatingLabelStyles}>Categories</Field.Label>
        <Select.Root
          multiple
          closeOnSelect={false}
          value={value}
          onValueChange={(e) => setValue(e.value)}
          collection={categoriesCollection}
        >
          <Select.HiddenSelect />

          <Select.Control>
            <Select.Trigger {...props} backgroundColor="bg">
              <Select.ValueText placeholder="Select categories" />
            </Select.Trigger>

            <Select.IndicatorGroup>
              {isPending && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
              <Select.ClearTrigger />
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {categories?.map((category) => (
                  <Select.Item item={category} key={category.id}>
                    {category.name}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
    </Field.Root>
  );
}
