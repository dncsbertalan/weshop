import { useSearchParams } from "react-router";

export default function useUpdateQueryParam() {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateQueryParam = (key: string, value: string | null) => {
        const newParams = new URLSearchParams(searchParams);

        if (value === null) {
            newParams.delete(key);
        }
        else {
            newParams.set(key, value);
        }

        setSearchParams(newParams, { replace: true });
    };

    return { searchParams, updateQueryParam };
}