import { Tabs } from "@chakra-ui/react";

import { PageContainer } from "@/components/PageContainer";
import { EditorTab } from "@/features/product-editor/EditorTab";
import { ProductFilterProvider } from "@/features/products/components/ProductFilterProvider";

import { AdminPageProductTab } from "./AdminPage.ProductTab";

export function AdminPage() {
  return (
    <ProductFilterProvider>
      <PageContainer>
        <Tabs.Root defaultValue={EditorTab.Product} lazyMount unmountOnExit size="lg">
          <Tabs.List>
            <Tabs.Trigger value={EditorTab.Product}>Products</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value={EditorTab.Product}>
            <AdminPageProductTab />
          </Tabs.Content>
        </Tabs.Root>
      </PageContainer>
    </ProductFilterProvider>
  );
}
