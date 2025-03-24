import { useSearchParams } from "react-router";

const DEFAULT_PAGE_SIZE = 30;
const DEFAULT_PAGE = 1;

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
    const pageSize = Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE;

    const setPage = (newPage: number) => {
        setSearchParams({ page: newPage.toString(), pageSize: pageSize.toString() });
    };

    return { page, pageSize, setPage };
};