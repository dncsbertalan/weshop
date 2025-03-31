import useUpdateQueryParam from "./use-update-query-param";
import { ProductQueryDefaults, ProductFilterKeys as ProductFilterKeys } from "@/api/product-api";

export default function useProductFilters() {
    const { searchParams, updateQueryParam } = useUpdateQueryParam();

    const page = Number(searchParams.get(ProductFilterKeys.page)) || ProductQueryDefaults.page;
    const pageSize = Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductQueryDefaults.pageSize;
    const categories = searchParams.get(ProductFilterKeys.categories)?.split(",").map(Number) || [];
    const minPrice = Number(searchParams.get(ProductFilterKeys.minPrice)) || ProductQueryDefaults.minPrice;
    const maxPrice = Number(searchParams.get(ProductFilterKeys.maxPrice)) || ProductQueryDefaults.maxPrice;

    const setPage = (newPage: number | null) => {
        console.log("faz")
        console.log(newPage)
        updateQueryParam(ProductFilterKeys.page, newPage?.toString() ?? null);
    };

    const setCategories = (newCategoryId: number) => {
        const newSelection = categories.includes(newCategoryId)
            ? categories.filter((item) => item !== newCategoryId)
            : [...categories, newCategoryId];

        updateQueryParam(ProductFilterKeys.categories, newSelection.length === 0 ? null : newSelection.join(","));
    };

    const setMinPrice = (newMinPrice?: number | null) => {
        updateQueryParam(ProductFilterKeys.minPrice, newMinPrice?.toString() ?? null);
    };

    const setMaxPrice = (newMaxPrice?: number | null) => {
        updateQueryParam(ProductFilterKeys.maxPrice, newMaxPrice?.toString() ?? null);
    };

    return { searchParams, page, pageSize, categories, setPage, setCategories, minPrice, maxPrice, setMinPrice, setMaxPrice };
};