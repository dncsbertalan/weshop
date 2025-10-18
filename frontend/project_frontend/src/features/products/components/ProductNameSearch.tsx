import { CloseButton, InputGroup, Input, Field } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useProductFilters } from "../hooks/useProductFilters";
import { LuSearch } from "react-icons/lu";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductNameSearchProps {
  label?: string;
}

export function ProductNameSearch({ label }: ProductNameSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { filters, setFilters } = useProductFilters();

  const debouncedFilterName = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedFilterName !== undefined && debouncedFilterName !== filters.productName) {
      setFilters({ ...filters, page: 1, productName: debouncedFilterName });
    }
  }, [debouncedFilterName, filters, setFilters]);

  const endElement = inputValue ? (
    <CloseButton
      rounded="full"
      size="xs"
      onClick={() => {
        setInputValue("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Field.Root required>
      {label && <Field.Label>{label}</Field.Label>}
      <InputGroup endElement={endElement} startElement={<LuSearch />}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </InputGroup>
    </Field.Root>
  );
}
