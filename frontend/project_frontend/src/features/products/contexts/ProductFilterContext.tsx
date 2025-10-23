import { createContext, PropsWithChildren } from "react";
import { ProductFilter } from "../ProductFilter";
import { useGetProductFilters } from "../hooks/useGetProductFilters";

interface ProductFilterContextType {
  productFilters: ProductFilter;
  setProductFilters: React.Dispatch<React.SetStateAction<ProductFilter>>;
}

export const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined);

export function ProductFilterProvider({ children }: PropsWithChildren) {
  const { productFilters, setProductFilters } = useGetProductFilters();

  return (
    <ProductFilterContext.Provider
      value={{
        productFilters,
        setProductFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}
