import { useProduct } from "@/context/ProductContext";
import { SliderValueChangeDetails, HStack, Slider } from "@chakra-ui/react";
import { useState } from "react";

export function PriceSelection() {
    const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useProduct();
    const [min, setMin] = useState(1000);
    const [max, setMax] = useState(100000);
    const onValueChange = (details: SliderValueChangeDetails) => {
        setMin(details.value[0]);
        setMax(details.value[1]);
    };
    const onValueChangeEnd = () => {
        if (min !== minPrice) setMinPrice(min);
        if (max !== maxPrice) setMaxPrice(max);
    };
    //const {value,  } = useSlider({});
    return (
        <Slider.Root
            maxWidth="350px"
            width="100%"
            min={1000}
            max={100000}
            //value={value}
            defaultValue={[minPrice, maxPrice]}
            step={1000}
            minStepsBetweenThumbs={10}
            onValueChange={onValueChange}
            onValueChangeEnd={onValueChangeEnd}
        >
            <HStack justify="space-between">
                {/*<Slider.Label>Price range</Slider.Label>*/}
                <Slider.ValueText />
            </HStack>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                    <Slider.DraggingIndicator
                        layerStyle="fill.solid"
                        top="6"
                        rounded="sm"
                        px="1.5"
                    >
                        <Slider.ValueText />
                    </Slider.DraggingIndicator>
                </Slider.Thumb>
                <Slider.Thumb index={1}>
                    <Slider.DraggingIndicator
                        layerStyle="fill.solid"
                        top="6"
                        rounded="sm"
                        px="1.5"
                    >
                        <Slider.ValueText />
                    </Slider.DraggingIndicator>
                </Slider.Thumb>
                {/*<Slider.Thumbs />*/}
            </Slider.Control>
        </Slider.Root>
    );
}
