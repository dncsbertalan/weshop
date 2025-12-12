import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

function getQuantityLabel(quantity: number) {
  switch (true) {
    case quantity <= 0:
      return "Out of stock";
    case quantity === 1:
      return "Only one left";
    case quantity > 1 && quantity <= 5:
      return "Few items left";
    default:
      return "In stock";
  }
}

function getQuantityColor(quantity: number) {
  switch (true) {
    case quantity <= 0:
      return "rgb(244, 67, 54)"; // "rgb(220, 53, 69)";
    case quantity === 1:
      return "rgb(255, 152, 0)"; // "rgb(255, 120, 50)";
    case quantity > 1 && quantity <= 5:
      return "rgb(255, 193, 7)"; // "rgb(255, 222, 89)";
    default:
      return "rgb(151, 202, 79)"; // "rgb(151, 202, 79)";
  }
}

interface ProductAvailabilityLabelProps {
  availableQuantity: number;
}

export function ProductAvailabilityLabel({ availableQuantity }: ProductAvailabilityLabelProps) {
  const color = getQuantityColor(availableQuantity);
  const label = getQuantityLabel(availableQuantity);

  return (
    <Flex alignItems="center">
      <Icon marginRight="4px" color={color}>
        {availableQuantity > 0 ? <IoCheckmarkCircleOutline /> : <FaRegCircleXmark />}
      </Icon>
      <Text fontSize="12px" fontWeight="400" letterSpacing="tight" color={color}>
        {label}
      </Text>
    </Flex>
  );
}
