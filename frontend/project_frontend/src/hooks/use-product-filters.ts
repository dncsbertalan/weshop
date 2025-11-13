import { ProductFilterKeys as ProductFilterKeys,ProductQueryDefaults } from "@/api/product-api";

import useUpdateQueryParam from "./use-update-query-param";

export default function useProductFilters() {
    const { searchParams, updateQueryParam } = useUpdateQueryParam();

    const page = Number(searchParams.get(ProductFilterKeys.page)) || ProductQueryDefaults.page;
    const pageSize = Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductQueryDefaults.pageSize;
    const categories = searchParams.get(ProductFilterKeys.categories)?.split(",").map(Number) || [];
    const minPrice = Number(searchParams.get(ProductFilterKeys.minPrice)) || ProductQueryDefaults.minPrice;
    const maxPrice = Number(searchParams.get(ProductFilterKeys.maxPrice)) || ProductQueryDefaults.maxPrice;

    const setPage = (newPage: number) => {
        updateQueryParam(ProductFilterKeys.page, newPage.toString());
    };

    const setCategories = (newCategoryId: number) => {
        const newSelection = categories.includes(newCategoryId)
            ? categories.filter((item) => item !== newCategoryId)
            : [...categories, newCategoryId];

        updateQueryParam(ProductFilterKeys.categories, newSelection.length === 0 ? null : newSelection.join(","));
    };

    const setMinPrice = (newMinPrice: number) => {
        updateQueryParam(ProductFilterKeys.minPrice, newMinPrice.toString());
    };

    const setMaxPrice = (newMaxPrice: number) => {
        updateQueryParam(ProductFilterKeys.maxPrice, newMaxPrice.toString());
    };

    return { searchParams, page, pageSize, categories, setPage, setCategories, minPrice, maxPrice, setMinPrice, setMaxPrice };
}

;