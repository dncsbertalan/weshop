import { getCategories } from "@/api/category-api";
import { getProducts } from "@/api/product-api";
import useProductFilters from "@/hooks/use-product-filters";
import { Category } from "@/models/category";
import { PagedProducts } from "@/models/Product";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";

interface ProductContextType {
  // Products
  products: PagedProducts;
  productsIsPending: boolean;
  productsIsError: boolean;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  // Categories
  categories: Category[];
  isPendingCategories: boolean;
  isErrorCategories: boolean;
  selectedCategories: number[];
  toggleCategory: (value: number) => void;
  // Price
  minPrice: number;
  maxPrice: number;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const PRODUCT_CACHE_KEY = "products";
const CATEGORY_CACHE_KEY = "categories";

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    searchParams,
    page,
    pageSize,
    categories: selectedCategories,
    setPage,
    setCategories,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  } = useProductFilters();

  //#region Products

  const setPageSafe = (newPage: number) => {
    if (newPage < 1 || (products?.totalPages && newPage > products.totalPages)) return;
    setPage(newPage);
  };

  //#endregion

  //#region  Categories

  const {
    isPending: isPendingCategories,
    isError: isErrorCategories,
    data: categories = [],
  } = useQuery({
    queryKey: [CATEGORY_CACHE_KEY],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

  const toggleCategory = (value: number) => {
    setPage(1);
    setCategories(value);
  };

  //#endregion

  //#region  Price

  const setMinPriceSafe = (value: number) => {
    setPage(1);
    setMinPrice(value);
    console.log("szia");
  };

  //#endregion

  return (
    <ProductContext.Provider
      value={{
        products: {
          items: [],
          currentsPages: 0,
          totalItems: 0,
          totalPages: 0,
        },
        productsIsPending: false,
        productsIsError: false,
        page,
        pageSize,
        setPage: setPageSafe,
        categories,
        isPendingCategories,
        isErrorCategories,
        selectedCategories,
        toggleCategory,
        minPrice,
        maxPrice,
        setMinPrice: setMinPriceSafe,
        setMaxPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProduct must be used within a ProductProvider");
  return context;
};
