import { CloseButton, Field, InputGroup, NumberInput } from "@chakra-ui/react";
import { useRef } from "react";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductMaxPriceFilter() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { filters, setFilters } = useProductFilters();

  const endElement = filters.max ? (
    <CloseButton
      rounded="full"
      size="xs"
      onClick={() => {
        setFilters({ ...filters, max: 100000 });
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
            value={filters.max}
            onChange={(event) => {
              setFilters({ ...filters, page: 1, max: Number(event.currentTarget.value) });
            }}
          />
        </InputGroup>
      </NumberInput.Root>
    </Field.Root>
  );
}
