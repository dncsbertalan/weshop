import { PageContainer } from "@/components/PageContainer";
import { EditorTab } from "@/features/product-editor/EditorTab";
import { Tabs } from "@chakra-ui/react";
import { AdminPageProductTab } from "./AdminPage.ProductTab";
import { ProductFilterProvider } from "@/features/products/components/ProductFilterProvider";
import { Toaster } from "@/components/ui/toaster";

export function AdminPage() {
  return (
    <ProductFilterProvider>
      <Toaster />
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
