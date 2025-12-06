import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

export function SkeletonProductCard() {
  return (
    <Card.Root
      flex={1}
      maxWidth={{ base: "full" }}
      height="fit-content"
      overflow="hidden"
      backgroundColor="white"
      borderRadius={18}
      border="none"
      shadow="lg"
    >
      <Skeleton height={{ base: 220, xl: 250 }} width="full" />
      <Card.Body gap="2" padding={4} paddingTop={2.5}>
        <Skeleton height={22} width={100} />
        <SkeletonText />
      </Card.Body>
    </Card.Root>
  );
}
