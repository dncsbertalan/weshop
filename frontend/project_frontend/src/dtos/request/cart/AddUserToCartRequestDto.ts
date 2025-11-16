import z from "zod";

export const AddUserToCartRequestDto = z
  .object({
    email: z.string(),
  })
  .strict();

export type AddUserToCartRequestDto = z.infer<typeof AddUserToCartRequestDto>;
