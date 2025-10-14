import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import { createListCollection, Field, Select, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductCategorySelect() {
  const { filters, setFilters } = useProductFilters();
  const { data: categories, isPending } = useGetCategories();
  const [value, setValue] = useState<string[]>([]);

  const categoriesCollection = useMemo(
    () =>
      createListCollection({
        items: categories ?? [],
        itemToString: (category) => category.name,
        itemToValue: ({ id }) => id.toString(),
      }),
    [categories]
  );

  useEffect(() => {
    const values = value.map(Number).sort();

    if (JSON.stringify(filters.filters) !== JSON.stringify(values)) {
      setFilters((prev) => ({ ...prev, filters: values }));
    }
  }, [filters, setFilters, value]);

  return (
    <Field.Root>
      <Field.Label>Categories {value}</Field.Label>
      <Select.Root
        multiple
        closeOnSelect={false}
        value={value}
        onValueChange={(e) => setValue(e.value)}
        collection={categoriesCollection}
      >
        <Select.HiddenSelect />

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select categories" />
          </Select.Trigger>

          <Select.IndicatorGroup>
            {isPending && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

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
      </Select.Root>
    </Field.Root>
  );
}
