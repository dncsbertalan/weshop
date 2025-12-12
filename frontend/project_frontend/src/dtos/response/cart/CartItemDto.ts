import z from "zod";

import { CategoryDto } from "../category/CategoryDto";
import { UserInformatioDto } from "../user/UserInformatioDto";

export const CartItemDto = z
  .object({
    id: z.number(),
    productId: z.number(),
    quantity: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    availableQuantity: z.number(),
    categories: CategoryDto.array(),
    addedBy: UserInformatioDto,
  })
  .strict();

export type CartItemDto = z.infer<typeof CartItemDto>;
