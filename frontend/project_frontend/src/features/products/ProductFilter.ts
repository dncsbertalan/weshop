export interface ProductFilter {
  page: number;
  pageSize: number;
  filters?: number[];
  min?: number;
  max?: number;
  productName: string | null;
}

export const ProductFilterDefaults = {
  page: 1,
  pageSize: 30,
  minPrice: 0,
  maxPrice: 100000,
};
