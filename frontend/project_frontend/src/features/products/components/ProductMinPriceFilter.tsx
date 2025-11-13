import { CloseButton, Field, InputGroup, InputProps, NumberInput } from "@chakra-ui/react";
import { useRef } from "react";

import { useProductFilters } from "../hooks/useProductFilters";
import { ProductFilterAction } from "../productFilterReducer";

type ProductMinPriceFilterProps = InputProps;

export function ProductMinPriceFilter({ ...props }: ProductMinPriceFilterProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { productFilters, dispatchProductFilters } = useProductFilters();

  const endElement = productFilters.min ? (
    <CloseButton
      rounded="full"
      size="xs"
      onClick={() => {
        dispatchProductFilters({ type: ProductFilterAction.SetMinPrice, payload: 0 });
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Field.Root required>
      <Field.Label>Minimum price</Field.Label>
      <NumberInput.Root min={0} width="100%">
        <InputGroup startElement="Ft" endElement={endElement}>
          <NumberInput.Input
            ref={inputRef}
            {...props}
            value={productFilters.min}
            onChange={(event) => {
              dispatchProductFilters({
                type: ProductFilterAction.SetMinPrice,
                payload: Number(event.currentTarget.value),
              });
            }}
          />
        </InputGroup>
      </NumberInput.Root>
    </Field.Root>
  );
}
