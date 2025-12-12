import z from "zod";

export const AddUserToCartRequestDto = z
  .object({
    email: z.email("E-mail is not valid"),
  })
  .strict();

export type AddUserToCartRequestDto = z.infer<typeof AddUserToCartRequestDto>;
