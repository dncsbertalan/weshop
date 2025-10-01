export interface ProductFilter {
  page: number;
  pageSize: number;
  categories?: number[];
  minPrice?: number;
  maxPrice?: number;
}

export const ProductFilterDefaults = {
  page: 1,
  pageSize: 30,
  minPrice: 1000,
  maxPrice: 100000,
};
