import { CloseButton, Field, InputGroup, NumberInput } from "@chakra-ui/react";
import { useRef } from "react";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductMinPriceFilter() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { productFilters: filters, setProductFilters: setFilters } = useProductFilters();

  const endElement = filters.min ? (
    <CloseButton
      rounded="full"
      size="xs"
      onClick={() => {
        setFilters({ ...filters, min: 0 });
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
            value={filters.min}
            onChange={(event) => {
              setFilters({ ...filters, page: 1, min: Number(event.currentTarget.value) });
            }}
          />
        </InputGroup>
      </NumberInput.Root>
    </Field.Root>
  );
}
