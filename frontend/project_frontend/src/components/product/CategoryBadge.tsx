import { Badge } from "@chakra-ui/react";

export function CategoryBadge({ categoryName } : { categoryName: string }) {
    return (
        <Badge backgroundColor="#EAEAEA" borderRadius={1000} padding="0px 8px">
            {categoryName}
        </Badge>
    );
}