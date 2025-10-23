import { useContext } from "react";
import { ProductFilterContext } from "../contexts/ProductFilterContext";

export function useProductFilters() {
  const productFilterContext = useContext(ProductFilterContext);

  if (!productFilterContext) {
    throw new Error("useProductFilters must be used within a ProductFilterProvider");
  }

  return productFilterContext;
}
