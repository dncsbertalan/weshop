import { Card, Skeleton, SkeletonText } from '@chakra-ui/react'

export function SkeletonProductCard() {
    return (
        <Card.Root
            flex="1"
            width={{ base: "100%", sm: "255px", md: "225px", lg: "225px", xl: "290px" }}
            height="fit-content"
            overflow="hidden"
            backgroundColor="white"
            borderRadius={18}
            border="none"
            boxShadow="1px 1px 10px rgba(0, 0, 0, 0.3)"
        >
            <Skeleton height={{ base: 220, xl: 250 }} width="100%" />
            <Card.Body gap="2" padding="0px 20px 20px 20px" marginTop="10px">
                <Skeleton height="22px" width={100} />
                <SkeletonText />
            </Card.Body>

            {/*<Card.Footer gap="2">
                <Spacer />
                <Skeleton height="40px" width={100} borderRadius="1000px" />
            </Card.Footer>*/}
        </Card.Root>
    );
}