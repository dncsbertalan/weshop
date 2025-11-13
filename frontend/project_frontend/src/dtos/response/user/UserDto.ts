import z from "zod";

import { CartInformationDto } from "../cart/CartInformationDto";

export const UserDto = z
  .object({
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    birthDate: z.preprocess((value) => new Date(value as string), z.date()),
    activeCartId: z.number().positive(),
    ownedCartId: z.number().positive(),
    carts: CartInformationDto.array(),
  })
  .strict();

export type UserDto = z.infer<typeof UserDto>;
