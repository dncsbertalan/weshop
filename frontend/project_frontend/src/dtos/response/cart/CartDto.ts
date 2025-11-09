import z from "zod";
import { CartItemDto } from "./CartItemDto";
import { UserInformatioDto } from "../user/UserInformatioDto";

export const CartDto = z
  .object({
    cartId: z.number(),
    owner: UserInformatioDto,
    isShared: z.boolean(),
    cartItems: CartItemDto.array(),
  })
  .strict();

export type CartDto = z.infer<typeof CartDto>;
