import { messageToaster } from "@/components/toaster/messageToasterDef";
import { CartChangedResponseDto, CartChangeType } from "@/dtos/response/cart/CartChangedResponseDto";
import { getUserName } from "@/features/users/utils/getUserName";

const createToast = (description: string) =>
  messageToaster.create({
    closable: true,
    type: "info",
    description,
  });
const cartUpdated = (response: CartChangedResponseDto) => {
  let description: string;

  switch (response.changeType) {
    case CartChangeType.NewProductAdded:
      description = `${getUserName(response.changedByUser)} added ${response.product.name} to the cart`;
      break;
    case CartChangeType.ProductRemoved:
      description = `${getUserName(response.changedByUser)} removed ${response.product.name} from the cart`;
      break;
    case CartChangeType.ProductUpdated:
      description = `${getUserName(response.changedByUser)} updated ${response.product.name} in the cart`;
      break;
  }

  createToast(description);
};

export const sharedCartNotificationService = { cartUpdated };
