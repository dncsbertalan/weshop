import * as z from "zod";

export const UpsertProductDto = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    availableQuantity: z.number(),
    image: z.file(),
    categoryIds: z.number().array(),
  })
  .strict();

export type UpsertProductDto = z.infer<typeof UpsertProductDto>;
