import { createContext } from "react";

import { ProductFilter } from "@/dtos/request/product/ProductFilter";

import { ProductFilterActionType } from "../ProductFilterReducer";

interface ProductFilterContextType {
  productFilters: ProductFilter;
  dispatchProductFilters: React.ActionDispatch<[action: ProductFilterActionType]>;
}

export const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined);
