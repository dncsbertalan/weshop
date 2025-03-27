import { getCategories } from "@/api/categoryApi";
import { getProducts } from "@/api/productApi";
import { usePagination } from "@/hooks/usePagination";
import { Category } from "@/models/Category";
import { PagedProducts } from "@/models/PagedProducts";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";

interface ProductContextType {
    // Products
    products: PagedProducts;
    productsIsPending: boolean;
    productsIsError: boolean;
    page: number;
    pageSize: number;
    setPage: (page: number) => void
    // Categories
    categories: Category[];
    isPendingCategories: boolean;
    isErrorCategories: boolean;
    selectedCategories: number[];
    toggleCategory: (value: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const PRODUCT_CACHE_KEY = "products";
const CATEGORY_CACHE_KEY = "categories";

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    //const queryClient = useQueryClient();
    const { page, pageSize, setPage } = usePagination();

    const {
        isPending: productsIsPending,
        isError: productsIsError,
        data: products = { items: [], currentsPages: 0, totalItems: 0, totalPages: 0 },
    } = useQuery({
        queryKey: [PRODUCT_CACHE_KEY, page, pageSize],
        queryFn: () => getProducts(page, pageSize),
        staleTime: 1000 * 60 * 5,
    });

    const setPageSafe = (newPage: number) => {
        if (newPage < 1 || (products?.totalPages && newPage > products.totalPages)) return;
        setPage(newPage);
    };

    //#region  Categories 

    const {
        isPending: isPendingCategories,
        isError: isErrorCategories,
        data: categories = []
    } = useQuery({
        queryKey: [CATEGORY_CACHE_KEY],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
    });

    //const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    /*const toggleCategory = async (value: number) => {
        setSelectedCategories((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };*/

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategories = searchParams.get("categories")
        ? searchParams.get("categories")!.split(",").map(Number)
        : [];

    const toggleCategory = (value: number) => {
        const newSelection = selectedCategories.includes(value)
            ? selectedCategories.filter((item) => item !== value)
            : [...selectedCategories, value];

        setSearchParams({ categories: newSelection.join(",") });
    };

    //#endregion

    return (
        <ProductContext.Provider value={{
            products,
            productsIsPending,
            productsIsError,
            page,
            pageSize,
            setPage: setPageSafe,
            categories,
            isPendingCategories,
            isErrorCategories,
            selectedCategories,
            toggleCategory,
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProduct must be used within a ProductProvider");
    return context;
};