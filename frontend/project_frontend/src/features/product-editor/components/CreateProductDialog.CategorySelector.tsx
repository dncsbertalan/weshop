import { createListCollection, Field, Select, Spinner } from "@chakra-ui/react";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { CreateProductRequestDto } from "@/dtos/request/product/CreateProductRequestDto";
import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import { getFieldKeys } from "@/utils/getFieldKeys";

const upsertProductKeys = getFieldKeys(CreateProductRequestDto);

export function CreateProductDialogCategorySelector() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductRequestDto>();
  const { data: categories, isPending } = useGetCategories();

  const categoriesCollection = useMemo(
    () =>
      createListCollection({
        items: categories ?? [],
        itemToString: (category) => category.name,
        itemToValue: ({ id }) => id.toString(),
      }),
    [categories],
  );

  return (
    <Field.Root required invalid={!!errors.categoryIds}>
      <Field.Label>
        Categories <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        control={control}
        name={upsertProductKeys.categoryIds}
        rules={{
          required: "At least one category is required",
        }}
        render={({ field }) => (
          <Select.Root
            multiple
            closeOnSelect={false}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={categoriesCollection}
            positioning={{ strategy: "fixed", hideWhenDetached: true }}
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
        )}
      />
      <Field.ErrorText>{errors.categoryIds?.message}</Field.ErrorText>
    </Field.Root>
  );
}
