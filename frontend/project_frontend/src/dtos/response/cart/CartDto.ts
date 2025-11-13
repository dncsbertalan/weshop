import z from "zod";

import { UserInformatioDto } from "../user/UserInformatioDto";
import { CartItemDto } from "./CartItemDto";

export const CartDto = z
  .object({
    id: z.number(),
    owner: UserInformatioDto,
    isShared: z.boolean(),
    cartItems: CartItemDto.array(),
  })
  .strict();

export type CartDto = z.infer<typeof CartDto>;
