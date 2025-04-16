import { Center, Flex, Spacer } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { FiltersSection } from "./filter-section/FiltersSection";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller"
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { ProductSection } from "./ProductsSection";

export function MainPage() {

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center 
                //backgroundImage="linear-gradient(45deg, #845ec2, #d65db1, #ff6f91, #ff9671, #ffc75f, #f9f861)" 
                //backgroundImage="linear-gradient( #BDD5AF, #ffffff, #BDD5AF)" 
                //backgroundImage="linear-gradient(135deg, #f4fff6 0%, #e2f5e7 40%, #cfe9d8 100%)" 
                backgroundColor={{base: "red", sm: "blue", md: "purple", lg: "pink", xl: "bg-color"}} 
                animation="bg-animation" 
                backgroundSize="400%"
                bgAttachment="fixed"
                flexDirection="column"
            >
                {/*<FiltersSectionButton />*/}
                <Flex
                    position="relative"
                    padding="20px 0px"
                    //gap={10}
                    justifyContent="space-evenly"
                    width="100%"
                    maxWidth="global-max-window-size"
                    //margin="0px 20px" // ORIGINAL
                    margin="0px 10px"
                    height="max"
                    //flexDirection="column" // FOR THE NEW DESIGN
                >

                    <FiltersSection />
                    <ProductSection />
                </Flex>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}