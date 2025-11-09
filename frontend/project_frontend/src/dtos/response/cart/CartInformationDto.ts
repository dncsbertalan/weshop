import z from "zod";
import { UserInformatioDto } from "../user/UserInformatioDto";

export const CartInformationDto = z
  .object({
    cartId: z.number(),
    owner: UserInformatioDto,
  })
  .strict();

export type CartInformationDto = z.infer<typeof CartInformationDto>;
