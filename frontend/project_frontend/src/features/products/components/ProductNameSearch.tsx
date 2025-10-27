import { CloseButton, InputGroup, Input, Field, InputProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useProductFilters } from "../hooks/useProductFilters";
import { LuSearch } from "react-icons/lu";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductFilterAction } from "../productFilterReducer";

interface ProductNameSearchProps extends InputProps {
  label?: string;
}

export function ProductNameSearch({ label, ...props }: ProductNameSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { productFilters, dispatchProductFilters } = useProductFilters();

  const debouncedFilterName = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedFilterName !== undefined && debouncedFilterName !== productFilters.productName) {
      dispatchProductFilters({ type: ProductFilterAction.SetProductName, payload: debouncedFilterName });
    }
  }, [debouncedFilterName, dispatchProductFilters, productFilters.productName]);

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
          {...props}
          value={inputValue}
          placeholder="Search products"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </InputGroup>
    </Field.Root>
  );
}
