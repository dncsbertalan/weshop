import z from "zod";

export const UpdateProductRequestDto = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    availableQuantity: z.number(),
    image: z.file().nullable(),
    categoryIds: z.string().array(),
  })
  .strict();

export type UpdateProductRequestDto = z.infer<typeof UpdateProductRequestDto>;
