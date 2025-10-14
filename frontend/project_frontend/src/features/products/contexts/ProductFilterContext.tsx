import { createContext, PropsWithChildren } from "react";
import { ProductFilter } from "../ProductFilter";
import { useGetProductFilters } from "../hooks/useGetProductFilters";

interface ProductFilterContextType {
  filters: ProductFilter;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilter>>;
}

export const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined);

export function ProductFilterProvider({ children }: PropsWithChildren) {
  const { filters, setFilters } = useGetProductFilters();

  return (
    <ProductFilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}
