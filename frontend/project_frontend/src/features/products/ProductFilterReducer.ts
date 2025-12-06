import { ProductFilter } from "./ProductFilter";

export enum ProductFilterAction {
  SetPage = "SetPage",
  SetPageSize = "SetPagesize",
  SetMinPrice = "SetMinPrice",
  SetMaxPrice = "SetMaxPrice",
  SetCategoryIds = "SetCategoryIds",
  SetProductName = "SetProductName",
  SetAll = "SetAll",
}

export type ProductFilterActionType =
  | { type: ProductFilterAction.SetPage; payload: number }
  | { type: ProductFilterAction.SetPageSize; payload: number }
  | { type: ProductFilterAction.SetMinPrice; payload?: number }
  | { type: ProductFilterAction.SetMaxPrice; payload?: number }
  | { type: ProductFilterAction.SetCategoryIds; payload: string | null }
  | { type: ProductFilterAction.SetProductName; payload: string }
  | { type: ProductFilterAction.SetAll; payload: ProductFilter };

export function productFilterReducer(state: ProductFilter, action: ProductFilterActionType): ProductFilter {
  switch (action.type) {
    case ProductFilterAction.SetPage:
      return { ...state, page: action.payload };
    case ProductFilterAction.SetPageSize:
      return { ...state, pageSize: action.payload };
    case ProductFilterAction.SetMinPrice:
      return { ...state, minPrice: action.payload, page: 1 };
    case ProductFilterAction.SetMaxPrice:
      return { ...state, maxPrice: action.payload, page: 1 };
    case ProductFilterAction.SetCategoryIds:
      return { ...state, categoryIds: action.payload, page: 1 };
    case ProductFilterAction.SetProductName:
      return { ...state, productName: action.payload, page: 1 };
    case ProductFilterAction.SetAll:
      return { ...action.payload };
    default:
      return state;
  }
}
