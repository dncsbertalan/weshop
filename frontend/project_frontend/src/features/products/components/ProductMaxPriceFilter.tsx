import { CloseButton, Field, InputGroup, InputProps, NumberInput } from "@chakra-ui/react";
import { useRef } from "react";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductFilterAction } from "../productFilterReducer";

type ProductMaxPriceFilterProps = InputProps;

export function ProductMaxPriceFilter({ ...props }: ProductMaxPriceFilterProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { productFilters, dispatchProductFilters } = useProductFilters();

  const endElement = productFilters.max ? (
    <CloseButton
      rounded="full"
      size="xs"
      onClick={() => {
        dispatchProductFilters({ type: ProductFilterAction.SetMaxPrice, payload: 100000 });
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Field.Root required>
      <Field.Label>Maximum price</Field.Label>
      <NumberInput.Root min={0} width="100%">
        <InputGroup startElement="Ft" endElement={endElement}>
          <NumberInput.Input
            ref={inputRef}
            {...props}
            value={productFilters.max}
            onChange={(event) => {
              dispatchProductFilters({
                type: ProductFilterAction.SetMaxPrice,
                payload: Number(event.currentTarget.value),
              });
            }}
          />
        </InputGroup>
      </NumberInput.Root>
    </Field.Root>
  );
}
