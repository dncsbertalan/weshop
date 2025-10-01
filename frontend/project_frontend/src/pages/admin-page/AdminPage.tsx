import { PageContainer } from "@/components/PageContainer";
import { EditorTab } from "@/features/editor/EditorTab";
import { Tabs } from "@chakra-ui/react";
import { AdminPageProductTab } from "./AdminPage.ProductTab";

export function AdminPage() {
  return (
    <PageContainer>
      <Tabs.Root
        defaultValue={EditorTab.Product}
        lazyMount
        unmountOnExit
        size="lg"
      >
        <Tabs.List>
          <Tabs.Trigger value={EditorTab.Product}>Products</Tabs.Trigger>
          <Tabs.Trigger value={EditorTab.Category}>Category</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={EditorTab.Product}>
          <AdminPageProductTab />
        </Tabs.Content>
        <Tabs.Content value={EditorTab.Category}>product</Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
