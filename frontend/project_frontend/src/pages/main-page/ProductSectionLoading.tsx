import { SkeletonProductCard } from "@/components/product/SkeletonProductCard";
import { For } from "@chakra-ui/react";

export function ProductSectionLoading() {
    return (
        <For each={[1, 2, 3, 4]}>
            {(id) => <SkeletonProductCard key={id}/>}
        </For>
    );
}