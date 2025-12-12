import * as z from "zod";

export const CreateProductRequestDto = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    availableQuantity: z.number(),
    image: z.file(),
    categoryIds: z.string().array(),
  })
  .strict();

export type CreateProductRequestDto = z.infer<typeof CreateProductRequestDto>;
