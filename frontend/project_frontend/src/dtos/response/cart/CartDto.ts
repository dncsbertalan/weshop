import z from "zod";

import { UserInformatioDto } from "../user/UserInformatioDto";
import { CartItemDto } from "./CartItemDto";

export const CartDto = z
  .object({
    id: z.number(),
    owner: UserInformatioDto,
    quantity: z.number(),
    priceTotal: z.number(),
    isShared: z.boolean(),
    cartItems: CartItemDto.array(),
    sharedWith: UserInformatioDto.array(),
  })
  .strict();

export type CartDto = z.infer<typeof CartDto>;
