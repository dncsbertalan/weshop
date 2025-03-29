import useUpdateQueryParam from "./use-update-query-param";
import { ProductQueryDefaults, ProductFilterKeys as ProductFilterKeys } from "@/api/product-api";

export default function useProductFilters() {
    const { searchParams, updateQueryParam } = useUpdateQueryParam();

    const page = Number(searchParams.get(ProductFilterKeys.page)) || ProductQueryDefaults.page;
    const pageSize = Number(searchParams.get(ProductFilterKeys.pageSize)) || ProductQueryDefaults.pageSize;
    const categories = searchParams.get(ProductFilterKeys.categories)?.split(",").map(Number) || [];

    const setPage = (newPage: number) => {
        updateQueryParam(ProductFilterKeys.page, newPage.toString());
    };

    const setCategories = (newCategoryId: number) => {
        const newSelection = categories.includes(newCategoryId)
            ? categories.filter((item) => item !== newCategoryId)
            : [...categories, newCategoryId];

        updateQueryParam(ProductFilterKeys.categories, newSelection.length === 0 ? null : newSelection.join(","));
    };

    return { page, pageSize, categories, setPage, setCategories, searchParams };
};