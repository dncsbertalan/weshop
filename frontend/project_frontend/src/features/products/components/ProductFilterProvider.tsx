import { PropsWithChildren } from "react";

import { ProductFilterContext } from "../contexts/ProductFilterContext";
import { useGetProductFilters } from "../hooks/useGetProductFilters";

export function ProductFilterProvider({ children }: PropsWithChildren) {
  const { productFilters, dispatchProductFilters } = useGetProductFilters();

  return (
    <ProductFilterContext.Provider
      value={{
        productFilters,
        dispatchProductFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}
