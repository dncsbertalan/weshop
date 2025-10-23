import z from "zod";

export const CartInformationDto = z
  .object({
    cartId: z.number(),
    ownerEmail: z.email(),
    ownerFirstName: z.string(),
    ownerLastName: z.string(),
  })
  .strict();

export type CartInformationDto = z.infer<typeof CartInformationDto>;
