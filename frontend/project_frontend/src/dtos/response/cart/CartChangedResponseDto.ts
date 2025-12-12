import z from "zod";

import { ProductDto } from "../product/ProductDto";
import { UserInformatioDto } from "../user/UserInformatioDto";

export enum CartChangeType {
  NewProductAdded = "NewProductAdded",
  ProductRemoved = "ProductRemoved",
  ProductUpdated = "ProductUpdated",
}

export const CartChangedResponseDto = z
  .object({
    cartId: z.number(),
    changedByUser: UserInformatioDto,
    product: ProductDto,
    changeType: z.enum(CartChangeType),
  })
  .strict();

export type CartChangedResponseDto = z.infer<typeof CartChangedResponseDto>;
