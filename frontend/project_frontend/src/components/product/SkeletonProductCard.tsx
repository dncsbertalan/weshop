import { Card, Skeleton, SkeletonText, Spacer } from '@chakra-ui/react'

export function SkeletonProductCard() {
    return (
        <Card.Root
            maxW="sm"
            flex="1"
            width="100%"
            overflow="hidden"
            backgroundColor="white"
            borderRadius={18}
            border="none"
            boxShadow="1px 1px 10px rgba(0, 0, 0, 0.3)"
        >
            <Skeleton height={250} width="100%" />
            <Card.Body gap="2">
                <Skeleton height="28px" width={100} />
                <SkeletonText />
            </Card.Body>

            <Card.Footer gap="2">
                <Spacer />
                <Skeleton height="40px" width={100} borderRadius="1000px" />
            </Card.Footer>
        </Card.Root>
    );
}